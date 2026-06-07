import { describe, expect, it } from 'vitest';
import { evaluateChange, matchAnchors, scoreEval } from '@nsb/core';
import { getBuiltInAnchors } from '@nsb/anchors';
import { DEFAULT_FIXTURES } from '../../src/evals/fixtures';

const anchors = getBuiltInAnchors();
const verdictOf = (path: string, content?: string) =>
  evaluateChange(matchAnchors(anchors, [{ path, content }]), 'strict').verdict;

describe('default governance fixtures (strict)', () => {
  const cases = DEFAULT_FIXTURES.map((f) => ({
    name: f.name,
    expected: f.expect,
    actual: verdictOf(f.path, f.content),
  }));
  const score = scoreEval(cases);

  it('classifies all fixtures correctly (100% accuracy)', () => {
    expect(score.accuracy).toBe(1);
  });

  it('has zero false negatives (no risky fixture slips through)', () => {
    expect(score.falseNegatives).toBe(0);
  });

  it('has zero false positives (no safe fixture wrongly blocked)', () => {
    expect(score.falsePositives).toBe(0);
  });

  // Per-fixture cases localize any future regression.
  for (const fixture of DEFAULT_FIXTURES) {
    it(`${fixture.name} → ${fixture.expect}`, () => {
      expect(verdictOf(fixture.path, fixture.content)).toBe(fixture.expect);
    });
  }
});
