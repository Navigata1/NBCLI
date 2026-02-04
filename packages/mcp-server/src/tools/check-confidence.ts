import type { AnchorCollection, AnchorMatchTarget, GovernanceConfig } from '@nsb/core';
import { calculateConfidence, matchAnchors } from '@nsb/core';

export interface CheckConfidenceInput {
  config: GovernanceConfig;
  anchors: AnchorCollection;
  factorScores: Record<string, number>;
  targets: AnchorMatchTarget[];
}

export const checkConfidence = ({
  config,
  anchors,
  factorScores,
  targets,
}: CheckConfidenceInput) => {
  const matches = matchAnchors(anchors, targets);
  return calculateConfidence(factorScores, config.confidence, matches);
};
