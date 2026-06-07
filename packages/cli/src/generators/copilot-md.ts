import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { buildInstructionBody } from './instruction-base';

export const generateCopilotMd = (config: GovernanceConfig, anchors: AnchorCollection) =>
  `# North Star Build (GitHub Copilot)\n\n${buildInstructionBody(config, anchors)}`;
