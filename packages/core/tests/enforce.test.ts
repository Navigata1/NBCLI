import { describe, expect, it } from 'vitest';
import type { AnchorMatch } from '../src/types/assessment';
import { evaluateChange } from '../src/enforce';

const secEnforce = (adjustment = -0.4): AnchorMatch => ({
  id: 'env_files',
  reason: 'Environment files contain sensitive configuration',
  adjustment,
  pattern: '.env',
  target: 'path',
  source: 'security',
  enforce: true,
});

const infraEnforce = (adjustment = -0.2): AnchorMatch => ({
  id: 'ci_cd_changes',
  reason: 'CI/CD changes impact release safety',
  adjustment,
  pattern: 'ci.yml',
  target: 'path',
  source: 'infrastructure',
  enforce: true,
});

const advisory = (): AnchorMatch => ({
  id: 'data_exports',
  reason: 'Bulk data export',
  adjustment: -0.2,
  pattern: 'pg_dump',
  target: 'content',
  source: 'data',
  // no enforce -> advisory only
});

describe('evaluateChange', () => {
  it('allows when nothing matches', () => {
    expect(evaluateChange([], 'strict').verdict).toBe('allow');
  });

  it('strict blocks on any ENFORCED match', () => {
    expect(evaluateChange([secEnforce()], 'strict').verdict).toBe('block');
  });

  it('strict only WARNS on advisory-only matches (no false-positive block)', () => {
    expect(evaluateChange([advisory()], 'strict').verdict).toBe('warn');
  });

  it('minimal only warns, even on an enforced match', () => {
    expect(evaluateChange([secEnforce()], 'minimal').verdict).toBe('warn');
  });

  it('standard blocks on an enforced security match', () => {
    expect(evaluateChange([secEnforce(-0.2)], 'standard').verdict).toBe('block');
  });

  it('standard warns on advisory-only matches', () => {
    expect(evaluateChange([advisory()], 'standard').verdict).toBe('warn');
  });

  it('standard blocks when enforced (non-security) total reaches the threshold', () => {
    expect(evaluateChange([infraEnforce(-0.2), infraEnforce(-0.2)], 'standard').verdict).toBe('block');
  });

  it('standard warns on a single low-risk enforced non-security match', () => {
    expect(evaluateChange([infraEnforce(-0.2)], 'standard').verdict).toBe('warn');
  });

  it('reports enforced tag, reasons, and totals', () => {
    const result = evaluateChange([secEnforce(-0.3), advisory()], 'strict');
    expect(result.totalAdjustment).toBeCloseTo(-0.5);
    expect(result.enforceAdjustment).toBeCloseTo(-0.3);
    expect(result.reasons.join('\n')).toContain('(enforced)');
  });
});
