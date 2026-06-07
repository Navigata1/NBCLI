import { Command } from 'commander';
import path from 'path';
import { mkdirSync, writeFileSync } from 'fs';
import { log } from '../utils/logger';
import { printMini } from '../utils/banner';
import { colors } from '../utils/theme';

/**
 * Interop-protocol + memory scaffolding (NBB `docs/protocols/`). NBCLI EMITS the
 * wiring/config + guidance; it does not implement A2A/AG-UI/A2UI/ACP runtimes.
 * ACP/IDE hosts (Zed, JetBrains) reach NBCLI's governance via its MCP server.
 */

/** MCP host config — wires `nsb-mcp` into any MCP/ACP-compatible host. */
export function buildMcpHostConfig(): string {
  return `${JSON.stringify({ mcpServers: { 'north-star': { command: 'nsb-mcp' } } }, null, 2)}\n`;
}

/** Swappable agent-memory backend interface (NBB MEMORY_BACKEND.md: Working/Episodic/Semantic/Procedural). */
export function buildMemoryBackendConfig(): string {
  return `${JSON.stringify(
    {
      backend: 'local-json',
      note: 'Swappable agent-memory backend (NBB docs/protocols/MEMORY_BACKEND.md). Working memory is per-session; Episodic/Semantic/Procedural persist across harnesses. Swap `backend` to plug a different store.',
      types: {
        working: { holds: 'current task active context', lifetime: 'session', persisted: false },
        episodic: { holds: 'events/decisions/outcomes', lifetime: 'across-sessions', persisted: true },
        semantic: { holds: 'durable project/user facts', lifetime: 'long-lived', persisted: true },
        procedural: { holds: 'learned how-to / playbooks', lifetime: 'long-lived', persisted: true },
      },
      'local-json': { path: '.mbf/memory/store.json' },
    },
    null,
    2,
  )}\n`;
}

/** Protocol guidance (the 5 interop layers) — emitted-guidance, honest about runtime vs emit. */
export function buildProtocolsGuide(): string {
  return `# Interop protocols + memory (emitted from NBB doctrine)

> NBCLI EMITS this wiring + guidance; it does not implement A2A/AG-UI/A2UI/ACP runtimes. Source of
> truth: NBB \`docs/protocols/\` (vendored under \`vendor/nbb/docs/protocols/\`). Pick the smallest set
> that solves the problem; each protocol is surface area to secure.

| Layer | Connects | NBCLI involvement |
|-------|----------|-------------------|
| **MCP** | agent <-> tools/data | REAL: \`nsb-mcp\` server (see \`mcp.json\`); the privilege boundary for NBCLI governance. |
| **ACP** | IDE <-> agent (LSP-style) | Reached VIA MCP: Zed/JetBrains/Kimi-style hosts consume \`nsb-mcp\` through \`mcp.json\`. NBCLI is a governance/tool provider, not a model-running agent. |
| **A2A** | agent <-> agent | Emitted guidance only: keep typed I/O contracts + bounded fan-out (see \`nsb workflow\`). |
| **AG-UI** | agent -> user (event stream) | Emitted guidance only: treat the event stream as interaction design (loading/streaming/error states). |
| **A2UI** | agent -> UI (declarative) | Emitted guidance only: agent references a pre-approved component catalog; deny arbitrary code (safety-floor fit). |

## Memory
Swappable backend interface in \`memory-backend.json\` (Working/Episodic/Semantic/Procedural;
local-JSON default). Working memory is per-session; the rest persist across harnesses.

## Security
Every protocol you enable is a privilege boundary: apply least privilege, validate inputs, treat
external output as untrusted (NBB \`docs/governance/\`). The NBB safety floor in your instruction files applies.
`;
}

const INTEGRATIONS = [
  { file: 'mcp.json', build: buildMcpHostConfig, label: 'MCP host config (wires nsb-mcp)' },
  { file: 'memory-backend.json', build: buildMemoryBackendConfig, label: 'swappable memory backend interface' },
  { file: 'PROTOCOLS.md', build: buildProtocolsGuide, label: 'MCP/ACP/A2A/AG-UI/A2UI guidance' },
];

export const protocolsCommand = new Command('protocols')
  .description('Emit interop-protocol + memory scaffolding (.mbf/integrations) — MCP wiring, memory backend, guidance')
  .argument('[action]', 'emit | list', 'list')
  .action((action: string) => {
    printMini();
    const root = process.cwd();
    const dir = path.resolve(root, '.mbf', 'integrations');

    if (action === 'emit') {
      mkdirSync(dir, { recursive: true });
      for (const { file, build } of INTEGRATIONS) writeFileSync(path.join(dir, file), build());
      log.success(`Emitted ${INTEGRATIONS.length} integration artifacts -> .mbf/integrations/`);
      log.dim('ACP/IDE hosts reach NBCLI governance via the MCP server (mcp.json). A2A/AG-UI/A2UI are guidance.');
      return;
    }

    log.subheader('Interop scaffolding NBCLI emits (`nsb protocols emit`)');
    log.blank();
    INTEGRATIONS.forEach((i) => log.keyValue(`.mbf/integrations/${i.file}`, colors.dim(i.label)));
    log.blank();
    log.dim('NBCLI emits wiring + guidance; it does not run A2A/AG-UI/A2UI/ACP runtimes (honest).');
  });
