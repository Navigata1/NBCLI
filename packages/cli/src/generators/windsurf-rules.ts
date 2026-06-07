import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { buildInstructionBody } from './instruction-base';

export const generateWindsurfRules = (config: GovernanceConfig, anchors: AnchorCollection) =>
  `# North Star Build (Windsurf)\n\n${buildInstructionBody(config, anchors)}`;
