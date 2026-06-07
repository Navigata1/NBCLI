import http from 'http';
import type { ConfidenceThresholds } from '@nsb/core';
import { checkConfidence, type CheckConfidenceInput } from './tools/check-confidence';
import { verifyAutonomy } from './tools/verify-autonomy';
import { logDecision } from './tools/log-decision';

const readBody = async (req: http.IncomingMessage) => {
  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    req.on('error', reject);
  });
};

const sendJson = (res: http.ServerResponse, status: number, body: unknown) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
};

export const startServer = (port = 3333) => {
  const server = http.createServer(async (req, res) => {
    if (!req.url || req.method !== 'POST') {
      sendJson(res, 404, { error: 'Not found' });
      return;
    }

    const raw = await readBody(req);
    let payload: Record<string, unknown>;
    try {
      payload = (raw ? JSON.parse(raw) : {}) as Record<string, unknown>;
    } catch {
      sendJson(res, 400, { error: 'Invalid JSON' });
      return;
    }

    if (req.url === '/check-confidence') {
      sendJson(res, 200, checkConfidence(payload as unknown as CheckConfidenceInput));
      return;
    }

    if (req.url === '/verify-autonomy') {
      sendJson(
        res,
        200,
        verifyAutonomy(payload.score as number, payload.thresholds as ConfidenceThresholds),
      );
      return;
    }

    if (req.url === '/log-decision') {
      sendJson(res, 200, logDecision(payload));
      return;
    }

    sendJson(res, 404, { error: 'Unknown endpoint' });
  });

  // Bind to loopback only — this legacy API is unauthenticated and unencrypted.
  server.listen(port, '127.0.0.1', () => {
    console.log(`NSB HTTP API listening on 127.0.0.1:${port} (loopback only; for MCP, run nsb-mcp)`);
  });

  return server;
};
