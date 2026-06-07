import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { tmpdir } from 'os';
import path from 'path';

const CLI_PATH = path.resolve(__dirname, '../../dist/cli.js');
const cliBuilt = existsSync(CLI_PATH);

describe.skipIf(!cliBuilt)('cli e2e sandbox + workflow validate', () => {
  let dir: string;
  const run = (args: string) =>
    execSync(`node "${CLI_PATH}" ${args}`, {
      cwd: dir,
      encoding: 'utf-8',
      env: { ...process.env, NO_COLOR: '1', CI: '1' },
    });
  const runExit = (args: string): { out: string; code: number } => {
    try {
      return { out: run(args), code: 0 };
    } catch (err) {
      const e = err as { status?: number; stdout?: string };
      return { out: e.stdout ?? '', code: e.status ?? 0 };
    }
  };

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'nbcli-sandbox-'));
    run('init --yes');
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it('sandbox run --print emits a network-off docker command (no Docker needed)', () => {
    const out = run('sandbox run --print -- echo hi');
    expect(out).toContain('docker run --rm --network none');
    expect(out).toContain(':/work');
  });

  it('workflow plan then validate → valid', () => {
    run('workflow plan');
    expect(run('workflow validate')).toContain('valid');
  });

  it('workflow validate on a malformed plan → invalid (exit 1)', () => {
    writeFileSync(path.join(dir, 'bad.json'), '{"name":"x"}');
    const { code } = runExit('workflow validate --file bad.json');
    expect(code).toBe(1);
  });
});
