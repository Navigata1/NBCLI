import type { WebhookSink } from '../types/config';
import type { LedgerEntry } from '../ledger/types';

const PRIVATE_HOST_RE = /^(localhost|.*\.local|.*\.internal|.*\.localhost)$/i;

/** True for IP literals that must never be an egress target (SSRF guard). */
function isBlockedIpLiteral(host: string): boolean {
  const h = host.replace(/^\[|\]$/g, '').toLowerCase(); // strip ipv6 brackets
  // IPv4-mapped IPv6 (::ffff:a.b.c.d, canonicalized by the URL parser to ::ffff:hhhh:hhhh) — decode the
  // embedded IPv4 and re-check, so a mapped loopback/metadata literal can't slip past the v4 checks.
  const mappedDotted = h.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/);
  if (mappedDotted) return isBlockedIpLiteral(mappedDotted[1]);
  const mappedHex = h.match(/^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/);
  if (mappedHex) {
    const g1 = parseInt(mappedHex[1], 16);
    const g2 = parseInt(mappedHex[2], 16);
    return isBlockedIpLiteral(`${(g1 >> 8) & 255}.${g1 & 255}.${(g2 >> 8) & 255}.${g2 & 255}`);
  }
  if (h === '::1' || h === '::') return true; // ipv6 loopback / unspecified
  if (/^fe[89ab][0-9a-f]:/.test(h)) return true; // ipv6 link-local fe80::/10
  if (/^f[cd][0-9a-f]{2}:/.test(h)) return true; // ipv6 ULA fc00::/7
  const m = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!m) return false;
  const a = Number(m[1]);
  const b = Number(m[2]);
  if (a === 0 || a === 127 || a === 10) return true; // this-host, loopback, private
  if (a === 169 && b === 254) return true; // link-local + cloud metadata (169.254.169.254)
  if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
  if (a === 192 && b === 168) return true; // 192.168.0.0/16
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT 100.64.0.0/10 (RFC 6598)
  return false;
}

export interface EgressCheck {
  ok: boolean;
  reason?: string;
}

/**
 * Validate an egress URL before NBCLI fetches it (the `nsb audit sync` webhook is the only outbound
 * path). Host/scheme SSRF guard: https-only by default, blocks loopback/private/link-local/metadata
 * hosts, optional allowlist. NOTE: this is a host+scheme guard, not DNS-resolution/rebind-proof. Pure.
 */
export function validateEgressUrl(
  raw: string,
  opts: { allowInsecure?: boolean; allowlist?: string[]; allowPrivate?: boolean } = {},
): EgressCheck {
  let url: InstanceType<typeof globalThis.URL>;
  try {
    url = new globalThis.URL(raw);
  } catch {
    return { ok: false, reason: `malformed URL: ${raw}` };
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:')
    return { ok: false, reason: `unsupported scheme "${url.protocol}" (only http/https)` };
  if (url.protocol === 'http:' && !opts.allowInsecure)
    return { ok: false, reason: 'plaintext http blocked; use https (or set the sink allowInsecure)' };
  const host = url.hostname;
  if (!opts.allowPrivate && (PRIVATE_HOST_RE.test(host) || isBlockedIpLiteral(host)))
    return { ok: false, reason: `blocked host "${host}" (loopback/private/link-local/metadata; set the sink allowPrivate for a local sink)` };
  if (opts.allowlist?.length && !opts.allowlist.some((a) => host === a || host.endsWith(`.${a}`)))
    return { ok: false, reason: `host "${host}" not in sinks allowlist` };
  return { ok: true };
}

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
