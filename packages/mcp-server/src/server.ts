import http from 'http';
import { checkConfidence } from './tools/check-confidence';
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
    const payload = raw ? JSON.parse(raw) : {};

    if (req.url === '/check-confidence') {
      sendJson(res, 200, checkConfidence(payload));
      return;
    }

    if (req.url === '/verify-autonomy') {
      const { score, thresholds } = payload;
      sendJson(res, 200, verifyAutonomy(score, thresholds));
      return;
    }

    if (req.url === '/log-decision') {
      sendJson(res, 200, logDecision(payload));
      return;
    }

    sendJson(res, 404, { error: 'Unknown endpoint' });
  });

  server.listen(port, () => {
    console.log(`NSB MCP server listening on ${port}`);
  });

  return server;
};
