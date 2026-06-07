import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { buildInstructionBody } from './instruction-base';

export const generateGeminiMd = (config: GovernanceConfig, anchors: AnchorCollection) =>
  `# North Star Build (Gemini CLI)\n\n${buildInstructionBody(config, anchors)}`;
