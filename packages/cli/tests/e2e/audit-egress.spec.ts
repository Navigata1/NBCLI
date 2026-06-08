import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdtempSync, rmSync } from 'fs';
import { execSync } from 'child_process';
import { tmpdir } from 'os';
import path from 'path';

const CLI_PATH = path.resolve(__dirname, '../../dist/cli.js');
const cliBuilt = existsSync(CLI_PATH);

describe.skipIf(!cliBuilt)('cli e2e audit sync egress guard', () => {
  let dir: string;
  const run = (args: string): { code: number; out: string } => {
    try {
      const out = execSync(`node "${CLI_PATH}" ${args}`, { cwd: dir, encoding: 'utf-8', env: { ...process.env, NO_COLOR: '1', CI: '1' } });
      return { code: 0, out };
    } catch (err) {
      const e = err as { status?: number; stdout?: string; stderr?: string };
      return { code: e.status ?? 0, out: `${e.stdout ?? ''}${e.stderr ?? ''}` };
    }
  };

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'nbcli-egress-'));
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it('refuses to sync to a loopback webhook (exit 1)', () => {
    const r = run('audit sync --webhook http://127.0.0.1:9/x');
    expect(r.code).toBe(1);
    expect(r.out.toLowerCase()).toContain('refusing');
  });

  it('refuses plaintext http to a public host (exit 1)', () => {
    const r = run('audit sync --webhook http://hooks.example.com/x');
    expect(r.code).toBe(1);
    expect(r.out.toLowerCase()).toContain('refusing');
  });

  it('exercises the HOST guard over https: refuses a loopback target by host (exit 1)', () => {
    const r = run('audit sync --webhook https://127.0.0.1/x');
    expect(r.code).toBe(1);
    expect(r.out.toLowerCase()).toContain('loopback');
  });
});
