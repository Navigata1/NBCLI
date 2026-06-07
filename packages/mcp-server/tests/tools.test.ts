import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, readFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { verifyLedger } from '@nsb/core';
import { checkConfidence } from '../src/tools/check-confidence';
import { verifyAutonomy } from '../src/tools/verify-autonomy';
import { logDecision } from '../src/tools/log-decision';
import { MCP_SERVER_VERSION, MCP_TOOLS, callTool, createMcpServer } from '../src/mcp';

const config: GovernanceConfig = {
  version: '1.0',
  governance: { profile: 'professional' },
  confidence: {
    factors: { clarity: { weight: 1 } },
    thresholds: { high: 0.8, medium: 0.5, low: 0.3, uncertain: 0 },
  },
};
const anchors: AnchorCollection = {
  security: [{ id: 'env', patterns: ['.env'], adjustment: -0.45, reason: 'secrets', target: 'path' }],
};

describe('governance tool functions', () => {
  it('check_confidence returns a full assessment', () => {
    const result = checkConfidence({
      config,
      anchors,
      factorScores: { clarity: 5 },
      targets: [{ path: 'src/app.ts', content: '' }],
    });
    expect(result.finalScore).toBeGreaterThan(0);
    expect(['high', 'medium', 'low', 'uncertain']).toContain(result.level);
  });

  it('verify_autonomy gates by threshold', () => {
    expect(verifyAutonomy(0.9, config.confidence.thresholds).allow).toBe(true);
    expect(verifyAutonomy(0.1, config.confidence.thresholds).allow).toBe(false);
  });
});

describe('log_decision persistence', () => {
  let dir: string;
  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'nbcli-mcp-'));
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it('echoes (persisted:false) with no ledger', () => {
    const result = logDecision({ summary: 'x' });
    expect(result.persisted).toBe(false);
  });

  it('appends a sealed entry to the ledger and the chain verifies', () => {
    const ledgerFile = path.join(dir, 'runs.jsonl');
    const result = logDecision({ summary: 'shipped change', actor: 'opus-4-8' }, { ledgerFile });
    expect(result.persisted).toBe(true);
    expect(result.seq).toBe(0);
    expect(result.hash).toMatch(/^[0-9a-f]{64}$/);
    expect(verifyLedger(ledgerFile).valid).toBe(true);
  });
});

describe('MCP server wiring', () => {
  it('exposes exactly the three governance tools', () => {
    expect(MCP_TOOLS.map((t) => t.name).sort()).toEqual([
      'check_confidence',
      'log_decision',
      'verify_autonomy',
    ]);
  });

  it('callTool dispatches to verify_autonomy', () => {
    const result = callTool('verify_autonomy', {
      score: 0.9,
      thresholds: config.confidence.thresholds,
    }) as { allow: boolean };
    expect(result.allow).toBe(true);
  });

  it('callTool throws on unknown tool', () => {
    expect(() => callTool('nope', {})).toThrow(/Unknown tool/);
  });

  it('createMcpServer builds without connecting', () => {
    expect(createMcpServer()).toBeTruthy();
  });

  it('MCP_SERVER_VERSION matches package.json (no drift)', () => {
    const pkg = JSON.parse(readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'));
    expect(MCP_SERVER_VERSION).toBe(pkg.version);
  });
});
