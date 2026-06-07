import { Command } from 'commander';
import os from 'os';
import path from 'path';
import { createHash } from 'crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'fs';
import { execFileSync } from 'child_process';
import { NBB_PINNED_SHA, NBB_REPO, NBB_VENDOR_DIR } from '../nbb';
import { log } from '../utils/logger';
import { printMini } from '../utils/banner';

interface ManifestEntry {
  path: string;
  sha256: string;
}
interface Manifest {
  repo: string;
  pinned_sha: string;
  note?: string;
  files: ManifestEntry[];
}

const vendorDir = (root: string) => path.resolve(root, NBB_VENDOR_DIR);
const sha256 = (file: string) => createHash('sha256').update(readFileSync(file)).digest('hex');

function listFiles(dir: string, base = dir): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const abs = path.join(dir, name);
    if (statSync(abs).isDirectory()) out.push(...listFiles(abs, base));
    else out.push(path.relative(base, abs).split(path.sep).join('/'));
  }
  return out;
}

/** Offline drift check: vendor/nbb matches its MANIFEST and the pinned SHA. */
export function checkVendor(root: string): { ok: boolean; issues: string[]; fileCount: number } {
  const dir = vendorDir(root);
  const manifestPath = path.join(dir, 'MANIFEST.json');
  const issues: string[] = [];
  if (!existsSync(manifestPath)) return { ok: false, issues: ['vendor/nbb/MANIFEST.json missing'], fileCount: 0 };

  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')) as Manifest;
  if (manifest.pinned_sha !== NBB_PINNED_SHA) {
    issues.push(`pinned_sha drift: manifest ${manifest.pinned_sha.slice(0, 7)} != code ${NBB_PINNED_SHA.slice(0, 7)}`);
  }
  for (const entry of manifest.files) {
    const p = path.join(dir, entry.path);
    if (!existsSync(p)) {
      issues.push(`missing vendored file: ${entry.path}`);
      continue;
    }
    if (sha256(p) !== entry.sha256) issues.push(`hash drift: ${entry.path}`);
  }
  // MANIFEST.json + README.md are NBCLI-authored (not from NBB@sha) — exclude from the drift check.
  const local = new Set(['MANIFEST.json', 'README.md']);
  const tracked = new Set(manifest.files.map((f) => f.path));
  for (const f of listFiles(dir)) {
    if (!local.has(f) && !tracked.has(f)) issues.push(`untracked vendored file: ${f}`);
  }
  return { ok: issues.length === 0, issues, fileCount: manifest.files.length };
}

/** Refresh vendor/nbb from NBB@pinned_sha (network + git). Maintainer operation. */
function refresh(root: string): void {
  const dir = vendorDir(root);
  const manifest = JSON.parse(readFileSync(path.join(dir, 'MANIFEST.json'), 'utf-8')) as Manifest;
  const tmp = path.join(os.tmpdir(), `nbb-sync-${process.pid}-${Date.now()}`);
  try {
    execFileSync('git', ['clone', '--quiet', NBB_REPO, tmp], { stdio: 'inherit' });
    execFileSync('git', ['-C', tmp, 'checkout', '--quiet', NBB_PINNED_SHA], { stdio: 'inherit' });
    for (const entry of manifest.files) {
      const src = path.join(tmp, entry.path);
      const dest = path.join(dir, entry.path);
      mkdirSync(path.dirname(dest), { recursive: true });
      copyFileSync(src, dest);
    }
    // Regenerate the manifest hashes from the freshly-copied files.
    const files = manifest.files
      .map((e) => ({ path: e.path, sha256: sha256(path.join(dir, e.path)) }))
      .sort((a, b) => a.path.localeCompare(b.path));
    const next: Manifest = { repo: NBB_REPO, pinned_sha: NBB_PINNED_SHA, note: manifest.note, files };
    writeFileSync(path.join(dir, 'MANIFEST.json'), `${JSON.stringify(next, null, 2)}\n`);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

export const syncCommand = new Command('sync')
  .description('Verify (--check) or refresh the pinned NBB doctrine in vendor/nbb (NBB is the source of truth)')
  .option('--check', 'offline: verify vendor/nbb matches its MANIFEST + the pinned SHA (used by the gate)', false)
  .action((options) => {
    const root = process.cwd();

    if (options.check) {
      const { ok, issues, fileCount } = checkVendor(root);
      if (ok) {
        log.success(`NBB doctrine in sync — pinned ${NBB_PINNED_SHA.slice(0, 7)}, ${fileCount} files verified.`);
        return;
      }
      printMini();
      log.error('NBB doctrine DRIFT (vendor/nbb out of sync with the pin):');
      issues.forEach((i) => console.log(`  - ${i}`));
      log.dim('Run `nsb sync` to refresh from NBB@pinned_sha, or revert local edits to vendor/nbb.');
      process.exitCode = 1;
      return;
    }

    printMini();
    log.info(`Refreshing vendor/nbb from ${NBB_REPO}@${NBB_PINNED_SHA.slice(0, 7)} ...`);
    try {
      refresh(root);
      log.success('vendor/nbb refreshed + MANIFEST regenerated.');
    } catch (err) {
      log.error(`Refresh failed (needs git + network): ${(err as Error).message.split('\n')[0]}`);
      process.exitCode = 1;
    }
  });
