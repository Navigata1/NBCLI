import { describe, expect, it } from 'vitest';
import { validateEgressUrl } from '../src/sinks';

describe('validateEgressUrl (SSRF egress guard)', () => {
  it('allows public https', () => {
    expect(validateEgressUrl('https://hooks.example.com/ingest').ok).toBe(true);
  });

  it('blocks plaintext http by default, allows with allowInsecure', () => {
    expect(validateEgressUrl('http://example.com').ok).toBe(false);
    expect(validateEgressUrl('http://example.com', { allowInsecure: true }).ok).toBe(true);
  });

  it('blocks loopback / private / link-local / metadata / internal hosts', () => {
    for (const u of [
      'https://localhost/x',
      'https://127.0.0.1/x',
      'https://10.0.0.5/x',
      'https://192.168.1.1/x',
      'https://172.16.0.1/x',
      'https://169.254.169.254/latest/meta-data', // cloud metadata
      'https://[::1]/x',
      'https://svc.internal/x',
      'https://db.local/x',
    ]) {
      expect(validateEgressUrl(u).ok, u).toBe(false);
    }
  });

  it('blocks IPv4-mapped IPv6 literals (SSRF bypass regression) + CGNAT + link-local range', () => {
    for (const u of [
      'https://[::ffff:127.0.0.1]/', // mapped loopback
      'https://[::ffff:7f00:1]/', // hex form of mapped loopback
      'https://[::ffff:169.254.169.254]/latest/meta-data/', // mapped cloud metadata
      'https://[::ffff:10.0.0.1]/',
      'https://[::ffff:192.168.0.1]/',
      'https://[0:0:0:0:0:ffff:127.0.0.1]/', // expanded mapped loopback
      'https://100.64.0.1/', // CGNAT
      'https://100.127.255.255/',
      'https://[febf::1]/', // link-local upper end of fe80::/10
    ]) {
      expect(validateEgressUrl(u).ok, u).toBe(false);
    }
  });

  it('still allows a genuine public IPv4-mapped target (no false block)', () => {
    expect(validateEgressUrl('https://[::ffff:8.8.8.8]/').ok).toBe(true);
  });

  it('blocks non-http(s) schemes and malformed URLs', () => {
    expect(validateEgressUrl('file:///etc/passwd').ok).toBe(false);
    expect(validateEgressUrl('gopher://x/').ok).toBe(false);
    expect(validateEgressUrl('not a url').ok).toBe(false);
  });

  it('enforces an allowlist when set (host + subdomains)', () => {
    expect(validateEgressUrl('https://evil.com/x', { allowlist: ['example.com'] }).ok).toBe(false);
    expect(validateEgressUrl('https://api.example.com/x', { allowlist: ['example.com'] }).ok).toBe(true);
    expect(validateEgressUrl('https://example.com/x', { allowlist: ['example.com'] }).ok).toBe(true);
  });
});
