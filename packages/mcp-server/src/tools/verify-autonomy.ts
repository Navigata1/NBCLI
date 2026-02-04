import type { ConfidenceLevel, ConfidenceThresholds } from '@nsb/core';

export const resolveLevel = (score: number, thresholds: ConfidenceThresholds): ConfidenceLevel => {
  if (score >= thresholds.high) return 'high';
  if (score >= thresholds.medium) return 'medium';
  if (score >= thresholds.low) return 'low';
  return 'uncertain';
};

export const verifyAutonomy = (score: number, thresholds: ConfidenceThresholds) => {
  const level = resolveLevel(score, thresholds);
  const allow = level === 'high' || level === 'medium';
  return { level, allow };
};
