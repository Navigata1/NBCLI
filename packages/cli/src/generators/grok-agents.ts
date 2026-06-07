import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { buildInstructionBody } from './instruction-base';

// xAI Grok Build reads AGENTS.md (+ MCP/hooks/skills) natively — there is no
// bespoke "GROK.md". This adapter targets AGENTS.md so `--tools grok` is a
// first-class selection; when codex is also enabled the writer de-dupes the
// shared AGENTS.md (one file, both tools served).
export const generateGrokAgents = (config: GovernanceConfig, anchors: AnchorCollection) =>
  `# North Star Build (Grok Build — reads AGENTS.md)\n\n${buildInstructionBody(config, anchors)}`;
