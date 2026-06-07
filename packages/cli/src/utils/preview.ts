import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { resolveHookProfile } from '../generators/instruction-base';
import { generateToolFiles } from './generate';
import { getPlannedWrites, setDryRun, type PlannedWrite } from './files';
import { formatBudgets, formatPermissions, formatThresholds } from './format';
import { colors, icons } from './theme';
import { log } from './logger';

export type Verdict = 'ready' | 'warning' | 'blocked';

export interface PreviewReport {
  verdict: Verdict;
  profile: string;
  hookProfile: string;
  thresholds: string;
  tools: string[];
  planned: PlannedWrite[];
  collisions: PlannedWrite[];
  budgets: string | null;
  permissions: string[];
  mcp: { adapterAvailable: boolean; transports: string[]; projectWired: boolean };
  auth: { opCli: boolean; opRefsInConfig: boolean };
  notes: string[];
  blockers: string[];
}

function commandExists(cmd: string): boolean {
  try {
    execSync(process.platform === 'win32' ? `where ${cmd}` : `command -v ${cmd}`, {
      stdio: 'ignore',
    });
    return true;
  } catch {
    return false;
  }
}

function readSafe(file: string): string {
  try {
    return readFileSync(file, 'utf-8');
  } catch {
    return '';
  }
}

function detectMcpWiring(root: string): boolean {
  const candidates = [
    '.mcp.json',
    path.join('.cursor', 'mcp.json'),
    path.join('.claude', 'settings.json'),
    path.join('.vscode', 'mcp.json'),
  ];
  return candidates.some((rel) => {
    const file = path.resolve(root, rel);
    return existsSync(file) && /nsb|north[\s-]?star|mcp-server/i.test(readSafe(file));
  });
}

/**
 * Build a verdict report from an ALREADY-computed list of planned writes.
 * Pure (only reads the filesystem to probe MCP/auth) — no writes.
 */
export function buildReport(opts: {
  root: string;
  config: GovernanceConfig;
  tools: string[];
  force: boolean;
  planned: PlannedWrite[];
}): PreviewReport {
  const { root, config, tools, force, planned } = opts;

  const collisions = planned.filter((write) => write.existed && !force);
  const permissions = formatPermissions(config.permissions);
  const opRefsInConfig = JSON.stringify(config.permissions ?? {}).includes('op://');

  const notes: string[] = [];
  const blockers: string[] = [];

  if (tools.length === 0) {
    blockers.push('No tools selected — nothing would be generated.');
  }
  if (collisions.length > 0) {
    notes.push(`${collisions.length} target file(s) already exist; re-run with --force to overwrite.`);
  }
  if (
    config.budgets &&
    config.budgets.per_run_usd == null &&
    config.budgets.per_project_usd == null &&
    config.budgets.per_run_tokens == null
  ) {
    notes.push('Budgets block present but no caps set.');
  }

  const verdict: Verdict =
    blockers.length > 0 ? 'blocked' : notes.length > 0 ? 'warning' : 'ready';

  return {
    verdict,
    profile: config.governance.profile,
    hookProfile: resolveHookProfile(config),
    thresholds: formatThresholds(config.confidence.thresholds),
    tools,
    planned,
    collisions,
    budgets: formatBudgets(config.budgets),
    permissions,
    mcp: {
      adapterAvailable: true,
      transports: ['stdio (MCP)', 'http (legacy API)'],
      projectWired: detectMcpWiring(root),
    },
    auth: { opCli: commandExists('op'), opRefsInConfig },
    notes,
    blockers,
  };
}

/**
 * Convenience: compute planned writes for the selected tool files (via global
 * dry-run) and build a report. Used by `nsb preview` and `nsb update --dry-run`.
 */
export function gatherPreview(opts: {
  root: string;
  config: GovernanceConfig;
  anchors: AnchorCollection;
  tools: string[];
  force: boolean;
}): PreviewReport {
  const { root, config, anchors, tools, force } = opts;
  setDryRun(true);
  try {
    generateToolFiles(root, config, anchors, tools, force);
  } catch {
    // dry-run never throws on collisions; ignore renderer hiccups.
  }
  const planned = getPlannedWrites();
  setDryRun(false);
  return buildReport({ root, config, tools, force, planned });
}

const VERDICT_BADGE: Record<Verdict, string> = {
  ready: colors.success('● READY'),
  warning: colors.warning('● WARNING'),
  blocked: colors.error('● BLOCKED'),
};

/** Pretty-print a preview report (no side effects beyond stdout). */
export function renderPreview(report: PreviewReport): void {
  log.blank();
  log.subheader('Dry run — resolved plan (no files written, no model run)');
  log.blank();
  log.keyValue('Verdict', VERDICT_BADGE[report.verdict]);
  log.keyValue('Profile', report.profile);
  log.keyValue('Hook profile', report.hookProfile);
  log.keyValue('Thresholds', report.thresholds);
  log.keyValue('Tools', report.tools.length ? report.tools.join(', ') : '(none)');
  log.keyValue('Budgets', report.budgets ?? '(none)');
  log.keyValue(
    'MCP',
    `adapter available [${report.mcp.transports.join(', ')}] · project wired: ${report.mcp.projectWired ? 'yes' : 'no'}`,
  );
  log.keyValue(
    '1Password',
    `op CLI: ${report.auth.opCli ? 'found' : 'not found'} · op:// refs: ${report.auth.opRefsInConfig ? 'yes' : 'no'}`,
  );
  if (report.permissions.length) {
    log.blank();
    log.subheader('Permissions');
    report.permissions.forEach((line) => log.step(line));
  }
  log.blank();
  log.subheader('Files that would be written');
  if (report.planned.length === 0) {
    log.dim('(none)');
  } else {
    report.planned.forEach((write) => {
      const flag = write.existed ? colors.warning('overwrite') : colors.success('create');
      console.log(`  ${icons.arrow} ${flag} ${colors.dim(write.path)} (${write.bytes} B)`);
    });
  }
  if (report.notes.length) {
    log.blank();
    report.notes.forEach((note) => log.warn(note));
  }
  if (report.blockers.length) {
    log.blank();
    report.blockers.forEach((blocker) => log.error(blocker));
  }
  log.blank();
}
