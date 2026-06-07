import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdtempSync, rmSync } from 'fs';
import { execSync } from 'child_process';
import { tmpdir } from 'os';
import path from 'path';

const CLI_PATH = path.resolve(__dirname, '../../dist/cli.js');
const cliBuilt = existsSync(CLI_PATH);

describe.skipIf(!cliBuilt)('cli e2e policy export', () => {
  let dir: string;
  const run = (args: string) =>
    execSync(`node "${CLI_PATH}" ${args}`, {
      cwd: dir,
      encoding: 'utf-8',
      env: { ...process.env, NO_COLOR: '1', CI: '1' },
    });

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'nbcli-policy-'));
    run('init --yes');
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it('rego export compiles built-in anchors (auth_path as case-insensitive substring, regression)', () => {
    const out = run('policy export --format rego');
    expect(out).toContain('package nbcli.governance');
    expect(out).toContain('contains(lower(input.path), "/auth/")');
    expect(out).not.toContain('regex.match("(?i)auth"');
  });

  it('cedar export forbids the auth path', () => {
    expect(run('policy export --format cedar')).toContain('resource.path like "*/auth/*"');
  });

  it('--out writes a policy file', () => {
    run('policy export --format rego --out policy.rego');
    expect(existsSync(path.join(dir, 'policy.rego'))).toBe(true);
  });
});
