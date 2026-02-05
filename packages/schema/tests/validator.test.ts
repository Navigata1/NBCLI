import { describe, expect, it } from 'vitest';
import { validateGovernanceConfig, validateAnchorCollection } from '../src/validator';

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

const fullConfig = {
  version: '1.0',
  governance: { profile: 'enterprise' },
  confidence: {
    factors: {
      clarity: { weight: 0.3, description: 'Clarity of requirements' },
      certainty: { weight: 0.3, description: 'Certainty of approach' },
      risk: { weight: 0.4, description: 'Risk assessment' },
    },
    thresholds: { high: 0.85, medium: 0.6, low: 0.35, uncertain: 0 },
  },
  autonomy: {
    default_level: 3,
    escalation_paths: [{ condition: 'security', action: 'require_approval' }],
  },
  tools: { enabled: ['claude', 'cursor'] },
};

describe('validateGovernanceConfig', () => {
  it('accepts a valid minimal config', () => {
    const result = validateGovernanceConfig(validConfig);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('accepts a valid full config', () => {
    const result = validateGovernanceConfig(fullConfig);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('rejects missing required field: version', () => {
    const config = { ...validConfig, version: undefined };
    const result = validateGovernanceConfig(config);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.instancePath === '' && e.message?.includes('version'))).toBe(true);
  });

  it('rejects missing required field: governance', () => {
    const config = { ...validConfig, governance: undefined };
    const result = validateGovernanceConfig(config);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.message?.includes('governance'))).toBe(true);
  });

  it('rejects missing required field: confidence', () => {
    const config = { ...validConfig, confidence: undefined };
    const result = validateGovernanceConfig(config);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.message?.includes('confidence'))).toBe(true);
  });

  it('rejects invalid profile value', () => {
    const config = { ...validConfig, governance: { profile: 'invalid' } };
    const result = validateGovernanceConfig(config);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.instancePath === '/governance/profile')).toBe(true);
  });

  it('rejects negative weight', () => {
    const config = {
      ...validConfig,
      confidence: {
        ...validConfig.confidence,
        factors: { clarity: { weight: -0.5 } },
      },
    };
    const result = validateGovernanceConfig(config);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.instancePath?.includes('weight'))).toBe(true);
  });

  it('rejects weight > 1', () => {
    const config = {
      ...validConfig,
      confidence: {
        ...validConfig.confidence,
        factors: { clarity: { weight: 1.5 } },
      },
    };
    const result = validateGovernanceConfig(config);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.instancePath?.includes('weight'))).toBe(true);
  });

  it('rejects invalid threshold values', () => {
    const config = {
      ...validConfig,
      confidence: {
        ...validConfig.confidence,
        thresholds: { high: 2, medium: 0.5, low: 0.3, uncertain: 0 },
      },
    };
    const result = validateGovernanceConfig(config);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.instancePath?.includes('high'))).toBe(true);
  });
});

describe('validateAnchorCollection', () => {
  it('accepts a valid anchor collection', () => {
    const anchors = {
      security: [
        { id: 'auth', patterns: ['/auth/'], adjustment: -0.3, reason: 'Auth path', target: 'path' },
      ],
    };
    const result = validateAnchorCollection(anchors);
    expect(result.valid).toBe(true);
  });

  it('rejects anchor missing id', () => {
    const anchors = {
      security: [{ patterns: ['/auth/'], adjustment: -0.3, reason: 'Auth' }],
    };
    const result = validateAnchorCollection(anchors);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.message?.includes('id'))).toBe(true);
  });

  it('rejects anchor with empty patterns', () => {
    const anchors = {
      security: [{ id: 'test', patterns: [], adjustment: -0.3, reason: 'Test' }],
    };
    const result = validateAnchorCollection(anchors);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.instancePath?.includes('patterns'))).toBe(true);
  });
});
