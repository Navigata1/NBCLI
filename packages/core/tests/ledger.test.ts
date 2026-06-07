import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { appendEntry, readLedger, summarizeSpend, verifyLedger } from '../src/ledger';

let dir: string;
let file: string;
let clock: number;
const now = () => new Date(clock).toISOString();

beforeEach(() => {
  dir = mkdtempSync(path.join(tmpdir(), 'nbcli-ledger-'));
  file = path.join(dir, 'runs.jsonl');
  clock = Date.UTC(2026, 5, 6, 12, 0, 0);
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

describe('ledger append + chain', () => {
  it('creates the file and seals a genesis entry', () => {
    const entry = appendEntry(file, { kind: 'run', summary: 'init' }, now);
    expect(existsSync(file)).toBe(true);
    expect(entry.seq).toBe(0);
    expect(entry.prevHash).toBe('GENESIS');
    expect(entry.hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it('chains prevHash across entries', () => {
    const a = appendEntry(file, { kind: 'run', summary: 'a' }, now);
    clock += 1000;
    const b = appendEntry(file, { kind: 'decision', summary: 'b', actor: 'opus-4-8' }, now);
    expect(b.seq).toBe(1);
    expect(b.prevHash).toBe(a.hash);
    expect(readLedger(file)).toHaveLength(2);
  });

  it('verifies an intact chain', () => {
    appendEntry(file, { kind: 'run', summary: 'a' }, now);
    clock += 1000;
    appendEntry(file, { kind: 'spend', summary: 'b', costUsd: 0.5, tokens: 1000 }, now);
    const result = verifyLedger(file);
    expect(result.valid).toBe(true);
    expect(result.entries).toBe(2);
  });

  it('detects tampering with a past entry', () => {
    appendEntry(file, { kind: 'run', summary: 'original' }, now);
    clock += 1000;
    appendEntry(file, { kind: 'note', summary: 'second' }, now);

    // Tamper: rewrite the first line's summary, keep its (now wrong) hash.
    const lines = readFileSync(file, 'utf-8').split('\n').filter(Boolean);
    const first = JSON.parse(lines[0]);
    first.summary = 'TAMPERED';
    lines[0] = JSON.stringify(first);
    writeFileSync(file, `${lines.join('\n')}\n`, 'utf-8');

    const result = verifyLedger(file);
    expect(result.valid).toBe(false);
    expect(result.brokenAt).toBe(0);
    expect(result.reason).toBe('hash mismatch');
  });

  it('summarizes spend', () => {
    appendEntry(file, { kind: 'spend', costUsd: 0.25, tokens: 500 }, now);
    clock += 1000;
    appendEntry(file, { kind: 'spend', costUsd: 0.75, tokens: 1500 }, now);
    const summary = summarizeSpend(file);
    expect(summary.totalUsd).toBeCloseTo(1.0);
    expect(summary.totalTokens).toBe(2000);
    expect(summary.count).toBe(2);
  });

  it('returns empty results for a missing ledger', () => {
    const missing = path.join(dir, 'none.jsonl');
    expect(readLedger(missing)).toEqual([]);
    expect(verifyLedger(missing).valid).toBe(true);
    expect(summarizeSpend(missing).count).toBe(0);
  });
});
