import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { tmpdir } from 'os';
import path from 'path';

const CLI_PATH = path.resolve(__dirname, '../../dist/cli.js');
const cliBuilt = existsSync(CLI_PATH);

describe.skipIf(!cliBuilt)('cli e2e conformance brief features (deny-enforce / hook-disable / batch-delta)', () => {
  let dir: string;
  const env = { ...process.env, NO_COLOR: '1', CI: '1' };
  const run = (args: string, extraEnv: Record<string, string> = {}): { code: number; out: string } => {
    try {
      const out = execSync(`node "${CLI_PATH}" ${args}`, { cwd: dir, encoding: 'utf-8', env: { ...env, ...extraEnv } });
      return { code: 0, out };
    } catch (err) {
      const e = err as { status?: number; stdout?: string; stderr?: string };
      return { code: e.status ?? 0, out: `${e.stdout ?? ''}${e.stderr ?? ''}` };
    }
  };

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'nbcli-brief-'));
    run('init --yes');
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it('enforces user-declared permissions.deny in `nsb check`', () => {
    writeFileSync(
      path.join(dir, '.mbf', 'mbf-governance.yaml'),
      'version: "1.0"\ngovernance:\n  profile: professional\npermissions:\n  deny:\n    - "Write(forbidden_zone/*)"\n',
    );
    mkdirSync(path.join(dir, 'forbidden_zone'), { recursive: true });
    mkdirSync(path.join(dir, 'not_forbidden_zone'), { recursive: true });
    writeFileSync(path.join(dir, 'forbidden_zone', 'x.ts'), 'const x = 1;\n');
    writeFileSync(path.join(dir, 'safe.ts'), 'const ok = 1;\n');
    // C2 regressions: a sibling dir whose name CONTAINS the denied path, and a file whose CONTENT
    // mentions the denied path — neither must be over-blocked (anchored PATH match only).
    writeFileSync(path.join(dir, 'not_forbidden_zone', 'y.ts'), 'const y = 1;\n');
    writeFileSync(path.join(dir, 'mentions.ts'), '// see forbidden_zone/notes for history\n');
    expect(run('check forbidden_zone/x.ts --profile standard --json').out).toContain('"verdict": "block"');
    expect(run('check safe.ts --profile standard --json').out).toContain('"verdict": "allow"');
    expect(run('check not_forbidden_zone/y.ts --profile standard --json').out).toContain('"verdict": "allow"');
    expect(run('check mentions.ts --profile standard --json').out).toContain('"verdict": "allow"');
  });

  it('honors NSB_DISABLE_HOOKS=1 as a hook escape hatch (blocks normally, allows when set)', () => {
    const payload = '{"tool_name":"Edit","tool_input":{"file_path":".env","content":"SECRET=x"}}';
    const blocked = (() => {
      try {
        execSync(`printf '%s' '${payload}' | node "${CLI_PATH}" check --hook --profile strict`, { cwd: dir, env, stdio: 'pipe' });
        return 0;
      } catch (e) {
        return (e as { status?: number }).status ?? 0;
      }
    })();
    expect(blocked).toBe(2);
    const allowed = (() => {
      try {
        execSync(`printf '%s' '${payload}' | node "${CLI_PATH}" check --hook --profile strict`, { cwd: dir, env: { ...env, NSB_DISABLE_HOOKS: '1' }, stdio: 'pipe' });
        return 0;
      } catch (e) {
        return (e as { status?: number }).status ?? 0;
      }
    })();
    expect(allowed).toBe(0);
  });

  it('reports a batch-boundary spend delta via `budget --since <seq>`', () => {
    run('budget record --usd 1 --tokens 100'); // seq 0
    run('budget record --usd 3 --tokens 300'); // seq 1
    const out = run('budget --since 0').out;
    expect(out).toContain('$3.00');
    expect(out).toContain('batch delta since seq 0');
  });
});
