import { Command } from 'commander';
import path from 'path';
import { existsSync, readFileSync } from 'fs';
import { parse } from 'yaml';
import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { getBuiltInAnchors } from '@nsb/anchors';
import { DEFAULT_TOOLS } from '../generators/registry';
import { mergeAnchors } from '../utils/anchors';
import { gatherPreview, renderPreview } from '../utils/preview';
import { log } from '../utils/logger';
import { printMini } from '../utils/banner';

/**
 * `nsb preview` — a read-only, model-free resolution of the current project:
 * resolved config, hook profile, tools, MCP/auth posture, the exact files a
 * regenerate would write, and a ready/warning/blocked verdict.
 */
export const previewCommand = new Command('preview')
  .description('Preview resolved config, tools, MCP/auth, and planned writes (no model run)')
  .action(() => {
    printMini();
    const root = process.cwd();
    const configPath = path.resolve(root, '.mbf', 'mbf-governance.yaml');
    const customAnchorsPath = path.resolve(root, '.mbf', 'custom-anchors.yaml');

    if (!existsSync(configPath)) {
      log.error('Missing .mbf/mbf-governance.yaml. Run `nsb init` first (or `nsb init --dry-run`).');
      process.exitCode = 1;
      return;
    }

    const config = parse(readFileSync(configPath, 'utf-8')) as GovernanceConfig;
    const builtIn = getBuiltInAnchors();

    let custom: AnchorCollection = {};
    if (existsSync(customAnchorsPath)) {
      try {
        const parsed = parse(readFileSync(customAnchorsPath, 'utf-8'));
        if (parsed && typeof parsed === 'object') custom = parsed as AnchorCollection;
      } catch {
        log.warn('Could not parse custom-anchors.yaml; previewing built-in anchors only.');
      }
    }

    const anchors = mergeAnchors(builtIn, custom).merged;
    const tools = config.tools?.enabled?.length ? config.tools.enabled : DEFAULT_TOOLS;

    const report = gatherPreview({ root, config, anchors, tools, force: true });
    renderPreview(report);
    if (report.verdict === 'blocked') process.exitCode = 1;
  });
