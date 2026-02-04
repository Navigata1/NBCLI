import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { formatThresholds, summarizeAnchors } from '../utils/format';

const formatFactors = (config: GovernanceConfig) =>
  Object.entries(config.confidence.factors)
    .map(([key, factor]) => `- ${key}: ${factor.description ?? 'score 1-5'}`)
    .join('\n');

export const buildInstructionBody = (config: GovernanceConfig, anchors: AnchorCollection) => {
  const thresholds = formatThresholds(config.confidence.thresholds);
  const anchorSummary = summarizeAnchors(anchors);
  const factors = formatFactors(config);

  return `You are operating under the North Star Build governance system (MBF-GS).

Before any action:
1) Score each factor (1-5).
2) Apply anchor adjustments for risky paths or content.
3) Calculate final confidence and decide the action.

Factors:
${factors}

Thresholds: ${thresholds}
Anchors loaded: ${anchorSummary}

If any anchor triggers OR confidence is below "low", request explicit approval before changing files.
Never overwrite existing project files without confirmation unless the user explicitly says "force".

Output a confidence assessment before making changes:

CONFIDENCE ASSESSMENT
- Base score (weighted factors)
- Anchor adjustments
- Final confidence + level
- Recommendation
`;
};
