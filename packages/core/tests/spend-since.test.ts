import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { appendEntry, summarizeSpend } from '../src/ledger';

describe('summarizeSpend sinceSeq (batch-boundary delta)', () => {
  let dir: string;
  let file: string;
  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'nbcli-since-'));
    file = path.join(dir, 'runs.jsonl');
    appendEntry(file, { kind: 'spend', costUsd: 1, tokens: 100 }); // seq 0
    appendEntry(file, { kind: 'spend', costUsd: 3, tokens: 300 }); // seq 1
    appendEntry(file, { kind: 'spend', costUsd: 5, tokens: 500 }); // seq 2
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it('sums all spend with no boundary', () => {
    expect(summarizeSpend(file)).toMatchObject({ totalUsd: 9, totalTokens: 900, count: 3 });
  });

  it('reports only spend recorded AFTER the boundary seq', () => {
    expect(summarizeSpend(file, undefined, 0)).toMatchObject({ totalUsd: 8, totalTokens: 800, count: 2 });
    expect(summarizeSpend(file, undefined, 1)).toMatchObject({ totalUsd: 5, totalTokens: 500, count: 1 });
    expect(summarizeSpend(file, undefined, 2)).toMatchObject({ totalUsd: 0, totalTokens: 0, count: 0 });
  });
});
