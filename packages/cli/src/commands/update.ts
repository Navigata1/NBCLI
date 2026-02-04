import { Command } from 'commander';
import path from 'path';
import { existsSync, readFileSync } from 'fs';
import { parse } from 'yaml';
import { generateAgentsMd } from '../generators/agents-md';
import { generateClaudeMd } from '../generators/claude-md';
import { generateCursorRules } from '../generators/cursor-rules';
import { writeFileSafe } from '../utils/files';
import { log } from '../utils/logger';
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
  .action((options) => {
    const root = process.cwd();
    const configPath = path.resolve(root, '.mbf', 'mbf-governance.yaml');
    const anchorsPath = path.resolve(root, '.mbf', 'anchors.yaml');

    if (!existsSync(configPath) || !existsSync(anchorsPath)) {
      log.error('Missing .mbf/mbf-governance.yaml or .mbf/anchors.yaml. Run `nsb init` first.');
      process.exitCode = 1;
      return;
    }

    const config = parse(readFileSync(configPath, 'utf-8')) as GovernanceConfig;
    const anchors = parse(readFileSync(anchorsPath, 'utf-8')) as AnchorCollection;

    const tools = parseTools(options.tools);
    const resolvedTools = tools.length ? tools : config.tools?.enabled ?? ['claude', 'cursor', 'codex'];

    const overwrite = true;

    if (resolvedTools.includes('claude')) {
      const claudePath = path.resolve(root, 'CLAUDE.md');
      writeFileSafe(claudePath, generateClaudeMd(config, anchors), overwrite);
    }

    if (resolvedTools.includes('cursor')) {
      const cursorPath = path.resolve(root, '.cursor', 'rules', 'mbf.mdc');
      writeFileSafe(cursorPath, generateCursorRules(config, anchors), overwrite);
    }

    if (resolvedTools.includes('codex')) {
      const agentsPath = path.resolve(root, 'AGENTS.md');
      writeFileSafe(agentsPath, generateAgentsMd(config, anchors), overwrite);
    }

    log.success('Instructions regenerated.');
  });
