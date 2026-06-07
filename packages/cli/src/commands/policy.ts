import { Command } from 'commander';
import path from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { parse } from 'yaml';
import type { AnchorCollection } from '@nsb/core';
import { toCedar, toRego } from '@nsb/core';
import { getBuiltInAnchors } from '@nsb/anchors';
import { mergeAnchors } from '../utils/anchors';
import { log } from '../utils/logger';
import { printMini } from '../utils/banner';

function loadAnchors(root: string): AnchorCollection {
  const builtIn = getBuiltInAnchors();
  const customPath = path.resolve(root, '.mbf', 'custom-anchors.yaml');
  let custom: AnchorCollection = {};
  if (existsSync(customPath)) {
    try {
      const parsed = parse(readFileSync(customPath, 'utf-8'));
      if (parsed && typeof parsed === 'object') custom = parsed as AnchorCollection;
    } catch {
      /* ignore */
    }
  }
  return mergeAnchors(builtIn, custom).merged;
}

/**
 * `nsb policy export` — compile the governance anchors into policy-as-code so the
 * same rules enforce at the tool-call layer in OPA/Cedar gates (OWASP Agentic
 * Top-10: goal hijacking). NBCLI emits the policy; the operator runs the engine.
 */
export const policyCommand = new Command('policy').description(
  'Compile governance anchors into policy-as-code (OPA/Rego, Cedar)',
);

policyCommand
  .command('export')
  .description('Export anchors as a Rego or Cedar policy (stdout, or --out file)')
  .option('-f, --format <format>', 'rego | cedar', 'rego')
  .option('--out <file>', 'write to a file (default stdout)')
  .action((options) => {
    const root = process.cwd();
    const anchors = loadAnchors(root);
    const format = options.format === 'cedar' ? 'cedar' : 'rego';
    const policy = format === 'cedar' ? toCedar(anchors) : toRego(anchors);

    if (options.out) {
      writeFileSync(path.resolve(root, options.out), policy, 'utf-8');
      printMini();
      log.success(`Exported ${format} policy → ${options.out}`);
      if (format === 'cedar') log.dim('Cedar covers path anchors only — use --format rego for content rules.');
    } else {
      process.stdout.write(policy);
    }
  });
