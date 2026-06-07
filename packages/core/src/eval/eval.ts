import type { EnforcementVerdict } from '../enforce/enforce';

export interface EvalCase {
  name?: string;
  expected: EnforcementVerdict;
  actual: EnforcementVerdict;
}

export interface EvalScore {
  total: number;
  correct: number;
  accuracy: number;
  /** Treating `block` as the positive class. */
  blockPrecision: number;
  blockRecall: number;
  /** Expected block but did NOT block — the dangerous error. */
  falseNegatives: number;
  /** Expected allow/warn but blocked — the noisy error. */
  falsePositives: number;
}

/**
 * Score governance classification against labeled fixtures. Pure + deterministic.
 * `block` is the positive class: false negatives (a risky change that wasn't blocked)
 * are the dangerous error a gate must drive to zero.
 */
export function scoreEval(cases: EvalCase[]): EvalScore {
  const total = cases.length;
  const correct = cases.filter((c) => c.expected === c.actual).length;
  const tp = cases.filter((c) => c.expected === 'block' && c.actual === 'block').length;
  const fp = cases.filter((c) => c.expected !== 'block' && c.actual === 'block').length;
  const fn = cases.filter((c) => c.expected === 'block' && c.actual !== 'block').length;

  return {
    total,
    correct,
    accuracy: total === 0 ? 1 : correct / total,
    blockPrecision: tp + fp === 0 ? 1 : tp / (tp + fp),
    blockRecall: tp + fn === 0 ? 1 : tp / (tp + fn),
    falseNegatives: fn,
    falsePositives: fp,
  };
}
