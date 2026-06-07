import { Command } from 'commander';
import path from 'path';
import { existsSync, readFileSync } from 'fs';
import { parse, stringify } from 'yaml';
import { getAnchorFiles } from '@nsb/anchors';
import { loadAnchorsFromFile, mergeAnchorCollections } from '@nsb/core';
import { DEFAULT_TOOLS } from '../generators/registry';
import { generateToolFiles } from '../utils/generate';
import { getPlannedWrites, setDryRun, writeFileSafe } from '../utils/files';
import { buildReport, renderPreview } from '../utils/preview';
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
  .option('-t, --tools <tools>', 'comma separated: claude,cursor,codex,skill')
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
        const parsed = parse(readFileSync(customAnchorsPath, 'utf-8'));
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
    const resolvedTools = tools.length ? tools : config.tools?.enabled ?? DEFAULT_TOOLS;

    if (options.dryRun) {
      log.info('Anchor merge summary:');
      console.log(formatMergeDiff(mergeResult));

      setDryRun(true);
      writeFileSafe(anchorsPath, stringify(anchors), true);
      generateToolFiles(root, config, anchors, resolvedTools, true);
      const planned = getPlannedWrites();
      setDryRun(false);

      const report = buildReport({ root, config, tools: resolvedTools, force: true, planned });
      renderPreview(report);
      return;
    }

    writeFileSafe(anchorsPath, stringify(anchors), true);
    generateToolFiles(root, config, anchors, resolvedTools, true);

    log.success('Anchors merged and instructions regenerated.');
  });
