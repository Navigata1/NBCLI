import {
  createPrivateKey,
  createPublicKey,
  generateKeyPairSync,
  sign as cryptoSign,
  verify as cryptoVerify,
} from 'crypto';

export interface Keypair {
  publicKeyPem: string;
  privateKeyPem: string;
}

/**
 * Ed25519 detached signing for supply-chain trust (SBOM / audit exports / any
 * artifact). Uses Node's built-in crypto — fully offline, no external `minisign`
 * binary and no network. NOTE: signatures are base64 detached blobs, NOT the
 * minisign on-disk format (interop is via NBCLI's own `nsb verify`).
 */
export function generateKeypair(): Keypair {
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');
  return {
    publicKeyPem: publicKey.export({ type: 'spki', format: 'pem' }).toString(),
    privateKeyPem: privateKey.export({ type: 'pkcs8', format: 'pem' }).toString(),
  };
}

/** Sign content with an Ed25519 PKCS#8 PEM private key → base64 detached signature. */
export function signContent(content: string, privateKeyPem: string): string {
  const key = createPrivateKey(privateKeyPem);
  return cryptoSign(null, Buffer.from(content, 'utf-8'), key).toString('base64');
}

/** Verify a base64 detached signature against content + an SPKI PEM public key. */
export function verifyContent(content: string, signatureB64: string, publicKeyPem: string): boolean {
  try {
    const key = createPublicKey(publicKeyPem);
    return cryptoVerify(null, Buffer.from(content, 'utf-8'), key, Buffer.from(signatureB64, 'base64'));
  } catch {
    return false;
  }
}
