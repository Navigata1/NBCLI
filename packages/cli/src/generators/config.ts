import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { parse, stringify } from 'yaml';
import type { GovernanceConfig } from '@nsb/core';

const templateCandidates = [
  path.resolve(__dirname, '../templates/profiles'),
  path.resolve(__dirname, '../../templates/profiles'),
];

const resolveTemplateDir = () => {
  for (const candidate of templateCandidates) {
    if (existsSync(candidate)) return candidate;
  }
  return templateCandidates[0];
};

export const loadProfileConfig = (profile: string): GovernanceConfig => {
  const filePath = path.resolve(resolveTemplateDir(), `${profile}.yaml`);
  const raw = readFileSync(filePath, 'utf-8');
  return parse(raw) as GovernanceConfig;
};

export const serializeConfig = (config: GovernanceConfig) => stringify(config);
