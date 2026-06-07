import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { buildInstructionBody } from './instruction-base';

export const generateAiderConventions = (config: GovernanceConfig, anchors: AnchorCollection) =>
  `# North Star Build (Aider CONVENTIONS)\n\n${buildInstructionBody(config, anchors)}`;
