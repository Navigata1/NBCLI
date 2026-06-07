import path from 'path';
import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { generateClaudeMd } from './claude-md';
import { generateCursorRules } from './cursor-rules';
import { generateAgentsMd } from './agents-md';
import { generateSkillMd } from './skill-md';
import { generateWindsurfRules } from './windsurf-rules';
import { generateClineRules } from './cline-rules';
import { generateGeminiMd } from './gemini-md';
import { generateCopilotMd } from './copilot-md';
import { generateGrokAgents } from './grok-agents';
import { generateAiderConventions } from './aider-conventions';
import { generateJunieGuidelines } from './junie-guidelines';

/**
 * One generator descriptor per portable instruction target. This registry is
 * the single list consumed by BOTH `init` and `update` so the per-tool write
 * blocks are no longer copy-pasted (and diverging) across the two commands.
 *
 * Adding a new target = one entry here. Portability ("one source of truth ->
 * AGENTS.md / CLAUDE.md / SKILL.md / Cursor") is expressed entirely by this list.
 */
export interface ToolGenerator {
  /** Key used in `config.tools.enabled` and the `--tools` flag. */
  tool: string;
  /** Human-facing label (init prompt + summary table). */
  label: string;
  /** Output path relative to the project root. */
  relPath: string;
  /** Pure renderer: (config, anchors) -> file contents. */
  render: (config: GovernanceConfig, anchors: AnchorCollection) => string;
}

export const TOOL_GENERATORS: ToolGenerator[] = [
  {
    tool: 'claude',
    label: 'Claude Code (CLAUDE.md)',
    relPath: 'CLAUDE.md',
    render: generateClaudeMd,
  },
  {
    tool: 'cursor',
    label: 'Cursor (.cursor/rules/mbf.mdc)',
    relPath: path.join('.cursor', 'rules', 'mbf.mdc'),
    render: generateCursorRules,
  },
  {
    tool: 'codex',
    label: 'Codex / AGENTS.md standard (read by 20+ agents incl. Grok)',
    relPath: 'AGENTS.md',
    render: generateAgentsMd,
  },
  {
    tool: 'grok',
    label: 'Grok Build (AGENTS.md — xAI reads it natively)',
    relPath: 'AGENTS.md',
    render: generateGrokAgents,
  },
  {
    tool: 'skill',
    label: 'Claude Skill (.claude/skills/north-star/SKILL.md)',
    relPath: path.join('.claude', 'skills', 'north-star', 'SKILL.md'),
    render: generateSkillMd,
  },
  {
    tool: 'windsurf',
    label: 'Windsurf (.windsurf/rules/north-star.md)',
    relPath: path.join('.windsurf', 'rules', 'north-star.md'),
    render: generateWindsurfRules,
  },
  {
    tool: 'cline',
    label: 'Cline (.clinerules/north-star.md)',
    relPath: path.join('.clinerules', 'north-star.md'),
    render: generateClineRules,
  },
  {
    tool: 'gemini',
    label: 'Gemini CLI (GEMINI.md)',
    relPath: 'GEMINI.md',
    render: generateGeminiMd,
  },
  {
    tool: 'copilot',
    label: 'GitHub Copilot (.github/copilot-instructions.md)',
    relPath: path.join('.github', 'copilot-instructions.md'),
    render: generateCopilotMd,
  },
  {
    tool: 'aider',
    label: 'Aider (CONVENTIONS.md)',
    relPath: 'CONVENTIONS.md',
    render: generateAiderConventions,
  },
  {
    tool: 'junie',
    label: 'JetBrains Junie (.junie/guidelines.md)',
    relPath: path.join('.junie', 'guidelines.md'),
    render: generateJunieGuidelines,
  },
];

/** All known tool keys, in registry order. */
export const ALL_TOOLS = TOOL_GENERATORS.map((generator) => generator.tool);

/** Default tools selected by `init` when none are specified. */
export const DEFAULT_TOOLS = ['claude', 'cursor', 'codex', 'skill'];

export const getGenerator = (tool: string): ToolGenerator | undefined =>
  TOOL_GENERATORS.find((generator) => generator.tool === tool);

export const resolveOutPath = (root: string, generator: ToolGenerator): string =>
  path.resolve(root, generator.relPath);
