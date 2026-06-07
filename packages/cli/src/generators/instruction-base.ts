import type { AnchorCollection, GovernanceConfig, HookProfile } from '@nsb/core';
import { HOOK_PROFILE_BY_GOVERNANCE } from '@nsb/core';
import {
  describeHookProfile,
  formatBudgets,
  formatPermissions,
  formatThresholds,
  summarizeAnchors,
} from '../utils/format';

const formatFactors = (config: GovernanceConfig) =>
  Object.entries(config.confidence.factors)
    .map(([key, factor]) => `- ${key}: ${factor.description ?? 'score 1-5'}`)
    .join('\n');

export const resolveHookProfile = (config: GovernanceConfig): HookProfile =>
  config.hooks?.profile ?? HOOK_PROFILE_BY_GOVERNANCE[config.governance.profile] ?? 'standard';

/**
 * The single source of truth for every generated instruction file
 * (CLAUDE.md, AGENTS.md, Cursor rules, SKILL.md). Each per-tool generator only
 * prepends a tool-specific header; the body below is byte-identical across tools.
 */
export const buildInstructionBody = (config: GovernanceConfig, anchors: AnchorCollection) => {
  const thresholds = formatThresholds(config.confidence.thresholds);
  const anchorSummary = summarizeAnchors(anchors);
  const factors = formatFactors(config);
  const hookProfile = resolveHookProfile(config);
  const hookRules = describeHookProfile(hookProfile)
    .map((rule) => `- ${rule}`)
    .join('\n');
  const budgets = formatBudgets(config.budgets);
  const permissions = formatPermissions(config.permissions);
  const autonomyLevel = config.autonomy?.default_level;
  const escalations = config.autonomy?.escalation_paths ?? [];

  const sections: string[] = [];

  sections.push(
    `You are operating under the North Star Build governance system (MBF-GS), profile "${config.governance.profile}".`,
  );

  sections.push(
    `## Before any action
1) Score each confidence factor (1-5).
2) Apply anchor adjustments for risky paths or content.
3) Calculate final confidence and choose the action per the autonomy rules below.`,
  );

  sections.push(`## Confidence factors
${factors}

Thresholds: ${thresholds}`);

  sections.push(`## Risk anchors
Anchors loaded: ${anchorSummary}

If any anchor triggers OR confidence is below "low", request explicit approval before changing files.
Never overwrite existing project files without confirmation unless the user explicitly says "force".`);

  sections.push(`## Hook profile: ${hookProfile}
${hookRules}`);

  if (autonomyLevel != null || escalations.length > 0) {
    const esc = escalations.map((e) => `- when ${e.condition} -> ${e.action}`).join('\n');
    sections.push(
      [`## Autonomy`, `Default level: ${autonomyLevel ?? 'unset'}`, esc].filter(Boolean).join('\n'),
    );
  }

  if (budgets) {
    sections.push(`## Budgets
${budgets}

If a budget is exceeded, stop and ask before continuing.`);
  }

  if (permissions.length > 0) {
    sections.push(`## Permissions
${permissions.map((line) => `- ${line}`).join('\n')}

Least privilege by default. Do not use skip-permissions / "dangerously skip" modes.`);
  }

  sections.push(`## Required output before changes
CONFIDENCE ASSESSMENT
- Base score (weighted factors)
- Anchor adjustments
- Final confidence + level
- Recommendation`);

  return `${sections.join('\n\n')}\n`;
};
