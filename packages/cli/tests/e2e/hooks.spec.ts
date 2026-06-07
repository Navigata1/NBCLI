import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'fs';
import { execSync } from 'child_process';
import { tmpdir } from 'os';
import path from 'path';

const CLI_PATH = path.resolve(__dirname, '../../dist/cli.js');
const cliBuilt = existsSync(CLI_PATH);

describe.skipIf(!cliBuilt)('cli e2e hooks (enforcement install)', () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'nbcli-hooks-'));
    execSync('git init -q', { cwd: dir });
    execSync(`node "${CLI_PATH}" init --yes`, { cwd: dir, encoding: 'utf-8' });
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  const run = (args: string) => execSync(`node "${CLI_PATH}" ${args}`, { cwd: dir, encoding: 'utf-8' });

  it('installs a real git pre-commit hook and a Claude PreToolUse hook', () => {
    run('hooks install');
    const preCommit = path.join(dir, '.git', 'hooks', 'pre-commit');
    expect(existsSync(preCommit)).toBe(true);
    expect(readFileSync(preCommit, 'utf-8')).toContain('nsb check --staged');
    const settings = JSON.parse(readFileSync(path.join(dir, '.claude', 'settings.json'), 'utf-8'));
    expect(JSON.stringify(settings)).toContain('nsb check --hook');
  });

  it('status reports installed; uninstall removes the managed block', () => {
    run('hooks install');
    expect(run('hooks status')).toContain('installed');
    run('hooks uninstall');
    const preCommit = readFileSync(path.join(dir, '.git', 'hooks', 'pre-commit'), 'utf-8');
    expect(preCommit).not.toContain('nsb check --staged');
  });
});
