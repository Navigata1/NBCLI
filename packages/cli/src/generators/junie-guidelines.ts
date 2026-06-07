import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { buildInstructionBody } from './instruction-base';

export const generateJunieGuidelines = (config: GovernanceConfig, anchors: AnchorCollection) =>
  `# North Star Build (JetBrains Junie)\n\n${buildInstructionBody(config, anchors)}`;
