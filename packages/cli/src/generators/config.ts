import { stringify } from 'yaml';
import type { GovernanceConfig } from '@nsb/core';
import { getProfile } from './profiles';

/**
 * Load a built-in governance profile. Profiles are embedded typed constants
 * (see profiles.ts), so this works in every distribution form without
 * filesystem access.
 */
export const loadProfileConfig = (profile: string): GovernanceConfig => getProfile(profile);

export const serializeConfig = (config: GovernanceConfig) => stringify(config);
