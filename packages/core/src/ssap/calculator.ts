import type { ConfidenceConfig } from '../types/config';
import type { AnchorMatch, ConfidenceAssessment, ConfidenceLevel, FactorScore } from '../types/assessment';

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const normalizeScore = (score: number) => clamp((score - 1) / 4);

const levelFromScore = (score: number, thresholds: ConfidenceConfig['thresholds']): ConfidenceLevel => {
  if (score >= thresholds.high) return 'high';
  if (score >= thresholds.medium) return 'medium';
  if (score >= thresholds.low) return 'low';
  return 'uncertain';
};

const recommendationFromLevel = (level: ConfidenceLevel) => {
  switch (level) {
    case 'high':
      return 'Execute autonomously.';
    case 'medium':
      return 'Proceed with quick review.';
    case 'low':
      return 'Require structured approval.';
    default:
      return 'Clarify requirements before acting.';
  }
};

export const calculateConfidence = (
  factorScores: Record<string, number>,
  config: ConfidenceConfig,
  anchorMatches: AnchorMatch[] = [],
): ConfidenceAssessment => {
  const factors: FactorScore[] = [];
  let weightedSum = 0;
  let totalWeight = 0;

  for (const [key, definition] of Object.entries(config.factors)) {
    const rawScore = typeof factorScores[key] === 'number' ? factorScores[key] : 3;
    const normalized = normalizeScore(rawScore);
    const weight = definition.weight ?? 0;

    weightedSum += normalized * weight;
    totalWeight += weight;

    factors.push({
      key,
      score: rawScore,
      weight,
      normalized,
      reason: typeof factorScores[key] === 'number' ? undefined : 'Defaulted to 3/5.',
    });
  }

  const baseScore = totalWeight > 0 ? clamp(weightedSum / totalWeight) : 0;
  const anchorAdjustment = anchorMatches.reduce((sum, match) => sum + match.adjustment, 0);
  const finalScore = clamp(baseScore + anchorAdjustment);
  const level = levelFromScore(finalScore, config.thresholds);

  return {
    baseScore,
    anchorAdjustment,
    finalScore,
    level,
    factors,
    anchors: anchorMatches,
    recommendation: recommendationFromLevel(level),
  };
};
