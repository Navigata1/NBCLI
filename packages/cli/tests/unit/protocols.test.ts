import { describe, expect, it } from 'vitest';
import { buildMcpHostConfig, buildMemoryBackendConfig, buildProtocolsGuide } from '../../src/commands/protocols';

describe('protocols scaffolding builders', () => {
  it('mcp host config wires nsb-mcp', () => {
    const m = JSON.parse(buildMcpHostConfig());
    expect(m.mcpServers['north-star'].command).toBe('nsb-mcp');
  });

  it('memory backend exposes the 4 NBB memory types (local-json default)', () => {
    const m = JSON.parse(buildMemoryBackendConfig());
    expect(Object.keys(m.types).sort()).toEqual(['episodic', 'procedural', 'semantic', 'working']);
    expect(m.backend).toBe('local-json');
    expect(m.types.working.persisted).toBe(false);
    expect(m.types.semantic.persisted).toBe(true);
  });

  it('guide covers the 5 interop layers + is honest about emit-not-runtime', () => {
    const g = buildProtocolsGuide();
    for (const layer of ['MCP', 'ACP', 'A2A', 'AG-UI', 'A2UI']) expect(g).toContain(layer);
    expect(g).toContain('does not implement');
    expect(g).toContain('VIA MCP');
  });
});
