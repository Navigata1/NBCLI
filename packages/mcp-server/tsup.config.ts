import { defineConfig } from 'tsup';

// Two entries:
//  - index: the library (CJS + d.ts)
//  - mcp-cli: the `nsb-mcp` bin (stdio MCP server) with a shebang
// The MCP SDK (ESM) is bundled in (noExternal) so the output runs on Node >=22
// without relying on require(ESM).
export default defineConfig([
  {
    entry: { index: 'src/index.ts' },
    format: ['cjs'],
    dts: true,
    noExternal: [/@modelcontextprotocol\/sdk/],
  },
  {
    entry: { 'mcp-cli': 'src/mcp-cli.ts' },
    format: ['cjs'],
    dts: false,
    banner: { js: '#!/usr/bin/env node' },
    noExternal: [/@modelcontextprotocol\/sdk/],
  },
]);
