import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { buildInstructionBody } from './instruction-base';

export const generateCursorRules = (config: GovernanceConfig, anchors: AnchorCollection) => {
  const body = buildInstructionBody(config, anchors);
  return `---\ndescription: North Star Build governance rules\n---\n\n# North Star Build (Cursor)\n\n${body}`;
};
