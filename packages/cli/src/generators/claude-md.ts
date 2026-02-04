import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { buildInstructionBody } from './instruction-base';

export const generateClaudeMd = (config: GovernanceConfig, anchors: AnchorCollection) => {
  const body = buildInstructionBody(config, anchors);
  return `# North Star Build (Claude Code)\n\n${body}`;
};
