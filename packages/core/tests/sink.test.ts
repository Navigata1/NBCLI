import { describe, expect, it } from 'vitest';
import { buildWebhookBody, redactEntry } from '../src/sinks';
import type { LedgerEntry } from '../src/ledger/types';

const entry = {
  seq: 0,
  timestamp: '2026-06-07T00:00:00.000Z',
  kind: 'decision',
  summary: 's',
  hash: 'h',
  payload: { secret: 'x' },
} as unknown as LedgerEntry;

describe('sinks', () => {
  it('redactEntry keeps fields but drops payload when redactPayload is set', () => {
    expect((redactEntry(entry, false) as Record<string, unknown>).payload).toBeDefined();
    const redacted = redactEntry(entry, true);
    expect(redacted.payload).toBeUndefined();
    expect(redacted.hash).toBe('h');
  });

  it('buildWebhookBody wraps entries with source + count and honors redaction', () => {
    const body = JSON.parse(buildWebhookBody([entry], { url: 'x', redactPayload: true }));
    expect(body.source).toBe('nbcli');
    expect(body.count).toBe(1);
    expect(body.entries[0].payload).toBeUndefined();
  });
});
