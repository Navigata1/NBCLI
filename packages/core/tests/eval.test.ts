import { describe, expect, it } from 'vitest';
import { scoreEval } from '../src/eval';

describe('scoreEval', () => {
  it('a perfect run: accuracy 1, no false negatives/positives', () => {
    const s = scoreEval([
      { expected: 'block', actual: 'block' },
      { expected: 'allow', actual: 'allow' },
      { expected: 'warn', actual: 'warn' },
    ]);
    expect(s.accuracy).toBe(1);
    expect(s.blockPrecision).toBe(1);
    expect(s.blockRecall).toBe(1);
    expect(s.falseNegatives).toBe(0);
    expect(s.falsePositives).toBe(0);
  });

  it('counts a false negative (risky change not blocked)', () => {
    const s = scoreEval([{ expected: 'block', actual: 'allow' }]);
    expect(s.falseNegatives).toBe(1);
    expect(s.blockRecall).toBe(0);
    expect(s.accuracy).toBe(0);
  });

  it('counts a false positive (safe change blocked)', () => {
    const s = scoreEval([
      { expected: 'allow', actual: 'block' },
      { expected: 'block', actual: 'block' },
    ]);
    expect(s.falsePositives).toBe(1);
    expect(s.blockPrecision).toBeCloseTo(0.5);
    expect(s.blockRecall).toBe(1);
  });

  it('empty set scores as perfect (vacuously)', () => {
    expect(scoreEval([]).accuracy).toBe(1);
  });
});
