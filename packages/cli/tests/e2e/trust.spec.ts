import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { tmpdir } from 'os';
import path from 'path';

const CLI_PATH = path.resolve(__dirname, '../../dist/cli.js');
const cliBuilt = existsSync(CLI_PATH);

describe.skipIf(!cliBuilt)('cli e2e sign / verify / plugin', () => {
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
    dir = mkdtempSync(path.join(tmpdir(), 'nbcli-trust-'));
    run('init --yes');
    run('sign keygen');
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it('sign + verify roundtrip succeeds', () => {
    writeFileSync(path.join(dir, 'f.txt'), 'artifact data\n');
    run('sign file f.txt --key nsb-signing.key');
    expect(existsSync(path.join(dir, 'f.txt.sig'))).toBe(true);
    expect(run('verify f.txt --pub nsb-signing.pub')).toContain('valid');
  });

  it('verify fails (exit 1) on a tampered file', () => {
    writeFileSync(path.join(dir, 'f.txt'), 'artifact data\n');
    run('sign file f.txt --key nsb-signing.key');
    writeFileSync(path.join(dir, 'f.txt'), 'TAMPERED\n');
    expect(runExit('verify f.txt --pub nsb-signing.pub')).toBe(1);
  });

  const makePlugin = (name: string, pkgName: string, code = 'module.exports = 1;\n') => {
    mkdirSync(path.join(dir, name), { recursive: true });
    writeFileSync(path.join(dir, name, 'plugin.json'), `{"name":"${pkgName}","version":"1.0.0"}`);
    writeFileSync(path.join(dir, name, 'index.js'), code);
  };

  it('signed plugin install verifies the whole-tree signature and lists it', () => {
    makePlugin('myplug', 'demo');
    run('plugin sign myplug --key nsb-signing.key');
    expect(run('plugin install myplug --pub nsb-signing.pub')).toContain('verified');
    expect(run('plugin list')).toContain('demo');
  });

  it('rejects a plugin whose CODE changed after signing (whole-tree attestation)', () => {
    makePlugin('tamperplug', 'tp', 'good\n');
    run('plugin sign tamperplug --key nsb-signing.key');
    writeFileSync(path.join(dir, 'tamperplug', 'index.js'), 'EVIL\n'); // manifest unchanged, code tampered
    expect(runExit('plugin install tamperplug --pub nsb-signing.pub')).toBe(1);
  });

  it('refuses a plugin whose name escapes .mbf/plugins (path traversal, exit 1)', () => {
    makePlugin('evilplug', '../../escape');
    expect(runExit('plugin install evilplug')).toBe(1);
    expect(existsSync(path.join(dir, 'escape'))).toBe(false);
  });
});
