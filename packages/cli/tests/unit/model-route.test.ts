import { describe, expect, it } from 'vitest';
import {
  CHEAP_MODEL,
  ORCHESTRATOR_MODEL,
  SUBTASK_MODEL,
  recommendRoute,
} from '../../src/commands/model-route';

describe('recommendRoute', () => {
  it('routes planning / high-risk / low-confidence to the orchestrator with deep effort', () => {
    const d = recommendRoute({ kind: 'plan', risk: 'high', confidence: 'uncertain' });
    expect(d.model).toBe(ORCHESTRATOR_MODEL);
    expect(d.effort).toBe('ultracode');
    expect(d.fast).toBe(false);
  });

  it('routes review to the orchestrator', () => {
    expect(recommendRoute({ kind: 'review', risk: 'low', confidence: 'high' }).model).toBe(
      ORCHESTRATOR_MODEL,
    );
  });

  it('routes low-risk high-confidence routine to a cheaper model with fast mode', () => {
    const d = recommendRoute({ kind: 'implement', risk: 'low', confidence: 'high' });
    expect(d.model).toBe(CHEAP_MODEL);
    expect(d.fast).toBe(true);
  });

  it('routes a standard implementation subtask to the mid tier', () => {
    expect(recommendRoute({ kind: 'implement', risk: 'medium', confidence: 'medium' }).model).toBe(
      SUBTASK_MODEL,
    );
  });

  it('honours routing overrides from config', () => {
    const d = recommendRoute(
      { kind: 'plan', risk: 'low', confidence: 'high' },
      { orchestrator: 'custom-orchestrator' },
    );
    expect(d.model).toBe('custom-orchestrator');
  });

  it('cheap tier does NOT leak a custom subtask override (regression)', () => {
    const d = recommendRoute({ kind: 'chat', risk: 'low', confidence: 'high' }, { subtask: 'custom-mid' });
    expect(d.model).toBe(CHEAP_MODEL);
  });

  it('honours an explicit cheap model override', () => {
    const d = recommendRoute({ kind: 'implement', risk: 'low', confidence: 'high' }, { cheap: 'my-cheap' });
    expect(d.model).toBe('my-cheap');
  });
});
