import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdtempSync, rmSync } from 'fs';
import { execSync } from 'child_process';
import { tmpdir } from 'os';
import path from 'path';

const CLI_PATH = path.resolve(__dirname, '../../dist/cli.js');
const cliBuilt = existsSync(CLI_PATH);

describe.skipIf(!cliBuilt)('cli e2e budget + ledger', () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'nbcli-budget-'));
    execSync(`node "${CLI_PATH}" init --yes`, { cwd: dir, encoding: 'utf-8' });
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  const run = (args: string) => execSync(`node "${CLI_PATH}" ${args}`, { cwd: dir, encoding: 'utf-8' });

  it('records spend and verifies the hash chain', () => {
    run('budget record --usd 1.50 --tokens 1000 --summary smoke');
    expect(run('budget verify')).toContain('intact');
  });

  it('exits nonzero when the per-project USD cap is exceeded (professional cap = 50)', () => {
    // record appends, then showBudget detects the breach and sets exit 1.
    expect(() => run('budget record --usd 60')).toThrow();
    // the entry was still appended before the throttle exit; chain stays intact.
    expect(run('budget verify')).toContain('intact');
  });

  it('rejects a non-finite --usd value', () => {
    expect(() => run('budget record --usd abc')).toThrow();
  });
});
