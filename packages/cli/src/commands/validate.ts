import { Command } from 'commander';
import path from 'path';
import { existsSync, readFileSync } from 'fs';
import { parse } from 'yaml';
import ora from 'ora';
import { validateAnchorCollection, validateGovernanceConfig, formatAjvErrors } from '@nsb/schema';
import { log } from '../utils/logger.js';
import { printMini } from '../utils/banner.js';
import { colors, icons } from '../utils/theme.js';

export const validateCommand = new Command('validate')
  .description('Validate governance configuration and anchors')
  .action(async () => {
    printMini();

    const root = process.cwd();
    const configPath = path.resolve(root, '.mbf', 'mbf-governance.yaml');
    const anchorsPath = path.resolve(root, '.mbf', 'anchors.yaml');

    const spinner = ora({
      text: 'Checking for configuration files...',
      color: 'cyan',
    }).start();

    if (!existsSync(configPath) || !existsSync(anchorsPath)) {
      spinner.fail('Configuration files not found');
      log.blank();
      log.errorBox('Missing Configuration', [
        'Could not find .mbf/mbf-governance.yaml or .mbf/anchors.yaml',
        '',
        `Run ${colors.secondary('nsb init')} to initialize your project`,
      ]);
      process.exitCode = 1;
      return;
    }

    spinner.succeed('Configuration files found');

    const validationResults: { name: string; valid: boolean; errors: string[] }[] = [];

    spinner.start('Validating governance config...');
    const config = parse(readFileSync(configPath, 'utf-8'));
    const configResult = validateGovernanceConfig(config);
    validationResults.push({
      name: 'Governance Config',
      valid: configResult.valid,
      errors: configResult.valid ? [] : formatAjvErrors(configResult.errors),
    });
    if (configResult.valid) {
      spinner.succeed('Governance config is valid');
    } else {
      spinner.fail('Governance config has errors');
    }

    spinner.start('Validating anchors...');
    const anchors = parse(readFileSync(anchorsPath, 'utf-8'));
    const anchorResult = validateAnchorCollection(anchors);
    validationResults.push({
      name: 'Anchors',
      valid: anchorResult.valid,
      errors: anchorResult.valid ? [] : formatAjvErrors(anchorResult.errors),
    });
    if (anchorResult.valid) {
      spinner.succeed('Anchors are valid');
    } else {
      spinner.fail('Anchors have errors');
    }

    log.blank();
    log.subheader('Validation Results');
    log.blank();

    let hasErrors = false;

    validationResults.forEach((result) => {
      if (result.valid) {
        log.success(`${result.name}`);
      } else {
        hasErrors = true;
        log.error(`${result.name}`);
        result.errors.forEach((error) => {
          log.dim(`${icons.arrow} ${error}`);
        });
      }
    });

    log.blank();

    if (hasErrors) {
      log.errorBox('Validation Failed', [
        'Please fix the errors above and run validate again',
        '',
        `See ${colors.secondary('nsb doctor')} for more diagnostics`,
      ]);
      process.exitCode = 1;
    } else {
      log.successBox('All Validations Passed', [
        'Your governance configuration is valid',
        '',
        `Run ${colors.secondary('nsb update')} to regenerate tool instructions`,
      ]);
    }
  });
