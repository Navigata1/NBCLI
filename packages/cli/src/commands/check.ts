import { Command } from 'commander';
import path from 'path';
import { existsSync, readFileSync } from 'fs';
import { execFileSync } from 'child_process';
import { parse } from 'yaml';
import type { AnchorCollection, AnchorRule, EnforcementVerdict, GovernanceConfig, HookProfile, PermissionConfig } from '@nsb/core';
import { HOOK_PROFILE_BY_GOVERNANCE, evaluateChange, matchAnchors } from '@nsb/core';
import { getBuiltInAnchors } from '@nsb/anchors';
import { mergeAnchors } from '../utils/anchors';
import { log } from '../utils/logger';
import { emitJson } from '../utils/output';
import { colors, icons } from '../utils/theme';

interface CheckTarget {
  path: string;
  content?: string;
}

function readConfig(root: string): GovernanceConfig | undefined {
  const file = path.resolve(root, '.mbf', 'mbf-governance.yaml');
  if (!existsSync(file)) return undefined;
  try {
    return parse(readFileSync(file, 'utf-8')) as GovernanceConfig;
  } catch {
    return undefined;
  }
}

export function resolveProfile(root: string, override?: string): HookProfile {
  if (override === 'minimal' || override === 'standard' || override === 'strict') return override;
  const config = readConfig(root);
  if (config?.hooks?.profile) return config.hooks.profile;
  if (config?.governance?.profile) return HOOK_PROFILE_BY_GOVERNANCE[config.governance.profile];
  return 'standard';
}

/**
 * Convert a permission glob into a regex body. Escapes regex metachars, then COLLAPSES runs of `*`
 * into a single bounded wildcard — so `**` can't produce adjacent quantifiers (ReDoS-safe).
 */
function globToRegexBody(pat: string): string {
  return pat.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/(?:\\\*)+/g, '[^\\n]*');
}

const PATH_TOOLS = new Set(['write', 'read', 'edit', 'create', 'append', 'delete']);

/**
 * Compile user-declared permissions (deny + destructive_gates) into ENFORCED anchors so the operator's
 * own denials actually block in `nsb check`/hooks — not just render as instruction prose. `Tool(pattern)`
 * wrappers are unwrapped. Path-style denials (Write/Read/Edit, or a path-like glob) become **anchored
 * PATH** matches (no content scan, no substring over-block); command/destructive denials become CONTENT
 * matches (flag a file that contains the command, like the hard-stop anchors). Pure.
 */
function permissionAnchors(perm?: PermissionConfig): AnchorCollection {
  if (!perm) return {};
  const rules: AnchorRule[] = [];
  const add = (entry: string, kind: 'deny' | 'destructive') => {
    const wrapped = entry.match(/^(\w+)\((.+)\)$/);
    const tool = wrapped?.[1]?.toLowerCase();
    const pat = (wrapped ? wrapped[2] : entry).trim();
    if (!pat) return;
    const body = globToRegexBody(pat);
    const pathStyle =
      kind === 'deny' &&
      (PATH_TOOLS.has(tool ?? '') || (!tool && /[/.]/.test(pat) && !/\s/.test(pat)));
    rules.push(
      pathStyle
        ? {
            id: `perm_${kind}_${rules.length}`,
            patterns: [`regex:(^|/)${body}$`], // anchored at a path-segment boundary
            adjustment: -1,
            reason: `user permission ${kind}: ${entry}`,
            target: 'path',
            enforce: true,
          }
        : {
            id: `perm_${kind}_${rules.length}`,
            patterns: [`regex:${body}`],
            adjustment: -1,
            reason: `user permission ${kind}: ${entry}`,
            target: 'content',
            enforce: true,
          },
    );
  };
  (perm.deny ?? []).forEach((e) => add(e, 'deny'));
  (perm.destructive_gates ?? []).forEach((e) => add(e, 'destructive'));
  return rules.length ? { permissions: rules } : {};
}

function loadAnchors(root: string): AnchorCollection {
  const builtIn = getBuiltInAnchors();
  const customPath = path.resolve(root, '.mbf', 'custom-anchors.yaml');
  let custom: AnchorCollection = {};
  if (existsSync(customPath)) {
    try {
      const parsed = parse(readFileSync(customPath, 'utf-8'));
      if (parsed && typeof parsed === 'object') custom = parsed as AnchorCollection;
    } catch {
      /* ignore malformed custom anchors */
    }
  }
  const withCustom = mergeAnchors(builtIn, custom).merged;
  const perm = permissionAnchors(readConfig(root)?.permissions);
  return Object.keys(perm).length ? mergeAnchors(withCustom, perm).merged : withCustom;
}

const safeRead = (file: string): string | undefined => {
  try {
    return readFileSync(file, 'utf-8');
  } catch {
    return undefined;
  }
};

function stagedTargets(root: string): CheckTarget[] {
  let names: string;
  try {
    names = execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACM'], {
      cwd: root,
      encoding: 'utf-8',
    });
  } catch {
    return [];
  }
  return names
    .split('\n')
    .filter(Boolean)
    .map((rel) => {
      let content: string | undefined;
      try {
        content = execFileSync('git', ['show', `:${rel}`], {
          cwd: root,
          encoding: 'utf-8',
          maxBuffer: 16 * 1024 * 1024,
        });
      } catch {
        content = safeRead(path.resolve(root, rel));
      }
      return { path: rel, content };
    });
}

const pathTargets = (paths: string[], root: string): CheckTarget[] =>
  paths.map((rel) => ({ path: rel, content: safeRead(path.resolve(root, rel)) }));

interface HookParse {
  targets: CheckTarget[];
  /** True when stdin had content we could not understand — caller fails closed. */
  parseFailed: boolean;
}

// Parse a Claude Code PreToolUse payload from stdin (the harness pipes JSON).
// Handles Write/Edit (file_path + content/new_string), MultiEdit (file_path +
// edits[].new_string), and NotebookEdit (notebook_path + new_source/edits[]).
function hookTargets(): HookParse {
  let raw = '';
  try {
    raw = readFileSync(0, 'utf-8');
  } catch {
    return { targets: [], parseFailed: true };
  }
  if (!raw.trim()) return { targets: [], parseFailed: false };

  let input: { tool_input?: Record<string, unknown> };
  try {
    input = JSON.parse(raw) as { tool_input?: Record<string, unknown> };
  } catch {
    return { targets: [], parseFailed: true };
  }

  const ti = input.tool_input ?? {};
  const file = (ti.file_path ?? ti.path ?? ti.notebook_path) as string | undefined;
  const parts: string[] = [];
  for (const key of ['content', 'new_string', 'new_str', 'new_source'] as const) {
    if (typeof ti[key] === 'string') parts.push(ti[key] as string);
  }
  if (Array.isArray(ti.edits)) {
    for (const edit of ti.edits as Array<Record<string, unknown>>) {
      const value = edit?.new_string ?? edit?.new_source ?? edit?.content;
      if (typeof value === 'string') parts.push(value);
    }
  }
  return { targets: file ? [{ path: file, content: parts.join('\n') }] : [], parseFailed: false };
}

const VERDICT_BADGE: Record<EnforcementVerdict, string> = {
  allow: colors.success('● ALLOW'),
  warn: colors.warning('● WARN'),
  block: colors.error('● BLOCK'),
};

export const checkCommand = new Command('check')
  .description('Enforce risk anchors over files / staged changes (exit nonzero to block)')
  .argument('[paths...]', 'files to check')
  .option('--staged', 'check git staged files', false)
  .option('--hook', 'read a Claude Code PreToolUse JSON from stdin (exit 2 = block the edit)', false)
  .option('-p, --profile <profile>', 'minimal | standard | strict (override the project profile)')
  .option('--warn-only', 'report but never block (exit 0)', false)
  .option('--json', 'emit machine-readable JSON (no banner)', false)
  .action((paths: string[], options) => {
    const root = process.cwd();
    // Env-var hook disabling: a deliberate escape hatch for the hook path only (PreToolUse/pre-commit).
    // Manual `nsb check <paths>` is unaffected. Do NOT leave this set in normal operation.
    if (options.hook && process.env.NSB_DISABLE_HOOKS === '1') {
      process.stderr.write(
        'NBCLI governance: NSB_DISABLE_HOOKS=1 — hook enforcement DISABLED for this invocation (allowing). Escape hatch; unset it for normal operation.\n',
      );
      process.exit(0);
    }
    const profile = resolveProfile(root, options.profile);
    const anchors = loadAnchors(root);

    let targets: CheckTarget[];
    let parseFailed = false;
    if (options.hook) {
      const parsed = hookTargets();
      targets = parsed.targets;
      parseFailed = parsed.parseFailed;
    } else if (options.staged) {
      targets = stagedTargets(root);
    } else {
      targets = pathTargets(paths ?? [], root);
    }

    const matches = targets.flatMap((t) =>
      matchAnchors(anchors, [{ path: t.path, content: t.content }]),
    );
    const result = evaluateChange(matches, profile);

    // Claude Code PreToolUse contract: exit 2 blocks the tool call (stderr shown to the model).
    if (options.hook) {
      // Fail CLOSED: an unparsable payload under a blocking profile is treated as block-worthy.
      if (parseFailed && profile !== 'minimal' && !options.warnOnly) {
        process.stderr.write(
          'NBCLI governance: could not parse the PreToolUse payload — failing closed (blocking). Use the minimal hook profile to allow.\n',
        );
        process.exit(2);
      }
      if (result.verdict === 'block' && !options.warnOnly) {
        process.stderr.write(
          `NBCLI governance (${profile}) BLOCKED this edit:\n${result.reasons
            .map((r) => `  - ${r}`)
            .join('\n')}\nRequest explicit human approval, or adjust the change.\n`,
        );
        process.exit(2);
      }
      return;
    }

    if (options.json) {
      emitJson({
        profile,
        verdict: result.verdict,
        totalAdjustment: result.totalAdjustment,
        enforceAdjustment: result.enforceAdjustment,
        reasons: result.reasons,
        matches: result.matches,
      });
      if (result.verdict === 'block' && !options.warnOnly) process.exitCode = 1;
      return;
    }

    if (matches.length === 0) {
      log.success(`No anchors triggered — ${VERDICT_BADGE.allow} (${profile})`);
      return;
    }

    log.subheader(`Governance check (${profile}) — ${VERDICT_BADGE[result.verdict]}`);
    result.reasons.forEach((reason) => console.log(`  ${icons.arrow} ${reason}`));
    log.blank();
    if (result.verdict === 'block' && !options.warnOnly) {
      log.error('Blocked: request explicit human approval or adjust the change (or run with --warn-only).');
      process.exitCode = 1;
    } else if (result.verdict === 'block') {
      log.warn('Would block (suppressed by --warn-only).');
    } else if (result.verdict === 'warn') {
      log.warn('Proceed with review.');
    }
  });
