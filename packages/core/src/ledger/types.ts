export type LedgerKind = 'decision' | 'run' | 'spend' | 'note';

/** Caller-supplied fields for a ledger entry. */
export interface LedgerEntryInput {
  kind: LedgerKind;
  /** Who/what produced the entry (agent id, model, or human). */
  actor?: string;
  model?: string;
  /** Version of the gate/policy under which an autonomous action ran. */
  gateVersion?: string;
  summary?: string;
  costUsd?: number;
  tokens?: number;
  /** Groups entries by run so per-run budgets can be evaluated. */
  runId?: string;
  payload?: unknown;
}

/** A sealed, chained ledger entry. */
export interface LedgerEntry extends LedgerEntryInput {
  seq: number;
  /** ISO-8601 timestamp. */
  timestamp: string;
  /** Hash of the previous entry ('GENESIS' for the first). */
  prevHash: string;
  /** sha256, or HMAC-sha256 when keyed (see `signed`). */
  hash: string;
  /** True when `hash` is a keyed HMAC (forgery-resistant) rather than a plain SHA-256. */
  signed?: boolean;
}

export interface LedgerVerification {
  valid: boolean;
  entries: number;
  brokenAt?: number;
  reason?: string;
}

export interface SpendSummary {
  totalUsd: number;
  totalTokens: number;
  count: number;
}

export interface LedgerOptions {
  /** HMAC key. Defaults to process.env.NSB_LEDGER_KEY. When set, entries are signed. */
  key?: string;
}
