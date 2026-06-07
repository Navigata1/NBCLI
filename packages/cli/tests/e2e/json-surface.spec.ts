import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { tmpdir } from 'os';
import path from 'path';

const CLI_PATH = path.resolve(__dirname, '../../dist/cli.js');
const cliBuilt = existsSync(CLI_PATH);

describe.skipIf(!cliBuilt)('cli e2e --json machine-readable surface', () => {
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
    dir = mkdtempSync(path.join(tmpdir(), 'nbcli-json-'));
    run('init --yes');
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it('check --json returns an allow verdict object for ordinary code', () => {
    writeFileSync(path.join(dir, 'plain.ts'), 'export const x = 1;\n');
    const parsed = JSON.parse(run('check plain.ts --json'));
    expect(parsed.verdict).toBe('allow');
    expect(parsed.profile).toBeTruthy();
  });

  it('check --json returns block + exit 1 for an auth path', () => {
    mkdirSync(path.join(dir, 'src', 'auth'), { recursive: true });
    writeFileSync(path.join(dir, 'src', 'auth', 'login.ts'), 'const x = 1;\n');
    const { out, code } = runExit('check src/auth/login.ts --profile strict --json');
    expect(code).toBe(1);
    expect(JSON.parse(out).verdict).toBe('block');
  });

  it('eval --json emits accuracy + false-negative count', () => {
    const parsed = JSON.parse(run('eval --json'));
    expect(parsed.accuracy).toBe(1);
    expect(parsed.falseNegatives).toBe(0);
  });

  it('model-route --json emits a model recommendation', () => {
    const parsed = JSON.parse(run('model-route --kind plan --json'));
    expect(parsed.model).toBeTruthy();
    expect(parsed.effort).toBeTruthy();
  });

  it('stats --json emits local metrics (no network)', () => {
    run('budget record --usd 1 --tokens 100 --summary s');
    const parsed = JSON.parse(run('stats --json'));
    expect(typeof parsed.entries).toBe('number');
    expect(parsed.totalUsd).toBeGreaterThanOrEqual(1);
  });

  it('eval --json stays pure JSON even with a malformed project fixture (warn → stderr)', () => {
    mkdirSync(path.join(dir, '.mbf', 'eval'), { recursive: true });
    writeFileSync(path.join(dir, '.mbf', 'eval', 'broken.json'), '{ not json');
    const out = run('eval --json');
    expect(() => JSON.parse(out)).not.toThrow();
  });
});
