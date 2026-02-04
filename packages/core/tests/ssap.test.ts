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
});
