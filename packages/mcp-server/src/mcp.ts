import path from 'path';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import type { ConfidenceThresholds } from '@nsb/core';
import { checkConfidence, type CheckConfidenceInput } from './tools/check-confidence';
import { verifyAutonomy } from './tools/verify-autonomy';
import { logDecision } from './tools/log-decision';

export const MCP_SERVER_NAME = 'north-star-build';
export const MCP_SERVER_VERSION = '2.10.0';

// Real MCP tool definitions (JSON Schema), wrapping the same pure governance
// functions the legacy HTTP server exposes.
export const MCP_TOOLS = [
  {
    name: 'check_confidence',
    description:
      'Compute an SSAP confidence assessment (base score, anchor adjustments, final level, recommendation) for a proposed change.',
    inputSchema: {
      type: 'object',
      properties: {
        config: { type: 'object', description: 'GovernanceConfig (needs confidence.factors/thresholds)' },
        anchors: { type: 'object', description: 'AnchorCollection (category -> rule[])' },
        factorScores: { type: 'object', description: 'map of factor -> raw 1..5 score' },
        targets: { type: 'array', description: 'AnchorMatchTarget[] ({ path?, content? })' },
      },
      required: ['config', 'anchors', 'factorScores', 'targets'],
    },
  },
  {
    name: 'verify_autonomy',
    description: 'Given a confidence score and thresholds, return the level and whether autonomous execution is allowed.',
    inputSchema: {
      type: 'object',
      properties: {
        score: { type: 'number' },
        thresholds: {
          type: 'object',
          properties: {
            high: { type: 'number' },
            medium: { type: 'number' },
            low: { type: 'number' },
            uncertain: { type: 'number' },
          },
          required: ['high', 'medium', 'low', 'uncertain'],
        },
      },
      required: ['score', 'thresholds'],
    },
  },
  {
    name: 'log_decision',
    description:
      'Append an autonomous decision to the tamper-evident run ledger (.mbf/ledger/runs.jsonl by default, or $NSB_LEDGER).',
    inputSchema: {
      type: 'object',
      properties: {
        summary: { type: 'string' },
        actor: { type: 'string' },
        model: { type: 'string' },
        costUsd: { type: 'number' },
        tokens: { type: 'number' },
        payload: {},
      },
    },
  },
];

function ledgerFile(): string {
  return process.env.NSB_LEDGER ?? path.join(process.cwd(), '.mbf', 'ledger', 'runs.jsonl');
}

/** Dispatch a tool call by name to the underlying pure function. Exported for tests. */
export function callTool(name: string, args: Record<string, unknown>): unknown {
  switch (name) {
    case 'check_confidence':
      return checkConfidence(args as unknown as CheckConfidenceInput);
    case 'verify_autonomy':
      return verifyAutonomy(args.score as number, args.thresholds as ConfidenceThresholds);
    case 'log_decision':
      return logDecision(args, { ledgerFile: ledgerFile() });
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

/** Build a real MCP server (stdio-ready) exposing the 3 governance tools. */
export function createMcpServer(): Server {
  const server = new Server(
    { name: MCP_SERVER_NAME, version: MCP_SERVER_VERSION },
    { capabilities: { tools: {} } },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: MCP_TOOLS }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args = {} } = request.params;
    try {
      const result = callTool(name, args as Record<string, unknown>);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    } catch (err) {
      return { content: [{ type: 'text', text: `Error: ${(err as Error).message}` }], isError: true };
    }
  });

  return server;
}

/** Start the MCP server over stdio. stdout is the protocol channel — log to stderr. */
export async function startMcpServer(): Promise<void> {
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('[nsb-mcp] north-star-build MCP server ready on stdio');
}
