import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdtempSync, rmSync } from 'fs';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { tmpdir } from 'os';
import http from 'http';
import path from 'path';

const pexec = promisify(execFile);
const CLI_PATH = path.resolve(__dirname, '../../dist/cli.js');
const cliBuilt = existsSync(CLI_PATH);

describe.skipIf(!cliBuilt)('cli e2e audit sync (opt-in webhook)', () => {
  let dir: string;
  let server: http.Server;
  let received: string[];
  // Async exec so vitest's event loop stays free to serve the in-process mock server.
  const run = async (args: string[]) =>
    (await pexec('node', [CLI_PATH, ...args], { cwd: dir, env: { ...process.env, NO_COLOR: '1', CI: '1' } })).stdout;

  beforeEach(async () => {
    dir = mkdtempSync(path.join(tmpdir(), 'nbcli-sink-'));
    await run(['init', '--yes']);
    await run(['budget', 'record', '--usd', '1', '--tokens', '50', '--summary', 's']);
    received = [];
    server = http.createServer((req, res) => {
      const chunks: Buffer[] = [];
      req.on('data', (c) => chunks.push(c));
      req.on('end', () => {
        received.push(Buffer.concat(chunks).toString('utf-8'));
        res.writeHead(200);
        res.end('ok');
      });
    });
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  });
  afterEach(() => {
    server.close();
    rmSync(dir, { recursive: true, force: true });
  });

  it('no config + no --webhook → stays offline (no POST sent)', async () => {
    await run(['audit', 'sync']);
    expect(received).toHaveLength(0);
  });

  it('--webhook POSTs the ledger entries to the sink', async () => {
    const port = (server.address() as { port: number }).port;
    // loopback http mock: explicitly opt in past the SSRF/https egress guard.
    await run(['audit', 'sync', '--webhook', `http://127.0.0.1:${port}/ingest`, '--allow-insecure', '--allow-private']);
    expect(received).toHaveLength(1);
    const body = JSON.parse(received[0]);
    expect(body.source).toBe('nbcli');
    expect(body.count).toBeGreaterThanOrEqual(1);
  });
});
