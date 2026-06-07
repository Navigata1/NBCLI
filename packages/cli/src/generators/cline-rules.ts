import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { buildInstructionBody } from './instruction-base';

export const generateClineRules = (config: GovernanceConfig, anchors: AnchorCollection) =>
  `# North Star Build (Cline)\n\n${buildInstructionBody(config, anchors)}`;
