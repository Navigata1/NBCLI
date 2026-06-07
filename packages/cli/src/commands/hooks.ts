import { Command } from 'commander';
import path from 'path';
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { execFileSync, execSync } from 'child_process';
import { log } from '../utils/logger';
import { printMini } from '../utils/banner';
import { colors, icons } from '../utils/theme';

const BEGIN = '# >>> nbcli managed >>>';
const END = '# <<< nbcli managed <<<';
// Both hooks fail CLOSED: if `nsb` is not on PATH they BLOCK rather than silently allow.
const PRECOMMIT_BLOCK = `${BEGIN}\ncommand -v nsb >/dev/null 2>&1 || { echo "NBCLI: nsb not on PATH - blocking commit (npm i -g @nsb/cli)" >&2; exit 1; }\nnsb check --staged || exit 1\n${END}`;
const CLAUDE_HOOK_CMD =
  'command -v nsb >/dev/null 2>&1 || { echo "NBCLI: nsb not on PATH - blocking edit (npm i -g @nsb/cli)" >&2; exit 2; }; nsb check --hook';
// Cover every file-mutating Claude Code tool (Bash-driven writes are inherently out of scope for a tool-name matcher).
const HOOK_MATCHER = 'Write|Edit|MultiEdit|NotebookEdit';

function nsbResolvable(): boolean {
  try {
    execSync(process.platform === 'win32' ? 'where nsb' : 'command -v nsb', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

interface ClaudeHookEntry {
  matcher?: string;
  hooks?: Array<{ type: string; command: string }>;
}
interface ClaudeSettings {
  hooks?: { PreToolUse?: ClaudeHookEntry[] } & Record<string, unknown>;
  [key: string]: unknown;
}

function gitTopLevel(root: string): string | undefined {
  try {
    return execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: root, encoding: 'utf-8' }).trim();
  } catch {
    return undefined;
  }
}

const stripBlock = (content: string): string =>
  content.replace(new RegExp(`\\n*${BEGIN}[\\s\\S]*?${END}\\n*`, 'g'), '\n');

// ---- pre-commit hook ----
function installPrecommit(gitRoot: string): string {
  const hookPath = path.join(gitRoot, '.git', 'hooks', 'pre-commit');
  let content = existsSync(hookPath) ? readFileSync(hookPath, 'utf-8') : '#!/bin/sh\n';
  content = stripBlock(content);
  if (!content.startsWith('#!')) content = `#!/bin/sh\n${content}`;
  content = `${content.replace(/\n*$/, '\n')}${PRECOMMIT_BLOCK}\n`;
  mkdirSync(path.dirname(hookPath), { recursive: true });
  writeFileSync(hookPath, content, 'utf-8');
  chmodSync(hookPath, 0o755);
  return hookPath;
}

function removePrecommit(gitRoot: string): boolean {
  const hookPath = path.join(gitRoot, '.git', 'hooks', 'pre-commit');
  if (!existsSync(hookPath)) return false;
  const content = readFileSync(hookPath, 'utf-8');
  if (!content.includes(BEGIN)) return false;
  const stripped = stripBlock(content).trim();
  writeFileSync(hookPath, stripped === '#!/bin/sh' || stripped === '' ? '#!/bin/sh\n' : `${stripped}\n`, 'utf-8');
  return true;
}

function precommitInstalled(gitRoot: string): boolean {
  const hookPath = path.join(gitRoot, '.git', 'hooks', 'pre-commit');
  return existsSync(hookPath) && readFileSync(hookPath, 'utf-8').includes(BEGIN);
}

// ---- Claude Code PreToolUse hook ----
function claudeSettingsPath(root: string): string {
  return path.join(root, '.claude', 'settings.json');
}

function readSettings(file: string): ClaudeSettings {
  if (!existsSync(file)) return {};
  try {
    return JSON.parse(readFileSync(file, 'utf-8')) as ClaudeSettings;
  } catch {
    return {};
  }
}

function installClaudeHook(root: string): string {
  const file = claudeSettingsPath(root);
  const settings = readSettings(file);
  settings.hooks = settings.hooks ?? {};
  settings.hooks.PreToolUse = settings.hooks.PreToolUse ?? [];
  const present = settings.hooks.PreToolUse.some((entry) =>
    entry.hooks?.some((h) => h.command === CLAUDE_HOOK_CMD),
  );
  if (!present) {
    settings.hooks.PreToolUse.push({
      matcher: HOOK_MATCHER,
      hooks: [{ type: 'command', command: CLAUDE_HOOK_CMD }],
    });
  }
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(settings, null, 2)}\n`, 'utf-8');
  return file;
}

function removeClaudeHook(root: string): boolean {
  const file = claudeSettingsPath(root);
  if (!existsSync(file)) return false;
  const settings = readSettings(file);
  const before = settings.hooks?.PreToolUse?.length ?? 0;
  if (!settings.hooks?.PreToolUse) return false;
  settings.hooks.PreToolUse = settings.hooks.PreToolUse.filter(
    (entry) => !entry.hooks?.some((h) => h.command === CLAUDE_HOOK_CMD),
  );
  if (settings.hooks.PreToolUse.length === before) return false;
  writeFileSync(file, `${JSON.stringify(settings, null, 2)}\n`, 'utf-8');
  return true;
}

function claudeHookInstalled(root: string): boolean {
  const settings = readSettings(claudeSettingsPath(root));
  return Boolean(
    settings.hooks?.PreToolUse?.some((entry) => entry.hooks?.some((h) => h.command === CLAUDE_HOOK_CMD)),
  );
}

export const hooksCommand = new Command('hooks')
  .description('Install/remove enforcement hooks (git pre-commit + Claude Code PreToolUse)')
  .argument('[action]', 'install | uninstall | status', 'status')
  .action((action: string) => {
    printMini();
    const root = process.cwd();
    const gitRoot = gitTopLevel(root);

    if (action === 'install') {
      if (gitRoot) {
        const hookPath = installPrecommit(gitRoot);
        log.success(`git pre-commit → ${colors.dim(path.relative(root, hookPath) || hookPath)} (runs \`nsb check --staged\`)`);
      } else {
        log.warn('Not a git repo — skipped pre-commit hook.');
      }
      const settingsFile = installClaudeHook(root);
      log.success(`Claude Code PreToolUse → ${colors.dim(path.relative(root, settingsFile))} (runs \`${CLAUDE_HOOK_CMD}\`)`);
      log.blank();
      log.info('Enforcement active: risky changes are blocked per the hook profile (strict blocks, standard warns/blocks, minimal warns).');
      if (nsbResolvable()) {
        log.dim('Covers Write/Edit/MultiEdit/NotebookEdit. Bash-driven writes are out of scope.');
      } else {
        log.warn('`nsb` is not on PATH yet — hooks FAIL CLOSED (block) until you install it: npm i -g @nsb/cli');
      }
      return;
    }

    if (action === 'uninstall') {
      const a = gitRoot ? removePrecommit(gitRoot) : false;
      const b = removeClaudeHook(root);
      if (a) log.success('Removed git pre-commit block.');
      if (b) log.success('Removed Claude Code PreToolUse hook.');
      if (!a && !b) log.info('No NBCLI-managed hooks were installed.');
      return;
    }

    // status
    log.subheader('Enforcement hooks');
    const git = gitRoot ? precommitInstalled(gitRoot) : false;
    const claude = claudeHookInstalled(root);
    const mark = (on: boolean) => (on ? colors.success(`${icons.success} installed`) : colors.muted(`${icons.dot} not installed`));
    log.keyValue('git pre-commit', `${mark(git)}${gitRoot ? '' : ' (not a git repo)'}`);
    log.keyValue('Claude PreToolUse', mark(claude));
    log.keyValue('nsb on PATH', nsbResolvable() ? colors.success('yes') : colors.warning('no (hooks fail closed)'));
    if (!git && !claude) log.dim('Run `nsb hooks install` to enforce governance locally.');
  });

// Exported for tests.
export const __internals = { BEGIN, END, PRECOMMIT_BLOCK, CLAUDE_HOOK_CMD, HOOK_MATCHER, stripBlock };
