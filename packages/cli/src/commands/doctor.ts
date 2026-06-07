import { Command } from 'commander';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { parse } from 'yaml';
import ora from 'ora';
import Table from 'cli-table3';
import { validateAnchorCollection, validateGovernanceConfig } from '@nsb/schema';
import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { HOOK_PROFILE_BY_GOVERNANCE, verifyLedger } from '@nsb/core';
import { log } from '../utils/logger.js';
import { printMini } from '../utils/banner.js';
import { colors, icons } from '../utils/theme.js';

type CheckStatus = 'pass' | 'warn' | 'fail';

interface CheckResult {
  name: string;
  status: CheckStatus;
  message: string;
  suggestion?: string;
}

const statusIcon = (status: CheckStatus) => {
  switch (status) {
    case 'pass':
      return icons.success;
    case 'warn':
      return icons.warning;
    case 'fail':
      return icons.error;
  }
};

const statusColor = (status: CheckStatus, text: string) => {
  switch (status) {
    case 'pass':
      return colors.success(text);
    case 'warn':
      return colors.warning(text);
    case 'fail':
      return colors.error(text);
  }
};

export const doctorCommand = new Command('doctor')
  .description('Run environment and configuration diagnostics')
  .action(async () => {
    printMini();

    log.subheader('Running diagnostics...');
    log.blank();

    const results: CheckResult[] = [];
    const recommendations: string[] = [];

    const spinner = ora({ text: 'Checking Node.js version...', color: 'cyan' }).start();
    const [major] = process.versions.node.split('.').map(Number);
    if (major < 22) {
      spinner.warn(`Node ${process.versions.node} detected`);
      results.push({
        name: 'Node.js',
        status: 'warn',
        message: `v${process.versions.node}`,
        suggestion: 'Upgrade to Node 22+ for best results',
      });
      recommendations.push('Upgrade to Node.js 22 or later');
    } else {
      spinner.succeed(`Node ${process.versions.node}`);
      results.push({
        name: 'Node.js',
        status: 'pass',
        message: `v${process.versions.node}`,
      });
    }

    spinner.start('Checking pnpm...');
    try {
      const pnpm = execSync('pnpm -v', { encoding: 'utf-8' }).trim();
      spinner.succeed(`pnpm ${pnpm}`);
      results.push({
        name: 'pnpm',
        status: 'pass',
        message: `v${pnpm}`,
      });
    } catch {
      spinner.warn('pnpm not found');
      results.push({
        name: 'pnpm',
        status: 'warn',
        message: 'Not installed',
        suggestion: 'Install pnpm 10+ for best results',
      });
      recommendations.push('Install pnpm: npm install -g pnpm');
    }

    const root = process.cwd();
    const configPath = path.resolve(root, '.mbf', 'mbf-governance.yaml');
    const anchorsPath = path.resolve(root, '.mbf', 'anchors.yaml');

    spinner.start('Checking governance config...');
    if (!existsSync(configPath)) {
      spinner.fail('Governance config missing');
      results.push({
        name: 'Governance Config',
        status: 'fail',
        message: 'Missing',
        suggestion: 'Run nsb init',
      });
      recommendations.push('Run `nsb init` to initialize your project');
    } else {
      const config = parse(readFileSync(configPath, 'utf-8')) as GovernanceConfig;
      const configResult = validateGovernanceConfig(config);
      if (configResult.valid) {
        spinner.succeed('Governance config valid');
        results.push({
          name: 'Governance Config',
          status: 'pass',
          message: 'Valid',
        });
      } else {
        spinner.fail('Governance config invalid');
        results.push({
          name: 'Governance Config',
          status: 'fail',
          message: 'Invalid',
          suggestion: 'Run nsb validate for details',
        });
        recommendations.push('Run `nsb validate` to see validation errors');
      }
    }

    spinner.start('Checking anchors...');
    if (!existsSync(anchorsPath)) {
      spinner.fail('Anchors missing');
      results.push({
        name: 'Anchors',
        status: 'fail',
        message: 'Missing',
        suggestion: 'Run nsb init',
      });
    } else {
      const anchors = parse(readFileSync(anchorsPath, 'utf-8')) as AnchorCollection;
      const anchorResult = validateAnchorCollection(anchors);
      if (anchorResult.valid) {
        spinner.succeed('Anchors valid');
        results.push({
          name: 'Anchors',
          status: 'pass',
          message: 'Valid',
        });
      } else {
        spinner.fail('Anchors invalid');
        results.push({
          name: 'Anchors',
          status: 'fail',
          message: 'Invalid',
          suggestion: 'Run nsb validate for details',
        });
      }
    }

    if (existsSync(configPath)) {
      const config = parse(readFileSync(configPath, 'utf-8')) as GovernanceConfig;
      const tools = config.tools?.enabled ?? [];

      spinner.start('Checking tool outputs...');

      if (tools.includes('claude')) {
        if (existsSync(path.resolve(root, 'CLAUDE.md'))) {
          results.push({ name: 'CLAUDE.md', status: 'pass', message: 'Present' });
        } else {
          results.push({
            name: 'CLAUDE.md',
            status: 'warn',
            message: 'Missing',
            suggestion: 'Run nsb update',
          });
          recommendations.push('Run `nsb update` to generate CLAUDE.md');
        }
      }

      if (tools.includes('cursor')) {
        if (existsSync(path.resolve(root, '.cursor', 'rules', 'mbf.mdc'))) {
          results.push({ name: 'Cursor Rules', status: 'pass', message: 'Present' });
        } else {
          results.push({
            name: 'Cursor Rules',
            status: 'warn',
            message: 'Missing',
            suggestion: 'Run nsb update',
          });
          recommendations.push('Run `nsb update` to generate Cursor rules');
        }
      }

      if (tools.includes('codex')) {
        if (existsSync(path.resolve(root, 'AGENTS.md'))) {
          results.push({ name: 'AGENTS.md', status: 'pass', message: 'Present' });
        } else {
          results.push({
            name: 'AGENTS.md',
            status: 'warn',
            message: 'Missing',
            suggestion: 'Run nsb update',
          });
          recommendations.push('Run `nsb update` to generate AGENTS.md');
        }
      }

      if (tools.includes('skill')) {
        if (existsSync(path.resolve(root, '.claude', 'skills', 'north-star', 'SKILL.md'))) {
          results.push({ name: 'SKILL.md', status: 'pass', message: 'Present' });
        } else {
          results.push({
            name: 'SKILL.md',
            status: 'warn',
            message: 'Missing',
            suggestion: 'Run nsb update',
          });
          recommendations.push('Run `nsb update` to generate SKILL.md');
        }
      }

      const hookProfile =
        config.hooks?.profile ?? HOOK_PROFILE_BY_GOVERNANCE[config.governance.profile];
      results.push({ name: 'Hook Profile', status: 'pass', message: hookProfile });

      spinner.succeed('Tool outputs checked');
    }

    const ledgerFile = path.resolve(root, '.mbf', 'ledger', 'runs.jsonl');
    if (existsSync(ledgerFile)) {
      const ledger = verifyLedger(ledgerFile);
      results.push(
        ledger.valid
          ? { name: 'Run Ledger', status: 'pass', message: `Intact (${ledger.entries})` }
          : {
              name: 'Run Ledger',
              status: 'fail',
              message: `Broken at ${ledger.brokenAt}`,
              suggestion: 'Investigate tampering',
            },
      );
    }

    log.blank();
    log.subheader('Diagnostic Results');
    log.blank();

    const table = new Table({
      head: [colors.primary('Check'), colors.primary('Status'), colors.primary('Details')],
      style: { head: [], border: ['gray'] },
      chars: {
        top: '─',
        'top-mid': '┬',
        'top-left': '┌',
        'top-right': '┐',
        bottom: '─',
        'bottom-mid': '┴',
        'bottom-left': '└',
        'bottom-right': '┘',
        left: '│',
        'left-mid': '├',
        mid: '─',
        'mid-mid': '┼',
        right: '│',
        'right-mid': '┤',
        middle: '│',
      },
    });

    results.forEach((result) => {
      table.push([
        colors.white(result.name),
        `${statusIcon(result.status)} ${statusColor(result.status, result.status.toUpperCase())}`,
        result.message,
      ]);
    });

    console.log(table.toString());

    log.blank();

    const uniqueRecommendations = [...new Set(recommendations)];
    if (uniqueRecommendations.length > 0) {
      log.box(
        [
          colors.warning('Recommendations'),
          '',
          ...uniqueRecommendations.map((r) => `  ${icons.arrow}  ${r}`),
        ].join('\n'),
        'warning'
      );
    } else {
      log.successBox('All Checks Passed', ['Your environment is properly configured']);
    }
  });
