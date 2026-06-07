import { appendEntry } from '@nsb/core';

export interface LogDecisionResult {
  ok: true;
  receivedAt: string;
  /** True when the decision was appended to the tamper-evident ledger. */
  persisted: boolean;
  seq?: number;
  hash?: string;
  payload?: unknown;
}

function pick(payload: unknown, key: string): string | number | undefined {
  if (payload && typeof payload === 'object' && key in payload) {
    const value = (payload as Record<string, unknown>)[key];
    if (typeof value === 'string' || typeof value === 'number') return value;
  }
  return undefined;
}

/**
 * Record an autonomous decision. When a ledger file is provided (or $NSB_LEDGER
 * is set) the decision is APPENDED to the tamper-evident hash-chained ledger —
 * a real audit trail. Otherwise it echoes the payload (persisted: false) so the
 * caller is never misled into thinking nothing was stored.
 */
export const logDecision = (
  payload: unknown,
  opts: { ledgerFile?: string } = {},
): LogDecisionResult => {
  const ledgerFile = opts.ledgerFile ?? process.env.NSB_LEDGER;
  if (ledgerFile) {
    const entry = appendEntry(ledgerFile, {
      kind: 'decision',
      summary: pick(payload, 'summary') as string | undefined,
      actor: pick(payload, 'actor') as string | undefined,
      model: pick(payload, 'model') as string | undefined,
      costUsd: pick(payload, 'costUsd') as number | undefined,
      tokens: pick(payload, 'tokens') as number | undefined,
      payload,
    });
    return { ok: true, receivedAt: entry.timestamp, persisted: true, seq: entry.seq, hash: entry.hash };
  }
  return { ok: true, receivedAt: new Date().toISOString(), persisted: false, payload };
};
