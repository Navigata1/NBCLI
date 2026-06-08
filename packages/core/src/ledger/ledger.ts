import {
  appendFileSync,
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  readFileSync,
  unlinkSync,
} from 'fs';
import { dirname } from 'path';
import { createHash, createHmac } from 'crypto';
import type {
  LedgerEntry,
  LedgerEntryInput,
  LedgerKind,
  LedgerOptions,
  LedgerVerification,
  SpendSummary,
} from './types';

const GENESIS = 'GENESIS';
const LOCK_RETRIES = 100;
const LOCK_WAIT_MS = 20;

function resolveKey(opts?: LedgerOptions): string | undefined {
  return opts?.key ?? process.env.NSB_LEDGER_KEY ?? undefined;
}

/**
 * Deterministic hash material for an entry, in a FIXED field order (not object
 * key order) so the digest is stable across runtimes. The `hash`/`signed` fields
 * are excluded. `runId` is included (NBCLI v2.6 ledger format).
 */
function material(entry: Omit<LedgerEntry, 'hash' | 'signed'>): string {
  return JSON.stringify([
    entry.seq,
    entry.timestamp,
    entry.prevHash,
    entry.kind,
    entry.actor ?? null,
    entry.model ?? null,
    entry.gateVersion ?? null,
    entry.summary ?? null,
    entry.costUsd ?? null,
    entry.tokens ?? null,
    entry.runId ?? null,
    entry.payload ?? null,
  ]);
}

// Plain SHA-256, or keyed HMAC-SHA256 when a key is provided. With a key the
// chain is forgery-resistant: an attacker who edits the file cannot recompute a
// valid digest without the key.
function digest(mat: string, key?: string): string {
  return key
    ? createHmac('sha256', key).update(mat).digest('hex')
    : createHash('sha256').update(mat).digest('hex');
}

// Blocking sleep without dependencies (runtime code, not a workflow script).
function sleepSync(ms: number): void {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

// Exclusive cross-process lock around the read-compute-append critical section,
// so concurrent writers (e.g. the CLI and a running MCP server) cannot produce a
// duplicate seq. Uses an O_EXCL lock file — no external dependency.
function withLock<T>(file: string, fn: () => T): T {
  const lockPath = `${file}.lock`;
  let fd: number | undefined;
  for (let i = 0; i < LOCK_RETRIES; i += 1) {
    try {
      fd = openSync(lockPath, 'wx');
      break;
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'EEXIST') throw err;
      sleepSync(LOCK_WAIT_MS);
    }
  }
  if (fd === undefined) throw new Error(`ledger lock timeout: ${lockPath}`);
  try {
    return fn();
  } finally {
    try {
      closeSync(fd);
      unlinkSync(lockPath);
    } catch {
      /* best effort */
    }
  }
}

/** Read all entries from a JSONL ledger file (empty array if absent). */
export function readLedger(file: string): LedgerEntry[] {
  if (!existsSync(file)) return [];
  return readFileSync(file, 'utf-8')
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map((line) => JSON.parse(line) as LedgerEntry);
}

/**
 * Append a sealed entry to the append-only ledger under an exclusive lock.
 *
 * Each entry chains to the previous via `prevHash`. When a key is supplied
 * (arg or $NSB_LEDGER_KEY) the digest is a keyed HMAC and `signed: true` is
 * recorded — the chain is then forgery-resistant. Without a key it is a plain
 * SHA-256 chain (detects naive edits only). `now` is injectable for tests.
 */
export function appendEntry(
  file: string,
  input: LedgerEntryInput,
  now: () => string = () => new Date().toISOString(),
  opts?: LedgerOptions,
): LedgerEntry {
  const key = resolveKey(opts);
  if (!existsSync(dirname(file))) {
    mkdirSync(dirname(file), { recursive: true });
  }
  return withLock(file, () => {
    const entries = readLedger(file);
    const prev = entries[entries.length - 1];
    const prevHash = prev ? prev.hash : GENESIS;
    const base: Omit<LedgerEntry, 'hash' | 'signed'> = {
      ...input,
      seq: entries.length,
      timestamp: now(),
      prevHash,
    };
    const entry: LedgerEntry = {
      ...base,
      hash: digest(material(base), key),
      ...(key ? { signed: true } : {}),
    };
    appendFileSync(file, `${JSON.stringify(entry)}\n`, 'utf-8');
    return entry;
  });
}

/**
 * Verify the seq/prevHash/digest chain. Signed entries require the key to
 * verify; absent the key they are reported as unverifiable (not silently OK).
 */
export function verifyLedger(file: string, opts?: LedgerOptions): LedgerVerification {
  const key = resolveKey(opts);
  const entries = readLedger(file);
  let prevHash = GENESIS;
  for (let i = 0; i < entries.length; i += 1) {
    const entry = entries[i];
    if (entry.seq !== i) {
      return { valid: false, entries: entries.length, brokenAt: i, reason: 'seq mismatch' };
    }
    if (entry.prevHash !== prevHash) {
      return { valid: false, entries: entries.length, brokenAt: i, reason: 'prevHash mismatch' };
    }
    if (entry.signed && !key) {
      return {
        valid: false,
        entries: entries.length,
        brokenAt: i,
        reason: 'signed entry requires NSB_LEDGER_KEY to verify',
      };
    }
    const { hash, signed, ...rest } = entry;
    if (hash !== digest(material(rest), signed ? key : undefined)) {
      return {
        valid: false,
        entries: entries.length,
        brokenAt: i,
        reason: signed ? 'hmac mismatch' : 'hash mismatch',
      };
    }
    prevHash = entry.hash;
  }
  return { valid: true, entries: entries.length };
}

/** Sum cost/tokens across entries, optionally filtered to a single run. */
export function summarizeSpend(file: string, runId?: string, sinceSeq?: number): SpendSummary {
  return readLedger(file)
    .filter((entry) => runId == null || entry.runId === runId)
    .filter((entry) => sinceSeq == null || entry.seq > sinceSeq)
    .reduce<SpendSummary>(
      (acc, entry) => ({
        totalUsd: acc.totalUsd + (entry.costUsd ?? 0),
        totalTokens: acc.totalTokens + (entry.tokens ?? 0),
        count: acc.count + 1,
      }),
      { totalUsd: 0, totalTokens: 0, count: 0 },
    );
}

const CSV_FIELDS = [
  'seq',
  'timestamp',
  'kind',
  'actor',
  'model',
  'runId',
  'costUsd',
  'tokens',
  'signed',
  'summary',
  'hash',
] as const;

/** Filter entries by kind and/or ISO timestamp lower bound (inclusive). Pure. */
export function filterEntries(
  entries: LedgerEntry[],
  opts: { kind?: LedgerKind; since?: string } = {},
): LedgerEntry[] {
  return entries.filter(
    (e) => (!opts.kind || e.kind === opts.kind) && (!opts.since || e.timestamp >= opts.since),
  );
}

/** Serialize entries to CSV for SIEM / audit export. Pure. */
export function toCsv(entries: LedgerEntry[]): string {
  const esc = (value: unknown) => {
    let s = value == null ? '' : String(value);
    // Neutralize spreadsheet formula injection: a cell starting with = + - @ (or
    // tab/CR) executes when the CSV is opened in Excel/Sheets. Prefix with a quote.
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows = entries.map((entry) => {
    const rec = entry as unknown as Record<string, unknown>;
    return CSV_FIELDS.map((f) => esc(rec[f])).join(',');
  });
  return `${[CSV_FIELDS.join(','), ...rows].join('\n')}\n`;
}
