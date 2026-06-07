// @nsb/mcp-server exposes the NorthStar governance tools over TWO transports:
//   - a real MCP server over stdio (createMcpServer / startMcpServer, bin: nsb-mcp)
//   - a legacy plain-HTTP API (startServer) kept for backward compatibility
// Both wrap the same pure tool functions from ./tools/*.
export * from './server';
export * from './mcp';
export * from './tools/check-confidence';
export * from './tools/verify-autonomy';
export * from './tools/log-decision';
