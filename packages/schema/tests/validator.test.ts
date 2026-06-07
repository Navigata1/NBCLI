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

describe('validateGovernanceConfig — v2.5 blocks (hooks/budgets/permissions/routing)', () => {
  const withBlocks = {
    ...validConfig,
    hooks: { profile: 'strict' },
    budgets: {
      per_run_usd: 5,
      per_project_usd: 50,
      per_project_tokens: 2000000,
      warn_at: 0.8,
      currency: 'USD',
    },
    permissions: { allow: ['read'], deny: ['curl | sh'], destructive_gates: ['rm -rf'] },
    routing: {
      orchestrator: 'claude-opus-4-8',
      subtask: 'claude-sonnet-4-6',
      cheap: 'claude-haiku-4-5',
      fast: false,
      effort: 'xhigh',
    },
  };

  it('accepts all new blocks', () => {
    expect(validateGovernanceConfig(withBlocks).valid).toBe(true);
  });

  it('rejects hooks.profile not in enum', () => {
    expect(validateGovernanceConfig({ ...validConfig, hooks: { profile: 'bogus' } }).valid).toBe(false);
  });

  it('rejects budgets.warn_at > 1', () => {
    expect(validateGovernanceConfig({ ...validConfig, budgets: { warn_at: 2 } }).valid).toBe(false);
  });

  it('rejects an unknown routing key (additionalProperties:false)', () => {
    expect(validateGovernanceConfig({ ...validConfig, routing: { bogusKey: 'x' } }).valid).toBe(false);
  });

  it('rejects a typo top-level key (budget vs budgets)', () => {
    expect(validateGovernanceConfig({ ...validConfig, budget: {} }).valid).toBe(false);
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
