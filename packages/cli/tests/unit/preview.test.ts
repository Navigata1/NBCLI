import { describe, expect, it } from 'vitest';
import type { GovernanceConfig } from '@nsb/core';
import { buildReport } from '../../src/utils/preview';

const config: GovernanceConfig = {
  version: '1.0',
  governance: { profile: 'starter' },
  confidence: {
    factors: {},
    thresholds: { high: 0.8, medium: 0.5, low: 0.3, uncertain: 0 },
  },
};

const ROOT = '/tmp/nbcli-preview-does-not-exist';

describe('buildReport verdict', () => {
  it('blocks when no tools are selected', () => {
    const r = buildReport({ root: ROOT, config, tools: [], force: false, planned: [] });
    expect(r.verdict).toBe('blocked');
  });

  it('warns on collisions without --force', () => {
    const r = buildReport({
      root: ROOT,
      config,
      tools: ['claude'],
      force: false,
      planned: [{ path: '/x/CLAUDE.md', bytes: 10, existed: true }],
    });
    expect(r.verdict).toBe('warning');
    expect(r.collisions).toHaveLength(1);
  });

  it('is ready on a clean plan', () => {
    const r = buildReport({
      root: ROOT,
      config,
      tools: ['claude'],
      force: false,
      planned: [{ path: '/x/CLAUDE.md', bytes: 10, existed: false }],
    });
    expect(r.verdict).toBe('ready');
  });
});
