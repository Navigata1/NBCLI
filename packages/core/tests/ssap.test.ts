import { describe, expect, it } from 'vitest';
import { calculateConfidence } from '../src/ssap/calculator';
import type { ConfidenceConfig } from '../src/types/config';
import type { AnchorMatch } from '../src/types/assessment';

const config: ConfidenceConfig = {
  factors: {
    clarity: { weight: 0.5 },
    certainty: { weight: 0.5 },
  },
  thresholds: {
    high: 0.8,
    medium: 0.5,
    low: 0.3,
    uncertain: 0,
  },
};

describe('calculateConfidence', () => {
  it('computes weighted base and applies anchors', () => {
    const anchors: AnchorMatch[] = [
      {
        id: 'auth_path',
        reason: 'Security path',
        adjustment: -0.2,
        pattern: '/auth/',
        target: 'path',
      },
    ];

    const result = calculateConfidence({ clarity: 5, certainty: 4 }, config, anchors);
    expect(result.baseScore).toBeGreaterThan(0.8);
    expect(result.finalScore).toBeLessThan(result.baseScore);
    expect(result.level).toBe('medium');
  });

  it('all factors score 1 (minimum) yields base score of 0', () => {
    const result = calculateConfidence({ clarity: 1, certainty: 1 }, config);
    expect(result.baseScore).toBe(0);
    expect(result.finalScore).toBe(0);
    expect(result.level).toBe('uncertain');
  });

  it('all factors score 5 (maximum) yields base score of 1', () => {
    const result = calculateConfidence({ clarity: 5, certainty: 5 }, config);
    expect(result.baseScore).toBe(1);
    expect(result.finalScore).toBe(1);
    expect(result.level).toBe('high');
  });

  it('missing factor scores default to 3', () => {
    const result = calculateConfidence({}, config);
    expect(result.baseScore).toBe(0.5);
    expect(result.factors.every((f) => f.score === 3)).toBe(true);
    expect(result.factors.every((f) => f.reason === 'Defaulted to 3/5.')).toBe(true);
  });

  it('weights that do not sum to 1 still work correctly', () => {
    const unevenConfig: ConfidenceConfig = {
      factors: {
        clarity: { weight: 0.3 },
        certainty: { weight: 0.2 },
      },
      thresholds: config.thresholds,
    };
    const result = calculateConfidence({ clarity: 5, certainty: 5 }, unevenConfig);
    expect(result.baseScore).toBe(1);
  });

  it('empty factors object yields base score of 0', () => {
    const emptyConfig: ConfidenceConfig = {
      factors: {},
      thresholds: config.thresholds,
    };
    const result = calculateConfidence({ clarity: 5 }, emptyConfig);
    expect(result.baseScore).toBe(0);
    expect(result.factors).toHaveLength(0);
  });

  it('negative anchor adjustments reduce final score', () => {
    const anchors: AnchorMatch[] = [
      { id: 'neg', reason: 'Negative', adjustment: -0.3, pattern: 'x', target: 'path' },
    ];
    const result = calculateConfidence({ clarity: 5, certainty: 5 }, config, anchors);
    expect(result.baseScore).toBe(1);
    expect(result.finalScore).toBe(0.7);
  });

  it('adjustments that would go below 0 are clamped to 0', () => {
    const anchors: AnchorMatch[] = [
      { id: 'big_neg', reason: 'Big negative', adjustment: -2, pattern: 'x', target: 'path' },
    ];
    const result = calculateConfidence({ clarity: 3, certainty: 3 }, config, anchors);
    expect(result.finalScore).toBe(0);
  });

  it('adjustments that would go above 1 are clamped to 1', () => {
    const anchors: AnchorMatch[] = [
      { id: 'big_pos', reason: 'Big positive', adjustment: 2, pattern: 'x', target: 'path' },
    ];
    const result = calculateConfidence({ clarity: 3, certainty: 3 }, config, anchors);
    expect(result.finalScore).toBe(1);
  });
});
