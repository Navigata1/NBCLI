import type { AnchorCollection, ConfidenceThresholds } from '@nsb/core';

export const formatThresholds = (thresholds: ConfidenceThresholds) =>
  `High >= ${thresholds.high.toFixed(2)} | Medium >= ${thresholds.medium.toFixed(2)} | Low >= ${thresholds.low.toFixed(2)} | Uncertain < ${thresholds.low.toFixed(2)}`;

export const summarizeAnchors = (anchors: AnchorCollection) => {
  const entries = Object.entries(anchors).map(
    ([category, rules]) => `${category} (${rules.length})`,
  );
  return entries.length > 0 ? entries.join(', ') : 'none';
};
