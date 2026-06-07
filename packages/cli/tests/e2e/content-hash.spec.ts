import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { tmpdir } from 'os';
import path from 'path';

const CLI_PATH = path.resolve(__dirname, '../../dist/cli.js');
const cliBuilt = existsSync(CLI_PATH);

describe.skipIf(!cliBuilt)('cli e2e content-hash discipline (nsb update --check)', () => {
  let dir: string;
  const run = (args: string) =>
    execSync(`node "${CLI_PATH}" ${args}`, {
      cwd: dir,
      encoding: 'utf-8',
      env: { ...process.env, NO_COLOR: '1', CI: '1' },
    });
  const runExit = (args: string): number => {
    try {
      run(args);
      return 0;
    } catch (err) {
      return (err as { status?: number }).status ?? 0;
    }
  };

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'nbcli-stamp-'));
    run('init --yes');
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it('generated files carry the NBB bootstrap + a content-hash stamp', () => {
    const claude = readFileSync(path.join(dir, 'CLAUDE.md'), 'utf-8');
    expect(claude).toContain('North Star bootstrap (ignition)');
    expect(claude).toContain('nbcli-generated sha256:');
  });

  it('update --check passes on freshly generated files', () => {
    expect(run('update --check')).toContain('in sync');
  });

  it('detects a hand-edit (exit 1), then regenerates clean', () => {
    writeFileSync(path.join(dir, 'CLAUDE.md'), `${readFileSync(path.join(dir, 'CLAUDE.md'), 'utf-8')}\nsneaky edit\n`);
    expect(runExit('update --check')).toBe(1);
    run('update');
    expect(runExit('update --check')).toBe(0);
  });
});
