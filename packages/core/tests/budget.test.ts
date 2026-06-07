import { describe, expect, it } from 'vitest';
import { evaluateBudget, evaluateCap } from '../src/budget';

describe('evaluateCap', () => {
  it('is unset when no cap', () => {
    expect(evaluateCap(100).status).toBe('unset');
    expect(evaluateCap(100, 0).status).toBe('unset');
  });

  it('is ok below the warn threshold', () => {
    expect(evaluateCap(5, 10, 0.8).status).toBe('ok');
  });

  it('warns at the warn threshold', () => {
    const r = evaluateCap(8, 10, 0.8);
    expect(r.status).toBe('warn');
    expect(r.pct).toBeCloseTo(0.8);
  });

  it('is exceeded at or above the cap', () => {
    expect(evaluateCap(10, 10).status).toBe('exceeded');
    expect(evaluateCap(11, 10).status).toBe('exceeded');
  });
});

describe('evaluateBudget', () => {
  it('returns unset/ok with no budget and no throttle', () => {
    const r = evaluateBudget({ usd: 1, tokens: 1000 }, undefined);
    expect(r.status).toBe('unset');
    expect(r.throttle).toBe(false);
  });

  it('takes the worst status across dimensions', () => {
    const r = evaluateBudget(
      { usd: 1, tokens: 9999 },
      { per_run_usd: 100, per_run_tokens: 10000, warn_at: 0.8 },
      'run',
    );
    expect(r.usd.status).toBe('ok');
    expect(r.tokens.status).toBe('warn');
    expect(r.status).toBe('warn');
    expect(r.throttle).toBe(false);
  });

  it('engages throttle when a cap is exceeded', () => {
    const r = evaluateBudget({ usd: 150, tokens: 0 }, { per_run_usd: 100 }, 'run');
    expect(r.status).toBe('exceeded');
    expect(r.throttle).toBe(true);
  });

  it('uses project caps in project scope', () => {
    const r = evaluateBudget({ usd: 50, tokens: 0 }, { per_project_usd: 40 }, 'project');
    expect(r.usd.status).toBe('exceeded');
  });
});
