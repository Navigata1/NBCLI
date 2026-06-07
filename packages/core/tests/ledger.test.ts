import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { appendEntry, filterEntries, readLedger, summarizeSpend, toCsv, verifyLedger } from '../src/ledger';

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

describe('ledger HMAC signing + runId', () => {
  let hdir: string;
  let hfile: string;
  const hnow = () => new Date(Date.UTC(2026, 5, 7, 0, 0, 0)).toISOString();

  beforeEach(() => {
    hdir = mkdtempSync(path.join(tmpdir(), 'nbcli-ledger-hmac-'));
    hfile = path.join(hdir, 'runs.jsonl');
  });
  afterEach(() => rmSync(hdir, { recursive: true, force: true }));

  it('signs entries when a key is provided and verifies with it', () => {
    appendEntry(hfile, { kind: 'decision', summary: 'a' }, hnow, { key: 'secret' });
    const entry = appendEntry(hfile, { kind: 'decision', summary: 'b' }, hnow, { key: 'secret' });
    expect(entry.signed).toBe(true);
    expect(verifyLedger(hfile, { key: 'secret' }).valid).toBe(true);
  });

  it('detects tampering on a signed chain (hmac mismatch)', () => {
    appendEntry(hfile, { kind: 'decision', summary: 'original' }, hnow, { key: 'secret' });
    const lines = readFileSync(hfile, 'utf-8').split('\n').filter(Boolean);
    const e = JSON.parse(lines[0]);
    e.summary = 'TAMPERED';
    writeFileSync(hfile, `${JSON.stringify(e)}\n`, 'utf-8');
    const result = verifyLedger(hfile, { key: 'secret' });
    expect(result.valid).toBe(false);
    expect(result.reason).toBe('hmac mismatch');
  });

  it('signed entries are unverifiable without the key', () => {
    appendEntry(hfile, { kind: 'decision', summary: 'a' }, hnow, { key: 'secret' });
    const result = verifyLedger(hfile);
    expect(result.valid).toBe(false);
    expect(result.reason).toContain('NSB_LEDGER_KEY');
  });

  it('summarizeSpend filters by runId', () => {
    appendEntry(hfile, { kind: 'spend', costUsd: 1, runId: 'r1' }, hnow);
    appendEntry(hfile, { kind: 'spend', costUsd: 2, runId: 'r2' }, hnow);
    appendEntry(hfile, { kind: 'spend', costUsd: 4, runId: 'r1' }, hnow);
    expect(summarizeSpend(hfile, 'r1').totalUsd).toBe(5);
    expect(summarizeSpend(hfile, 'r2').totalUsd).toBe(2);
    expect(summarizeSpend(hfile).totalUsd).toBe(7);
  });
});

describe('ledger filter + CSV export', () => {
  let fdir: string;
  let ffile: string;
  const fnow = () => new Date(Date.UTC(2026, 5, 7, 1, 0, 0)).toISOString();

  beforeEach(() => {
    fdir = mkdtempSync(path.join(tmpdir(), 'nbcli-ledger-csv-'));
    ffile = path.join(fdir, 'runs.jsonl');
  });
  afterEach(() => rmSync(fdir, { recursive: true, force: true }));

  it('filters entries by kind', () => {
    appendEntry(ffile, { kind: 'spend', costUsd: 1 }, fnow);
    appendEntry(ffile, { kind: 'decision', summary: 'd' }, fnow);
    expect(filterEntries(readLedger(ffile), { kind: 'spend' })).toHaveLength(1);
    expect(filterEntries(readLedger(ffile), {})).toHaveLength(2);
  });

  it('exports CSV with a header and proper escaping', () => {
    appendEntry(ffile, { kind: 'note', summary: 'has, comma' }, fnow);
    const csv = toCsv(readLedger(ffile));
    expect(csv.split('\n')[0]).toContain('seq,timestamp,kind');
    expect(csv).toContain('"has, comma"');
  });

  it('neutralizes spreadsheet formula injection', () => {
    appendEntry(ffile, { kind: 'note', summary: '=HYPERLINK("http://evil","x")' }, fnow);
    const csv = toCsv(readLedger(ffile));
    expect(csv).toContain("'=HYPERLINK");
  });
});
