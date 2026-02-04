import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { buildInstructionBody } from './instruction-base';

export const generateAgentsMd = (config: GovernanceConfig, anchors: AnchorCollection) => {
  const body = buildInstructionBody(config, anchors);
  return `# North Star Build (Codex AGENTS)\n\n${body}`;
};
