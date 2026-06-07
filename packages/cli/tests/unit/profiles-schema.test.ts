import { describe, expect, it } from 'vitest';
import { validateGovernanceConfig, formatAjvErrors } from '@nsb/schema';
import { PROFILES } from '../../src/generators/profiles';

// Locks the embedded-profiles <-> schema single-source contract: a typo'd or
// schema-unknown key added to a profile must fail here, not at a user's `nsb validate`.
describe('embedded profiles conform to the governance schema', () => {
  for (const name of Object.keys(PROFILES) as Array<keyof typeof PROFILES>) {
    it(`${name} profile validates against mbf-governance.schema.json`, () => {
      const result = validateGovernanceConfig(PROFILES[name]);
      if (!result.valid) {
        throw new Error(`${name} invalid: ${formatAjvErrors(result.errors).join('; ')}`);
      }
      expect(result.valid).toBe(true);
    });
  }
});
