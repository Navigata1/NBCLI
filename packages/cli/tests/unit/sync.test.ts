import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { createHash } from 'crypto';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { checkVendor } from '../../src/commands/sync';
import { NBB_PINNED_SHA } from '../../src/nbb';

const sha256 = (s: string) => createHash('sha256').update(Buffer.from(s, 'utf-8')).digest('hex');

describe('checkVendor (NBB drift guard)', () => {
  let root: string;
  let vdir: string;
  const writeManifest = (files: { path: string; sha256: string }[], pinned = NBB_PINNED_SHA) =>
    writeFileSync(path.join(vdir, 'MANIFEST.json'), JSON.stringify({ repo: 'r', pinned_sha: pinned, files }, null, 2));

  beforeEach(() => {
    root = mkdtempSync(path.join(tmpdir(), 'nbcli-sync-'));
    vdir = path.join(root, 'vendor', 'nbb');
    mkdirSync(vdir, { recursive: true });
    writeFileSync(path.join(vdir, 'HARD_STOPS.md'), 'doctrine\n');
  });
  afterEach(() => rmSync(root, { recursive: true, force: true }));

  it('passes when files match the manifest + pinned SHA', () => {
    writeManifest([{ path: 'HARD_STOPS.md', sha256: sha256('doctrine\n') }]);
    expect(checkVendor(root)).toMatchObject({ ok: true, fileCount: 1 });
  });

  it('fails on content drift (hash mismatch)', () => {
    writeManifest([{ path: 'HARD_STOPS.md', sha256: sha256('doctrine\n') }]);
    writeFileSync(path.join(vdir, 'HARD_STOPS.md'), 'TAMPERED\n');
    const r = checkVendor(root);
    expect(r.ok).toBe(false);
    expect(r.issues.join(' ')).toContain('hash drift');
  });

  it('fails on a pinned-SHA mismatch vs the code constant', () => {
    writeManifest([{ path: 'HARD_STOPS.md', sha256: sha256('doctrine\n') }], 'deadbeef');
    expect(checkVendor(root).issues.join(' ')).toContain('pinned_sha drift');
  });

  it('fails on a missing manifest file and on an untracked vendored file', () => {
    writeManifest([{ path: 'HARD_STOPS.md', sha256: sha256('doctrine\n') }]);
    writeFileSync(path.join(vdir, 'SNEAKED.md'), 'extra\n');
    expect(checkVendor(root).issues.join(' ')).toContain('untracked vendored file: SNEAKED.md');
  });

  it('fails cleanly when MANIFEST.json is absent', () => {
    expect(checkVendor(root)).toMatchObject({ ok: false });
  });
});
