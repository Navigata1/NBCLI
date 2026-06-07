import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import type { GovernanceConfig } from '@nsb/core';
import { checkGeneratedFiles, generateToolFiles } from '../../src/utils/generate';

const config = (desc: string): GovernanceConfig => ({
  version: '1.0',
  governance: { profile: 'professional' },
  confidence: {
    factors: { c: { weight: 1, description: desc } },
    thresholds: { high: 0.8, medium: 0.5, low: 0.3, uncertain: 0 },
  },
});

describe('content-hash check (anchored stamp extraction)', () => {
  let root: string;
  beforeEach(() => {
    root = mkdtempSync(path.join(tmpdir(), 'nbcli-ch-'));
  });
  afterEach(() => rmSync(root, { recursive: true, force: true }));

  it('passes for freshly generated files', () => {
    const c = config('a factor');
    generateToolFiles(root, c, {}, ['claude'], true);
    expect(checkGeneratedFiles(root, c, {}, ['claude']).ok).toBe(true);
  });

  it('does NOT false-positive when the body legitimately contains a sha256: token', () => {
    const c = config(`pin to sha256:${'a'.repeat(64)}`);
    generateToolFiles(root, c, {}, ['claude'], true);
    expect(checkGeneratedFiles(root, c, {}, ['claude']).ok).toBe(true);
  });

  it('detects a hand-edit', () => {
    const c = config('a factor');
    generateToolFiles(root, c, {}, ['claude'], true);
    // simulate a hand-edit by regenerating with a different config but not re-checking against it
    const r = checkGeneratedFiles(root, config('DIFFERENT'), {}, ['claude']);
    expect(r.ok).toBe(false);
    expect(r.issues.join(' ')).toContain('out of sync');
  });
});
