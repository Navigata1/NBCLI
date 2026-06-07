import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { dirname } from 'path';
import { createHash } from 'crypto';
import type {
  LedgerEntry,
  LedgerEntryInput,
  LedgerVerification,
  SpendSummary,
} from './types';

const GENESIS = 'GENESIS';

/**
 * Deterministic hash material for an entry. Fields are written in a FIXED order
 * (not object key order) so the hash is stable across runtimes and JSON engines.
 * The `hash` field itself is excluded.
 */
function computeHash(entry: Omit<LedgerEntry, 'hash'>): string {
  const material = JSON.stringify([
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
    entry.payload ?? null,
  ]);
  return createHash('sha256').update(material).digest('hex');
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
 * Append a sealed entry to the append-only ledger. Each entry chains to the
 * previous one via `prevHash` (plain SHA-256, no secret key).
 *
 * INTEGRITY MODEL — read carefully:
 * - Detects NAIVE in-place edits of an entry (its hash / the chain stops matching).
 * - NOT forgery-resistant. Anyone who can WRITE the file can recompute the whole
 *   chain from the edited entry forward; there is no HMAC, signature, or external
 *   anchor. Treat this as an integrity log, not a cryptographic audit trail. To
 *   harden: HMAC each hash with a secret the writer does not control, and/or
 *   anchor the head hash to an external witness (git commit / notary).
 * - SINGLE-WRITER. seq/prevHash derive from a prior read, so two processes
 *   appending to the same file concurrently can produce a duplicate seq (which
 *   verifyLedger then reports as a false "seq mismatch"). Serialize writers.
 *
 * `now` is injectable for deterministic tests.
 */
export function appendEntry(
  file: string,
  input: LedgerEntryInput,
  now: () => string = () => new Date().toISOString(),
): LedgerEntry {
  const entries = readLedger(file);
  const prev = entries[entries.length - 1];
  const prevHash = prev ? prev.hash : GENESIS;
  const base: Omit<LedgerEntry, 'hash'> = {
    ...input,
    seq: entries.length,
    timestamp: now(),
    prevHash,
  };
  const entry: LedgerEntry = { ...base, hash: computeHash(base) };

  if (!existsSync(dirname(file))) {
    mkdirSync(dirname(file), { recursive: true });
  }
  appendFileSync(file, `${JSON.stringify(entry)}\n`, 'utf-8');
  return entry;
}

/** Verify the seq/prevHash/hash chain end to end. */
export function verifyLedger(file: string): LedgerVerification {
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
    const { hash, ...rest } = entry;
    if (hash !== computeHash(rest)) {
      return { valid: false, entries: entries.length, brokenAt: i, reason: 'hash mismatch' };
    }
    prevHash = entry.hash;
  }
  return { valid: true, entries: entries.length };
}

/** Sum cost/tokens across all entries. */
export function summarizeSpend(file: string): SpendSummary {
  return readLedger(file).reduce<SpendSummary>(
    (acc, entry) => ({
      totalUsd: acc.totalUsd + (entry.costUsd ?? 0),
      totalTokens: acc.totalTokens + (entry.tokens ?? 0),
      count: acc.count + 1,
    }),
    { totalUsd: 0, totalTokens: 0, count: 0 },
  );
}
