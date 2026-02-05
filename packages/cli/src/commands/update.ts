import { Command } from 'commander';
import path from 'path';
import { existsSync, readFileSync } from 'fs';
import { parse, stringify } from 'yaml';
import { getAnchorFiles } from '@nsb/anchors';
import { loadAnchorsFromFile, mergeAnchorCollections } from '@nsb/core';
import { generateAgentsMd } from '../generators/agents-md';
import { generateClaudeMd } from '../generators/claude-md';
import { generateCursorRules } from '../generators/cursor-rules';
import { writeFileSafe } from '../utils/files';
import { log } from '../utils/logger';
import { mergeAnchors, formatMergeDiff } from '../utils/anchors';
import type { AnchorCollection, GovernanceConfig } from '@nsb/core';

const parseTools = (value?: string) =>
  value
    ? value
        .split(',')
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean)
    : [];

export const updateCommand = new Command('update')
  .description('Regenerate tool instructions from current configuration')
  .option('-t, --tools <tools>', 'comma separated: claude,cursor,codex')
  .option('--dry-run', 'show what would change without writing files', false)
  .action((options) => {
    const root = process.cwd();
    const configPath = path.resolve(root, '.mbf', 'mbf-governance.yaml');
    const anchorsPath = path.resolve(root, '.mbf', 'anchors.yaml');
    const customAnchorsPath = path.resolve(root, '.mbf', 'custom-anchors.yaml');

    if (!existsSync(configPath)) {
      log.error('Missing .mbf/mbf-governance.yaml. Run `nsb init` first.');
      process.exitCode = 1;
      return;
    }

    const config = parse(readFileSync(configPath, 'utf-8')) as GovernanceConfig;

    const anchorCollections = getAnchorFiles().map((file) => loadAnchorsFromFile(file));
    const builtInAnchors = mergeAnchorCollections(...anchorCollections);

    let customAnchors: AnchorCollection = {};
    if (existsSync(customAnchorsPath)) {
      try {
        const customRaw = readFileSync(customAnchorsPath, 'utf-8');
        const parsed = parse(customRaw);
        if (parsed && typeof parsed === 'object') {
          customAnchors = parsed as AnchorCollection;
        }
      } catch {
        log.warn('Could not parse custom-anchors.yaml, skipping custom anchors.');
      }
    }

    const mergeResult = mergeAnchors(builtInAnchors, customAnchors);
    const anchors = mergeResult.merged;

    const tools = parseTools(options.tools);
    const resolvedTools = tools.length ? tools : config.tools?.enabled ?? ['claude', 'cursor', 'codex'];

    if (options.dryRun) {
      log.info('Dry run mode - no files will be written.\n');

      log.info('Anchor merge summary:');
      console.log(formatMergeDiff(mergeResult));
      console.log('');

      log.info('Files that would be updated:');
      console.log(`  - ${anchorsPath}`);

      if (resolvedTools.includes('claude')) {
        console.log(`  - ${path.resolve(root, 'CLAUDE.md')}`);
      }
      if (resolvedTools.includes('cursor')) {
        console.log(`  - ${path.resolve(root, '.cursor', 'rules', 'mbf.mdc')}`);
      }
      if (resolvedTools.includes('codex')) {
        console.log(`  - ${path.resolve(root, 'AGENTS.md')}`);
      }

      log.success('Dry run complete.');
      return;
    }

    writeFileSafe(anchorsPath, stringify(anchors), true);

    if (resolvedTools.includes('claude')) {
      const claudePath = path.resolve(root, 'CLAUDE.md');
      writeFileSafe(claudePath, generateClaudeMd(config, anchors), true);
    }

    if (resolvedTools.includes('cursor')) {
      const cursorPath = path.resolve(root, '.cursor', 'rules', 'mbf.mdc');
      writeFileSafe(cursorPath, generateCursorRules(config, anchors), true);
    }

    if (resolvedTools.includes('codex')) {
      const agentsPath = path.resolve(root, 'AGENTS.md');
      writeFileSafe(agentsPath, generateAgentsMd(config, anchors), true);
    }

    log.success('Anchors merged and instructions regenerated.');
  });
