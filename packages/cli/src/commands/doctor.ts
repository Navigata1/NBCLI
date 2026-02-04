import { Command } from 'commander';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { parse } from 'yaml';
import { validateAnchorCollection, validateGovernanceConfig, formatAjvErrors } from '@nsb/schema';
import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { log } from '../utils/logger';

const checkNode = () => {
  const [major] = process.versions.node.split('.').map(Number);
  if (major < 22) {
    log.warn(`Node ${process.versions.node} detected. Recommend Node 22+.`);
  } else {
    log.info(`Node ${process.versions.node} ok.`);
  }
};

const checkPnpm = () => {
  try {
    const pnpm = execSync('pnpm -v', { encoding: 'utf-8' }).trim();
    log.info(`pnpm ${pnpm} detected.`);
  } catch {
    log.warn('pnpm not found. Install pnpm 10+ for best results.');
  }
};

export const doctorCommand = new Command('doctor')
  .description('Run environment and configuration diagnostics')
  .action(() => {
    checkNode();
    checkPnpm();

    const root = process.cwd();
    const configPath = path.resolve(root, '.mbf', 'mbf-governance.yaml');
    const anchorsPath = path.resolve(root, '.mbf', 'anchors.yaml');

    if (!existsSync(configPath)) {
      log.warn('Missing .mbf/mbf-governance.yaml. Run `nsb init` first.');
      return;
    }

    if (!existsSync(anchorsPath)) {
      log.warn('Missing .mbf/anchors.yaml. Run `nsb init` first.');
      return;
    }

    const config = parse(readFileSync(configPath, 'utf-8')) as GovernanceConfig;
    const anchors = parse(readFileSync(anchorsPath, 'utf-8')) as AnchorCollection;

    const configResult = validateGovernanceConfig(config);
    const anchorResult = validateAnchorCollection(anchors);

    if (!configResult.valid) {
      log.error('Governance config validation failed:');
      formatAjvErrors(configResult.errors).forEach((line) => log.error(`- ${line}`));
    } else {
      log.info('Governance config valid.');
    }

    if (!anchorResult.valid) {
      log.error('Anchors validation failed:');
      formatAjvErrors(anchorResult.errors).forEach((line) => log.error(`- ${line}`));
    } else {
      log.info('Anchors valid.');
    }

    const tools = config.tools?.enabled ?? [];
    if (tools.includes('claude') && !existsSync(path.resolve(root, 'CLAUDE.md'))) {
      log.warn('Missing CLAUDE.md for Claude Code.');
    }
    if (tools.includes('cursor') && !existsSync(path.resolve(root, '.cursor', 'rules', 'mbf.mdc'))) {
      log.warn('Missing .cursor/rules/mbf.mdc for Cursor.');
    }
    if (tools.includes('codex') && !existsSync(path.resolve(root, 'AGENTS.md'))) {
      log.warn('Missing AGENTS.md for Codex.');
    }

    log.success('Doctor check complete.');
  });
