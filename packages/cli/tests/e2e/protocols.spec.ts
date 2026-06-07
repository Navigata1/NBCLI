import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'fs';
import { execSync } from 'child_process';
import { tmpdir } from 'os';
import path from 'path';

const CLI_PATH = path.resolve(__dirname, '../../dist/cli.js');
const cliBuilt = existsSync(CLI_PATH);

describe.skipIf(!cliBuilt)('cli e2e protocols emit', () => {
  let dir: string;
  const run = (args: string) =>
    execSync(`node "${CLI_PATH}" ${args}`, {
      cwd: dir,
      encoding: 'utf-8',
      env: { ...process.env, NO_COLOR: '1', CI: '1' },
    });

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'nbcli-protocols-'));
    run('init --yes');
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it('emits MCP host config, memory backend, and the protocols guide', () => {
    run('protocols emit');
    const base = path.join(dir, '.mbf', 'integrations');
    expect(existsSync(path.join(base, 'mcp.json'))).toBe(true);
    expect(existsSync(path.join(base, 'memory-backend.json'))).toBe(true);
    expect(existsSync(path.join(base, 'PROTOCOLS.md'))).toBe(true);
    expect(JSON.parse(readFileSync(path.join(base, 'mcp.json'), 'utf-8')).mcpServers['north-star'].command).toBe('nsb-mcp');
  });
});
