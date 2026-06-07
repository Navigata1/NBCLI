import type { BudgetConfig } from '../types/config';

export type BudgetStatus = 'ok' | 'warn' | 'exceeded' | 'unset';

export interface CapEvaluation {
  status: BudgetStatus;
  /** Fraction of the cap consumed (0 when no cap). */
  pct: number;
  spent: number;
  cap?: number;
}

/**
 * Evaluate one spend dimension against an optional cap.
 * Pure and deterministic — the building block for `nsb budget` and any
 * cost-cap auto-throttle gate.
 */
export function evaluateCap(spent: number, cap?: number, warnAt = 0.8): CapEvaluation {
  if (cap == null || cap <= 0) {
    return { status: 'unset', pct: 0, spent };
  }
  const pct = spent / cap;
  let status: BudgetStatus = 'ok';
  if (pct >= 1) status = 'exceeded';
  else if (pct >= warnAt) status = 'warn';
  return { status, pct, spent, cap };
}

export interface BudgetEvaluation {
  usd: CapEvaluation;
  tokens: CapEvaluation;
  /** Worst status across dimensions — drives the throttle decision. */
  status: BudgetStatus;
  /** True when any cap is exceeded (auto-throttle should engage). */
  throttle: boolean;
}

const RANK: Record<BudgetStatus, number> = { unset: 0, ok: 1, warn: 2, exceeded: 3 };

/** Evaluate USD + token spend against per-run OR per-project caps. */
export function evaluateBudget(
  spent: { usd: number; tokens: number },
  budget: BudgetConfig | undefined,
  scope: 'run' | 'project' = 'run',
): BudgetEvaluation {
  const warnAt = budget?.warn_at ?? 0.8;
  const usdCap = scope === 'run' ? budget?.per_run_usd : budget?.per_project_usd;
  const tokenCap = scope === 'run' ? budget?.per_run_tokens : budget?.per_project_tokens;
  const usd = evaluateCap(spent.usd, usdCap, warnAt);
  const tokens = evaluateCap(spent.tokens, tokenCap, warnAt);
  const status = RANK[usd.status] >= RANK[tokens.status] ? usd.status : tokens.status;
  return { usd, tokens, status, throttle: status === 'exceeded' };
}
