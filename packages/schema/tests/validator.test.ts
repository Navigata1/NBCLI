import { describe, expect, it } from 'vitest';
import { validateGovernanceConfig } from '../src/validator';

const validConfig = {
  version: '1.0',
  governance: { profile: 'starter' },
  confidence: {
    factors: {
      clarity: { weight: 0.5 },
      certainty: { weight: 0.5 },
    },
    thresholds: { high: 0.8, medium: 0.5, low: 0.3, uncertain: 0 },
  },
};

describe('validateGovernanceConfig', () => {
  it('accepts a valid config', () => {
    const result = validateGovernanceConfig(validConfig);
    expect(result.valid).toBe(true);
  });
});
