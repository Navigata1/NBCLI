import { describe, expect, it } from 'vitest';
import { generateClaudeMd } from '../../src/generators/claude-md';
import type { AnchorCollection, GovernanceConfig } from '@nsb/core';

const config: GovernanceConfig = {
  version: '1.0',
  governance: { profile: 'starter' },
  confidence: {
    factors: {
      clarity: { weight: 0.5, description: 'Clarity' },
      certainty: { weight: 0.5, description: 'Certainty' },
    },
    thresholds: { high: 0.8, medium: 0.5, low: 0.3, uncertain: 0 },
  },
};

const anchors: AnchorCollection = {
  security: [
    {
      id: 'auth',
      patterns: ['/auth/'],
      adjustment: -0.3,
      reason: 'Auth',
      target: 'path',
    },
  ],
};

describe('generateClaudeMd', () => {
  it('includes confidence thresholds and anchors', () => {
    const output = generateClaudeMd(config, anchors);
    expect(output).toContain('Thresholds');
    expect(output).toContain('Anchors loaded');
  });
});
