import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { TOOL_GENERATORS, resolveOutPath } from '../generators/registry';
import { writeFileSafe } from './files';

export interface GeneratedFile {
  tool: string;
  label: string;
  path: string;
}

/**
 * The SINGLE path that renders + writes selected tool instruction files.
 * Both `init` and `update` call this, iterating the generator registry — so the
 * per-tool write blocks are defined once, not copy-pasted across commands.
 * Honors global dry-run via writeFileSafe.
 */
export function generateToolFiles(
  root: string,
  config: GovernanceConfig,
  anchors: AnchorCollection,
  tools: string[],
  force: boolean,
): GeneratedFile[] {
  const created: GeneratedFile[] = [];
  for (const generator of TOOL_GENERATORS) {
    if (!tools.includes(generator.tool)) continue;
    const outPath = resolveOutPath(root, generator);
    writeFileSafe(outPath, generator.render(config, anchors), force);
    created.push({ tool: generator.tool, label: generator.label, path: outPath });
  }
  return created;
}
