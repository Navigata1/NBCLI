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
  payload?: unknown;
}

/** A sealed, hash-chained ledger entry. */
export interface LedgerEntry extends LedgerEntryInput {
  seq: number;
  /** ISO-8601 timestamp. */
  timestamp: string;
  /** Hash of the previous entry ('GENESIS' for the first). */
  prevHash: string;
  /** sha256 over the canonical entry material (see ledger.ts). */
  hash: string;
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
