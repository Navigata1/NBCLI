import { describe, expect, it } from 'vitest';
import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { evaluateSkill } from '../../src/commands/skill';
import { generateSkillMd } from '../../src/generators/skill-md';

const config: GovernanceConfig = {
  version: '1.0',
  governance: { profile: 'professional' },
  confidence: {
    factors: { clarity: { weight: 0.5, description: 'Clarity' } },
    thresholds: { high: 0.8, medium: 0.5, low: 0.3, uncertain: 0 },
  },
  hooks: { profile: 'standard' },
};

const anchors: AnchorCollection = {
  security: [{ id: 'auth', patterns: ['/auth/'], adjustment: -0.3, reason: 'Auth', target: 'path' }],
};

describe('generateSkillMd', () => {
  it('emits valid SKILL.md frontmatter (name + description)', () => {
    const md = generateSkillMd(config, anchors);
    expect(md.startsWith('---\n')).toBe(true);
    expect(md).toMatch(/name:\s*north-star-build/);
    expect(md).toMatch(/description:\s*.+/);
  });
});

describe('evaluateSkill', () => {
  it('scores a generated skill 100/100', () => {
    expect(evaluateSkill(generateSkillMd(config, anchors)).score).toBe(100);
  });

  it('fails a bare document', () => {
    const result = evaluateSkill('# nope');
    expect(result.score).toBeLessThan(100);
    expect(result.checks.find((c) => c.name === 'has frontmatter')?.pass).toBe(false);
  });
});
