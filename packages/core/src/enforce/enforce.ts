import type { HookProfile } from '../types/config';
import type { AnchorMatch } from '../types/assessment';

export type EnforcementVerdict = 'allow' | 'warn' | 'block';

export interface EnforcementResult {
  verdict: EnforcementVerdict;
  matches: AnchorMatch[];
  /** Matches whose rule is block-worthy (`enforce: true`). */
  enforceMatches: AnchorMatch[];
  reasons: string[];
  totalAdjustment: number;
  enforceAdjustment: number;
}

/** Cumulative enforced adjustment at/below this (standard profile) is high-risk. */
export const STANDARD_BLOCK_THRESHOLD = -0.4;

/**
 * Deterministic enforcement decision from matched anchors + hook profile. This
 * is what turns "advisory" governance into an ENFORCED gate: callers (the git
 * pre-commit hook, the Claude Code PreToolUse hook, CI) block when
 * `verdict === 'block'`.
 *
 * Only **enforced** anchors (`enforce: true`) can cause a block — so ordinary
 * code that merely trips an advisory anchor is never blocked, only flagged:
 *
 * - minimal:  never blocks — warn only.
 * - standard: blocks on an enforced security-category match OR enforced total <= -0.40.
 * - strict:   blocks on ANY enforced match.
 *
 * Advisory-only matches (no enforced match present) downgrade to `warn`.
 */
export function evaluateChange(matches: AnchorMatch[], profile: HookProfile): EnforcementResult {
  const totalAdjustment = matches.reduce((sum, m) => sum + m.adjustment, 0);
  const enforceMatches = matches.filter((m) => m.enforce);
  const enforceAdjustment = enforceMatches.reduce((sum, m) => sum + m.adjustment, 0);
  const reasons = matches.map(
    (m) =>
      `${m.source ?? 'anchor'}/${m.id} [${m.target}]${m.enforce ? ' (enforced)' : ''} ${m.reason} (${m.adjustment})`,
  );

  if (matches.length === 0) {
    return { verdict: 'allow', matches, enforceMatches, reasons, totalAdjustment, enforceAdjustment };
  }

  let verdict: EnforcementVerdict;
  if (profile === 'minimal' || enforceMatches.length === 0) {
    verdict = 'warn';
  } else if (profile === 'strict') {
    verdict = 'block';
  } else {
    const hasSecurityEnforce = enforceMatches.some((m) => m.source === 'security');
    verdict =
      hasSecurityEnforce || enforceAdjustment <= STANDARD_BLOCK_THRESHOLD ? 'block' : 'warn';
  }

  return { verdict, matches, enforceMatches, reasons, totalAdjustment, enforceAdjustment };
}
