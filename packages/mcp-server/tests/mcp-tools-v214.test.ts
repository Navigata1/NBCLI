import { describe, expect, it, afterEach } from 'vitest';
import { mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { appendEntry } from '@nsb/core';
import { callTool } from '../src/mcp';

describe('mcp tools v2.14', () => {
  afterEach(() => {
    delete process.env.NSB_LEDGER;
  });

  it('evaluate_change blocks an auth path under strict', () => {
    const r = callTool('evaluate_change', {
      targets: [{ path: 'src/auth/login.ts' }],
      profile: 'strict',
    }) as { verdict: string };
    expect(r.verdict).toBe('block');
  });

  it('evaluate_change allows ordinary code under strict', () => {
    const r = callTool('evaluate_change', {
      targets: [{ path: 'src/util.ts', content: 'export const x = 1;' }],
      profile: 'strict',
    }) as { verdict: string };
    expect(r.verdict).toBe('allow');
  });

  it('list_anchors returns the built-in library', () => {
    const a = callTool('list_anchors', {}) as Record<string, unknown>;
    expect(Object.keys(a)).toContain('security');
  });

  it('audit_query summarizes the ledger', () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'nbcli-mcpaudit-'));
    const file = path.join(dir, 'runs.jsonl');
    process.env.NSB_LEDGER = file;
    appendEntry(file, { kind: 'spend', costUsd: 2, tokens: 100 });
    const q = callTool('audit_query', {}) as { count: number; spend: { totalUsd: number } };
    expect(q.count).toBeGreaterThanOrEqual(1);
    expect(q.spend.totalUsd).toBeGreaterThanOrEqual(2);
    rmSync(dir, { recursive: true, force: true });
  });
});
