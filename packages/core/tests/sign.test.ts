import { describe, expect, it } from 'vitest';
import { generateKeypair, signContent, verifyContent } from '../src/sign';

describe('Ed25519 detached signing', () => {
  const { publicKeyPem, privateKeyPem } = generateKeypair();

  it('verifies a genuine signature', () => {
    const sig = signContent('hello world', privateKeyPem);
    expect(verifyContent('hello world', sig, publicKeyPem)).toBe(true);
  });

  it('rejects tampered content', () => {
    const sig = signContent('hello world', privateKeyPem);
    expect(verifyContent('hello WORLD', sig, publicKeyPem)).toBe(false);
  });

  it('rejects a signature from a different key', () => {
    const other = generateKeypair();
    const sig = signContent('payload', other.privateKeyPem);
    expect(verifyContent('payload', sig, publicKeyPem)).toBe(false);
  });

  it('returns false (no throw) on a malformed signature or key', () => {
    expect(verifyContent('x', 'not-base64-sig', publicKeyPem)).toBe(false);
    expect(verifyContent('x', 'AAAA', 'not-a-key')).toBe(false);
  });
});
