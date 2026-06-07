import { describe, expect, it } from 'vitest';
import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { buildInstructionBody } from '../../src/generators/instruction-base';

const config: GovernanceConfig = {
  version: '1.0',
  governance: { profile: 'professional' },
  confidence: { factors: { c: { weight: 1 } }, thresholds: { high: 0.8, medium: 0.5, low: 0.3, uncertain: 0 } },
};

describe('NBB doctrine in the generated instruction body (G3)', () => {
  const body = buildInstructionBody(config, {} as AnchorCollection);

  it('carries the NBB safety floor', () => {
    for (const marker of [
      'HARD STOPS',
      'Blast-radius tiers',
      'Autonomy caps',
      'op run',
      'Prompt-injection',
      'Load discipline (tokenomics)',
      'vendor/nbb',
    ]) {
      expect(body).toContain(marker);
    }
  });
});
