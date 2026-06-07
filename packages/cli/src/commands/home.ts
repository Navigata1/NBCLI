import { Command } from 'commander';
import path from 'path';
import { existsSync, readFileSync } from 'fs';
import { parse } from 'yaml';
import type { GovernanceConfig } from '@nsb/core';
import { HOOK_PROFILE_BY_GOVERNANCE } from '@nsb/core';
import { printHome, type HomeStatus } from '../utils/banner';
import { NBCLI_VERSION } from '../version';

const mcpWired = (root: string): boolean =>
  ['.mcp.json', path.join('.cursor', 'mcp.json'), path.join('.vscode', 'mcp.json')].some((rel) =>
    existsSync(path.resolve(root, rel)),
  );

export function readHomeStatus(root: string): HomeStatus {
  const configPath = path.resolve(root, '.mbf', 'mbf-governance.yaml');
  if (!existsSync(configPath)) {
    return { version: NBCLI_VERSION, initialized: false, mcp: mcpWired(root) };
  }
  try {
    const config = parse(readFileSync(configPath, 'utf-8')) as GovernanceConfig;
    const profile = config.governance?.profile;
    const hookProfile =
      config.hooks?.profile ?? (profile ? HOOK_PROFILE_BY_GOVERNANCE[profile] : undefined);
    return {
      version: NBCLI_VERSION,
      initialized: true,
      profile,
      hookProfile,
      tools: config.tools?.enabled,
      mcp: mcpWired(root),
    };
  } catch {
    return { version: NBCLI_VERSION, initialized: true, mcp: mcpWired(root) };
  }
}

export const runHome = async (): Promise<void> => {
  await printHome(readHomeStatus(process.cwd()));
};

export const homeCommand = new Command('home')
  .description('Show the NorthStar Bootstrap CLI home screen')
  .action(runHome);
