import { describe, expect, it } from 'vitest';
import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { ALL_TOOLS, TOOL_GENERATORS, getGenerator } from '../../src/generators/registry';

const config: GovernanceConfig = {
  version: '1.0',
  governance: { profile: 'professional' },
  confidence: { factors: { c: { weight: 1 } }, thresholds: { high: 0.8, medium: 0.5, low: 0.3, uncertain: 0 } },
};
const anchors: AnchorCollection = {};

describe('portability adapters', () => {
  it('registry exposes all eight adapters with output paths', () => {
    for (const tool of ['claude', 'cursor', 'codex', 'skill', 'windsurf', 'cline', 'gemini', 'copilot']) {
      expect(ALL_TOOLS).toContain(tool);
      expect(getGenerator(tool)?.relPath).toBeTruthy();
    }
  });

  it('every adapter renders from the shared instruction body', () => {
    for (const generator of TOOL_GENERATORS) {
      const out = generator.render(config, anchors);
      expect(out).toContain('Thresholds');
      expect(out).toContain('Anchors loaded');
    }
  });

  it('adapters target their documented file conventions', () => {
    expect(getGenerator('gemini')?.relPath).toBe('GEMINI.md');
    expect(getGenerator('copilot')?.relPath).toContain('copilot-instructions.md');
    expect(getGenerator('windsurf')?.relPath).toContain('.windsurf');
    expect(getGenerator('cline')?.relPath).toContain('.clinerules');
  });
});
