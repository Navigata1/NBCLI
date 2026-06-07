import { startMcpServer } from './mcp';

startMcpServer().catch((error) => {
  console.error('[nsb-mcp] failed to start:', error);
  process.exit(1);
});
