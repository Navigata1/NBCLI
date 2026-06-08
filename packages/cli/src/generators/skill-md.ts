import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { buildInstructionBody } from './instruction-base';

/**
 * Generates a Claude Code `SKILL.md` from the same single source of truth as
 * CLAUDE.md / AGENTS.md / Cursor rules. SKILL.md requires YAML frontmatter with
 * `name` (kebab-case) and `description` (with a "use when" clause), so this
 * generator follows the Cursor-rules frontmatter pattern rather than the plain
 * Markdown-header pattern of claude-md.ts.
 */
export const generateSkillMd = (config: GovernanceConfig, anchors: AnchorCollection) => {
  const body = buildInstructionBody(config, anchors);
  return `---
name: north-star-build
description: Governed-autonomy guardrails (confidence calibration, risk anchors, hook profile, budgets, permissions) compiled from .mbf/mbf-governance.yaml. Use before file changes, when touching risky paths (auth/secrets/migrations), or before autonomous multi-step work.
license: CC-BY-NC-SA-4.0
---

# North Star Build (Claude Skill)

## When NOT to use
Skip this skill for trivial, risk-free single-line edits with no anchor match; for pure read/exploration
with no mutation; and when a more specific project skill already governs the task. It governs change +
autonomy — it is not a general coding assistant.

${body}`;
};
