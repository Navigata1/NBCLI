import { describe, expect, it } from 'vitest';
import type { GovernanceConfig } from '@nsb/core';
import { HOOK_PROFILE_BY_GOVERNANCE } from '@nsb/core';
import { describeHookProfile } from '../../src/utils/format';
import { resolveHookProfile } from '../../src/generators/instruction-base';
import { generateClaudeMd } from '../../src/generators/claude-md';

const baseConfig = (overrides: Partial<GovernanceConfig> = {}): GovernanceConfig => ({
  version: '1.0',
  governance: { profile: 'enterprise' },
  confidence: { factors: { clarity: { weight: 1 } }, thresholds: { high: 0.8, medium: 0.5, low: 0.3, uncertain: 0 } },
  ...overrides,
});

describe('hook profiles', () => {
  it('strict includes the run-ledger rule; minimal does not', () => {
    expect(describeHookProfile('strict').join(' ')).toContain('run ledger');
    expect(describeHookProfile('minimal').join(' ')).not.toContain('run ledger');
  });

  it('maps governance profile -> default hook profile', () => {
    expect(HOOK_PROFILE_BY_GOVERNANCE.starter).toBe('minimal');
    expect(HOOK_PROFILE_BY_GOVERNANCE.professional).toBe('standard');
    expect(HOOK_PROFILE_BY_GOVERNANCE.enterprise).toBe('strict');
  });

  it('resolveHookProfile falls back via governance when hooks block is absent', () => {
    expect(resolveHookProfile(baseConfig())).toBe('strict');
  });

  it('resolveHookProfile honours an explicit hooks.profile', () => {
    expect(resolveHookProfile(baseConfig({ hooks: { profile: 'minimal' } }))).toBe('minimal');
  });

  it('renders the resolved profile rules into a generated instruction file', () => {
    const md = generateClaudeMd(baseConfig(), {});
    expect(md).toContain('Hook profile: strict');
    expect(md).toContain('run ledger');
  });
});
