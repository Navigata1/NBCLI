import { createHash } from 'crypto';
import { existsSync, readFileSync } from 'fs';
import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { TOOL_GENERATORS, resolveOutPath } from '../generators/registry';
import { writeFileSafe } from './files';

export interface GeneratedFile {
  tool: string;
  label: string;
  path: string;
}

// Content-hash discipline (mirrors NBB build_bootstrap.sh): stamp each generated file with the
// sha256 of its body so drift (hand-edit, or out-of-sync-with-config) is detectable via `nsb update --check`.
const STAMP_RE = /\n?<!-- nbcli-generated sha256:[a-f0-9]{64} [^\n>]*-->\n?$/;
// Capture the hash from the STAMP itself (anchored at EOF) — never from a sha256: token that may
// legitimately appear in the rendered body (e.g. a config description that mentions a hash).
const STAMP_CAPTURE = /<!-- nbcli-generated sha256:([a-f0-9]{64}) [^\n>]*-->\s*$/;
const bodyHash = (s: string) => createHash('sha256').update(s, 'utf-8').digest('hex');
const stripStamp = (s: string) => s.replace(STAMP_RE, '');
const stamp = (body: string) =>
  `${body}\n<!-- nbcli-generated sha256:${bodyHash(body)} -- do not edit; regenerate with \`nsb update\` -->\n`;

export interface GenCheckResult {
  ok: boolean;
  issues: string[];
}

/** Verify generated files are unedited (stamp matches body) AND in sync with the current config. */
export function checkGeneratedFiles(
  root: string,
  config: GovernanceConfig,
  anchors: AnchorCollection,
  tools: string[],
): GenCheckResult {
  const issues: string[] = [];
  const seen = new Set<string>();
  for (const generator of TOOL_GENERATORS) {
    if (!tools.includes(generator.tool)) continue;
    const outPath = resolveOutPath(root, generator);
    if (seen.has(outPath)) continue;
    seen.add(outPath);
    if (!existsSync(outPath)) {
      issues.push(`missing: ${generator.relPath} (run \`nsb update\`)`);
      continue;
    }
    const onDisk = readFileSync(outPath, 'utf-8');
    const onDiskBody = stripStamp(onDisk);
    const embedded = onDisk.match(STAMP_CAPTURE)?.[1];
    if (!embedded || embedded !== bodyHash(onDiskBody)) {
      issues.push(`hand-edited (stamp mismatch): ${generator.relPath}`);
    } else if (onDiskBody !== generator.render(config, anchors)) {
      issues.push(`out of sync with config (run \`nsb update\`): ${generator.relPath}`);
    }
  }
  return { ok: issues.length === 0, issues };
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
  const written = new Set<string>();
  for (const generator of TOOL_GENERATORS) {
    if (!tools.includes(generator.tool)) continue;
    const outPath = resolveOutPath(root, generator);
    // De-dupe shared targets (e.g. codex + grok both -> AGENTS.md): write once,
    // but still record every tool the file serves.
    if (!written.has(outPath)) {
      writeFileSafe(outPath, stamp(generator.render(config, anchors)), force);
      written.add(outPath);
    }
    created.push({ tool: generator.tool, label: generator.label, path: outPath });
  }
  return created;
}
