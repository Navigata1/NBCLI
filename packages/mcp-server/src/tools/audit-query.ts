import type { LedgerKind } from '@nsb/core';
import { filterEntries, readLedger, summarizeSpend } from '@nsb/core';

export interface AuditQueryInput {
  ledgerFile: string;
  kind?: LedgerKind;
  since?: string;
}

/** Query the tamper-evident run ledger (filtered) + a spend summary — for audit agents. */
export const auditQuery = ({ ledgerFile, kind, since }: AuditQueryInput) => {
  const entries = filterEntries(readLedger(ledgerFile), { kind, since });
  const byKind = entries.reduce<Record<string, number>>((acc, e) => {
    acc[e.kind] = (acc[e.kind] ?? 0) + 1;
    return acc;
  }, {});
  return { count: entries.length, byKind, spend: summarizeSpend(ledgerFile), entries };
};
