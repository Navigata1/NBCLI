import { Command } from 'commander';
import inquirer from 'inquirer';
import path from 'path';
import { stringify } from 'yaml';
import ora from 'ora';
import Table from 'cli-table3';
import { getAnchorFiles } from '@nsb/anchors';
import { loadAnchorsFromFile, mergeAnchorCollections } from '@nsb/core';
import { loadProfileConfig, serializeConfig } from '../generators/config.js';
import { DEFAULT_TOOLS, TOOL_GENERATORS } from '../generators/registry.js';
import { generateToolFiles } from '../utils/generate.js';
import { ensureDir, fileExists, getPlannedWrites, setDryRun, writeFileSafe } from '../utils/files.js';
import { buildReport, renderPreview } from '../utils/preview.js';
import { log } from '../utils/logger.js';
import { printBanner } from '../utils/banner.js';
import { colors, icons } from '../utils/theme.js';

const TOOL_CHOICES = TOOL_GENERATORS.map((generator) => ({
  name: generator.label,
  value: generator.tool,
}));

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
  .option('-t, --tools <tools>', 'comma separated: claude,cursor,codex,skill')
  .option('-f, --force', 'overwrite existing files', false)
  .option('-y, --yes', 'use defaults without prompting', false)
  .option('--dry-run', 'preview resolved config + files without writing or running a model', false)
  .action(async (options) => {
    printBanner();

    const profileOpt = options.profile ?? (options.yes ? 'professional' : undefined);
    const toolsOpt = parseTools(options.tools);
    const force = Boolean(options.force);
    const dryRun = Boolean(options.dryRun);

    // In dry-run we never prompt (so it is non-interactive / CI-safe).
    const answers =
      options.yes || dryRun
        ? {
            profile: profileOpt ?? 'professional',
            tools: toolsOpt.length ? toolsOpt : DEFAULT_TOOLS,
          }
        : await inquirer.prompt([
            {
              type: 'list',
              name: 'profile',
              message: 'Select a governance profile',
              choices: ['starter', 'professional', 'enterprise'],
              default: profileOpt ?? 'professional',
            },
            {
              type: 'checkbox',
              name: 'tools',
              message: 'Generate instructions for which tools?',
              choices: TOOL_CHOICES,
              default: toolsOpt.length ? toolsOpt : DEFAULT_TOOLS,
            },
          ]);

    const root = process.cwd();
    const mbfDir = path.resolve(root, '.mbf');
    const configPath = path.resolve(mbfDir, 'mbf-governance.yaml');
    const anchorsPath = path.resolve(mbfDir, 'anchors.yaml');
    const customAnchorsPath = path.resolve(mbfDir, 'custom-anchors.yaml');

    const config = loadProfileConfig(answers.profile);
    config.governance.profile = answers.profile;
    config.tools = { enabled: answers.tools };

    const anchorCollections = getAnchorFiles().map((file) => loadAnchorsFromFile(file));
    const mergedAnchors = mergeAnchorCollections(...anchorCollections);

    // ---- Dry-run: account for every write, render a verdict, touch nothing. ----
    if (dryRun) {
      setDryRun(true);
      writeFileSafe(configPath, serializeConfig(config), force);
      writeFileSafe(anchorsPath, stringify(mergedAnchors), force);
      if (!fileExists(customAnchorsPath)) {
        writeFileSafe(customAnchorsPath, '# Add custom anchors here\n', true);
      }
      generateToolFiles(root, config, mergedAnchors, answers.tools, force);
      const planned = getPlannedWrites();
      setDryRun(false);

      const report = buildReport({ root, config, tools: answers.tools, force, planned });
      renderPreview(report);
      if (report.verdict === 'blocked') process.exitCode = 1;
      return;
    }

    // ---- Real init. ----
    log.blank();
    log.subheader('Initializing project...');
    log.blank();

    const createdFiles: string[] = [];
    const spinner = ora({ text: 'Creating governance directory...', color: 'cyan' }).start();

    ensureDir(mbfDir);
    spinner.succeed('Created .mbf directory');

    spinner.start('Generating governance configuration...');
    writeFileSafe(configPath, serializeConfig(config), force);
    createdFiles.push('.mbf/mbf-governance.yaml');
    spinner.succeed('Generated governance config');

    spinner.start('Merging anchor collections...');
    writeFileSafe(anchorsPath, stringify(mergedAnchors), force);
    createdFiles.push('.mbf/anchors.yaml');
    if (!fileExists(customAnchorsPath)) {
      writeFileSafe(customAnchorsPath, '# Add custom anchors here\n', true);
      createdFiles.push('.mbf/custom-anchors.yaml');
    }
    spinner.succeed('Merged anchor collections');

    spinner.start('Generating tool instructions...');
    const generated = generateToolFiles(root, config, mergedAnchors, answers.tools, force);
    generated.forEach((file) => createdFiles.push(path.relative(root, file.path)));
    spinner.succeed('Generated tool instructions');

    log.blank();

    const table = new Table({
      head: [colors.primary('File'), colors.primary('Status')],
      style: { head: [], border: ['gray'] },
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
