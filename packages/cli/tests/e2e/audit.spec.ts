import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'fs';
import { execSync } from 'child_process';
import { tmpdir } from 'os';
import path from 'path';

const CLI_PATH = path.resolve(__dirname, '../../dist/cli.js');
const cliBuilt = existsSync(CLI_PATH);

describe.skipIf(!cliBuilt)('cli e2e audit', () => {
  let dir: string;
  const run = (args: string) => execSync(`node "${CLI_PATH}" ${args}`, { cwd: dir, encoding: 'utf-8' });

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'nbcli-audit-'));
    run('init --yes');
    run('budget record --usd 2 --tokens 500 --summary smoke');
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it('summary reports integrity and spend', () => {
    const out = run('audit');
    expect(out).toContain('Integrity');
    expect(out).toContain('$2.00');
  });

  it('exports CSV with a header row and writes a file', () => {
    expect(run('audit export --format csv')).toContain('seq,timestamp,kind');
    run('audit export --format csv --out audit.csv');
    expect(existsSync(path.join(dir, 'audit.csv'))).toBe(true);
    expect(readFileSync(path.join(dir, 'audit.csv'), 'utf-8')).toContain('seq,timestamp,kind');
  });

  it('verify reports an intact chain', () => {
    expect(run('audit verify')).toContain('intact');
  });
});
