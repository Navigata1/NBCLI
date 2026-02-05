import { Command } from 'commander';
import inquirer from 'inquirer';
import path from 'path';
import { stringify } from 'yaml';
import ora from 'ora';
import Table from 'cli-table3';
import { getAnchorFiles } from '@nsb/anchors';
import { loadAnchorsFromFile, mergeAnchorCollections } from '@nsb/core';
import { loadProfileConfig, serializeConfig } from '../generators/config.js';
import { generateAgentsMd } from '../generators/agents-md.js';
import { generateClaudeMd } from '../generators/claude-md.js';
import { generateCursorRules } from '../generators/cursor-rules.js';
import { ensureDir, fileExists, writeFileSafe } from '../utils/files.js';
import { log } from '../utils/logger.js';
import { printBanner } from '../utils/banner.js';
import { colors, icons, gradients } from '../utils/theme.js';

const TOOL_CHOICES = [
  { name: 'Claude Code (CLAUDE.md)', value: 'claude' },
  { name: 'Cursor (.cursor/rules/mbf.mdc)', value: 'cursor' },
  { name: 'Codex (AGENTS.md)', value: 'codex' },
];

const parseTools = (value?: string) =>
  value
    ? value
        .split(',')
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean)
    : [];

export const initCommand = new Command('init')
  .description('Initialize North Star Build governance in this project')
  .option('-p, --profile <profile>', 'starter | professional | enterprise')
  .option('-t, --tools <tools>', 'comma separated: claude,cursor,codex')
  .option('-f, --force', 'overwrite existing files', false)
  .option('-y, --yes', 'use defaults without prompting', false)
  .action(async (options) => {
    printBanner();

    const profile = options.profile ?? (options.yes ? 'professional' : undefined);
    const tools = parseTools(options.tools);
    const force = Boolean(options.force);

    const answers = options.yes
      ? { profile, tools: tools.length ? tools : ['claude', 'cursor', 'codex'] }
      : await inquirer.prompt([
          {
            type: 'list',
            name: 'profile',
            message: 'Select a governance profile',
            choices: ['starter', 'professional', 'enterprise'],
            default: profile ?? 'professional',
          },
          {
            type: 'checkbox',
            name: 'tools',
            message: 'Generate instructions for which tools?',
            choices: TOOL_CHOICES,
            default: tools.length ? tools : ['claude', 'cursor', 'codex'],
          },
        ]);

    log.blank();
    log.subheader('Initializing project...');
    log.blank();

    const root = process.cwd();
    const mbfDir = path.resolve(root, '.mbf');
    const configPath = path.resolve(mbfDir, 'mbf-governance.yaml');
    const anchorsPath = path.resolve(mbfDir, 'anchors.yaml');
    const customAnchorsPath = path.resolve(mbfDir, 'custom-anchors.yaml');

    const createdFiles: string[] = [];

    const spinner = ora({
      text: 'Creating governance directory...',
      color: 'cyan',
    }).start();

    ensureDir(mbfDir);
    spinner.succeed('Created .mbf directory');

    spinner.start('Generating governance configuration...');
    const config = loadProfileConfig(answers.profile);
    config.governance.profile = answers.profile;
    config.tools = { enabled: answers.tools };
    writeFileSafe(configPath, serializeConfig(config), force);
    createdFiles.push('.mbf/mbf-governance.yaml');
    spinner.succeed('Generated governance config');

    spinner.start('Merging anchor collections...');
    const anchorCollections = getAnchorFiles().map((file) => loadAnchorsFromFile(file));
    const mergedAnchors = mergeAnchorCollections(...anchorCollections);
    writeFileSafe(anchorsPath, stringify(mergedAnchors), force);
    createdFiles.push('.mbf/anchors.yaml');
    if (!fileExists(customAnchorsPath)) {
      writeFileSafe(customAnchorsPath, '# Add custom anchors here\n', true);
      createdFiles.push('.mbf/custom-anchors.yaml');
    }
    spinner.succeed('Merged anchor collections');

    if (answers.tools.includes('claude')) {
      spinner.start('Generating CLAUDE.md...');
      const claudePath = path.resolve(root, 'CLAUDE.md');
      writeFileSafe(claudePath, generateClaudeMd(config, mergedAnchors), force);
      createdFiles.push('CLAUDE.md');
      spinner.succeed('Generated CLAUDE.md');
    }

    if (answers.tools.includes('cursor')) {
      spinner.start('Generating Cursor rules...');
      const cursorPath = path.resolve(root, '.cursor', 'rules', 'mbf.mdc');
      writeFileSafe(cursorPath, generateCursorRules(config, mergedAnchors), force);
      createdFiles.push('.cursor/rules/mbf.mdc');
      spinner.succeed('Generated Cursor rules');
    }

    if (answers.tools.includes('codex')) {
      spinner.start('Generating AGENTS.md...');
      const agentsPath = path.resolve(root, 'AGENTS.md');
      writeFileSafe(agentsPath, generateAgentsMd(config, mergedAnchors), force);
      createdFiles.push('AGENTS.md');
      spinner.succeed('Generated AGENTS.md');
    }

    log.blank();

    const table = new Table({
      head: [colors.primary('File'), colors.primary('Status')],
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

    createdFiles.forEach((file) => {
      table.push([colors.dim(file), `${icons.success} Created`]);
    });

    console.log(table.toString());

    log.successBox('Initialization Complete!', [
      `Profile: ${colors.primary(answers.profile)}`,
      `Tools: ${answers.tools.map((t: string) => colors.secondary(t)).join(', ')}`,
      '',
      `Run ${colors.secondary('nsb validate')} to verify your setup`,
      `Run ${colors.secondary('nsb doctor')} to check your environment`,
    ]);
  });
