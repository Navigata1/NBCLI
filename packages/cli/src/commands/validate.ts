import { Command } from 'commander';
import path from 'path';
import { existsSync, readFileSync } from 'fs';
import { parse } from 'yaml';
import { validateAnchorCollection, validateGovernanceConfig, formatAjvErrors } from '@nsb/schema';
import { log } from '../utils/logger';

export const validateCommand = new Command('validate')
  .description('Validate governance configuration and anchors')
  .action(() => {
    const root = process.cwd();
    const configPath = path.resolve(root, '.mbf', 'mbf-governance.yaml');
    const anchorsPath = path.resolve(root, '.mbf', 'anchors.yaml');

    if (!existsSync(configPath) || !existsSync(anchorsPath)) {
      log.error('Missing .mbf/mbf-governance.yaml or .mbf/anchors.yaml. Run `nsb init` first.');
      process.exitCode = 1;
      return;
    }

    const config = parse(readFileSync(configPath, 'utf-8'));
    const anchors = parse(readFileSync(anchorsPath, 'utf-8'));

    const configResult = validateGovernanceConfig(config);
    const anchorResult = validateAnchorCollection(anchors);

    if (!configResult.valid) {
      log.error('Governance config validation failed:');
      formatAjvErrors(configResult.errors).forEach((line) => log.error(`- ${line}`));
      process.exitCode = 1;
      return;
    }

    if (!anchorResult.valid) {
      log.error('Anchors validation failed:');
      formatAjvErrors(anchorResult.errors).forEach((line) => log.error(`- ${line}`));
      process.exitCode = 1;
      return;
    }

    log.success('Governance config and anchors are valid.');
  });
