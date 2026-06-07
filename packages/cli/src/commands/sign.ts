import { Command } from 'commander';
import path from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { generateKeypair, signContent, verifyContent } from '@nsb/core';
import { log } from '../utils/logger';
import { printMini } from '../utils/banner';

/**
 * `nsb sign` — Ed25519 detached signing of artifacts (SBOM, audit exports, any
 * file), fully offline via Node crypto. Pair with `nsb verify`.
 */
export const signCommand = new Command('sign').description(
  'Ed25519 detached signing of artifacts (offline): keygen | file',
);

signCommand
  .command('keygen')
  .description('generate an Ed25519 keypair (nsb-signing.pub + nsb-signing.key)')
  .option('--dir <dir>', 'output directory', '.')
  .action((options) => {
    printMini();
    const root = process.cwd();
    const dir = path.resolve(root, options.dir);
    const { publicKeyPem, privateKeyPem } = generateKeypair();
    const keyPath = path.join(dir, 'nsb-signing.key');
    const pubPath = path.join(dir, 'nsb-signing.pub');
    writeFileSync(keyPath, privateKeyPem, { mode: 0o600 });
    writeFileSync(pubPath, publicKeyPem);
    log.success(`Wrote ${path.relative(root, pubPath)} (public) + ${path.relative(root, keyPath)} (PRIVATE).`);
    log.warn('Never commit nsb-signing.key — use op:// or a secret manager for CI signing.');
  });

signCommand
  .command('file <target>')
  .description('sign a file → <target>.sig')
  .requiredOption('--key <key>', 'Ed25519 private key (PKCS#8 PEM)')
  .action((target: string, options) => {
    printMini();
    const root = process.cwd();
    const file = path.resolve(root, target);
    const keyPath = path.resolve(root, options.key);
    if (!existsSync(file)) {
      log.error(`No file: ${target}`);
      process.exitCode = 1;
      return;
    }
    if (!existsSync(keyPath)) {
      log.error(`No key: ${options.key}`);
      process.exitCode = 1;
      return;
    }
    const sig = signContent(readFileSync(file, 'utf-8'), readFileSync(keyPath, 'utf-8'));
    writeFileSync(`${file}.sig`, `${sig}\n`);
    log.success(`Signed → ${target}.sig`);
  });

export const verifyCommand = new Command('verify')
  .description('Verify an Ed25519 detached signature (exit 1 on mismatch)')
  .argument('<target>', 'file to verify')
  .requiredOption('--pub <pub>', 'Ed25519 public key (SPKI PEM)')
  .option('--sig <sig>', 'signature file (default <target>.sig)')
  .action((target: string, options) => {
    printMini();
    const root = process.cwd();
    const file = path.resolve(root, target);
    const sigPath = path.resolve(root, options.sig ?? `${target}.sig`);
    const pubPath = path.resolve(root, options.pub);
    for (const [label, p] of [
      ['file', file],
      ['signature', sigPath],
      ['public key', pubPath],
    ] as const) {
      if (!existsSync(p)) {
        log.error(`No ${label}: ${path.relative(root, p)}`);
        process.exitCode = 1;
        return;
      }
    }
    const ok = verifyContent(
      readFileSync(file, 'utf-8'),
      readFileSync(sigPath, 'utf-8').trim(),
      readFileSync(pubPath, 'utf-8'),
    );
    if (ok) {
      log.success(`Signature valid: ${target}`);
    } else {
      log.error(`Signature INVALID: ${target}`);
      process.exitCode = 1;
    }
  });
