import { Command } from 'commander';
import inquirer from 'inquirer';
import path from 'path';
import { stringify } from 'yaml';
import { getAnchorFiles } from '@nsb/anchors';
import { loadAnchorsFromFile, mergeAnchorCollections } from '@nsb/core';
import { loadProfileConfig, serializeConfig } from '../generators/config';
import { generateAgentsMd } from '../generators/agents-md';
import { generateClaudeMd } from '../generators/claude-md';
import { generateCursorRules } from '../generators/cursor-rules';
import { ensureDir, fileExists, writeFileSafe } from '../utils/files';
import { log } from '../utils/logger';

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

    const root = process.cwd();
    const mbfDir = path.resolve(root, '.mbf');
    const configPath = path.resolve(mbfDir, 'mbf-governance.yaml');
    const anchorsPath = path.resolve(mbfDir, 'anchors.yaml');
    const customAnchorsPath = path.resolve(mbfDir, 'custom-anchors.yaml');

    ensureDir(mbfDir);

    const config = loadProfileConfig(answers.profile);
    config.governance.profile = answers.profile;
    config.tools = { enabled: answers.tools };

    writeFileSafe(configPath, serializeConfig(config), force);

    const anchorCollections = getAnchorFiles().map((file) => loadAnchorsFromFile(file));
    const mergedAnchors = mergeAnchorCollections(...anchorCollections);
    writeFileSafe(anchorsPath, stringify(mergedAnchors), force);
    if (!fileExists(customAnchorsPath)) {
      writeFileSafe(customAnchorsPath, '# Add custom anchors here\n', true);
    }

    if (answers.tools.includes('claude')) {
      const claudePath = path.resolve(root, 'CLAUDE.md');
      writeFileSafe(claudePath, generateClaudeMd(config, mergedAnchors), force);
    }

    if (answers.tools.includes('cursor')) {
      const cursorPath = path.resolve(root, '.cursor', 'rules', 'mbf.mdc');
      writeFileSafe(cursorPath, generateCursorRules(config, mergedAnchors), force);
    }

    if (answers.tools.includes('codex')) {
      const agentsPath = path.resolve(root, 'AGENTS.md');
      writeFileSafe(agentsPath, generateAgentsMd(config, mergedAnchors), force);
    }

    log.success('North Star Build initialized.');
  });
