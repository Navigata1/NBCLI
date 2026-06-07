import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdtempSync, rmSync } from 'fs';
import { execSync } from 'child_process';
import { tmpdir } from 'os';
import path from 'path';

const CLI_PATH = path.resolve(__dirname, '../../dist/cli.js');
const cliBuilt = existsSync(CLI_PATH);

describe.skipIf(!cliBuilt)('cli e2e adapters v2.12 (grok/aider/junie + detect)', () => {
  let dir: string;
  const run = (args: string) =>
    execSync(`node "${CLI_PATH}" ${args}`, {
      cwd: dir,
      encoding: 'utf-8',
      env: { ...process.env, NO_COLOR: '1', CI: '1' },
    });

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'nbcli-adapters12-'));
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it('generates Grok (AGENTS.md) / Aider (CONVENTIONS.md) / Junie (.junie/guidelines.md)', () => {
    run('init --yes --tools grok,aider,junie');
    expect(existsSync(path.join(dir, 'AGENTS.md'))).toBe(true);
    expect(existsSync(path.join(dir, 'CONVENTIONS.md'))).toBe(true);
    expect(existsSync(path.join(dir, '.junie', 'guidelines.md'))).toBe(true);
  });

  it('codex + grok de-dupe the shared AGENTS.md (no crash, one file)', () => {
    run('init --yes --tools codex,grok');
    expect(existsSync(path.join(dir, 'AGENTS.md'))).toBe(true);
  });

  it('adapters --detect reports which targets are present', () => {
    run('init --yes --tools claude');
    const out = run('adapters --detect');
    expect(out).toContain('CLAUDE.md');
    expect(out).toContain('AGENTS.md');
  });
});
