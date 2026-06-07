import type { WebhookSink } from '../types/config';
import type { LedgerEntry } from '../ledger/types';

/** Drop the freeform `payload` field when redaction is requested (pure, no mutation). */
export function redactEntry(entry: LedgerEntry, redactPayload?: boolean): Record<string, unknown> {
  const record = entry as unknown as Record<string, unknown>;
  if (!redactPayload) return record;
  return Object.fromEntries(Object.entries(record).filter(([key]) => key !== 'payload'));
}

/** Build the JSON body POSTed to a webhook sink (audit export over the wire). Pure. */
export function buildWebhookBody(entries: LedgerEntry[], sink: WebhookSink): string {
  return JSON.stringify({
    source: 'nbcli',
    count: entries.length,
    entries: entries.map((entry) => redactEntry(entry, sink.redactPayload)),
  });
}
