import { describe, expect, it } from 'vitest';
import { buildWorkflowPlan } from '../../src/commands/workflow';

describe('buildWorkflowPlan', () => {
  it('produces bounded caps and an adversarial-verify stage', () => {
    const plan = buildWorkflowPlan('review', 'Review the diff');
    expect(plan.concurrency_cap).toBeGreaterThan(0);
    expect(plan.total_agent_cap).toBeGreaterThanOrEqual(plan.concurrency_cap);
    expect(plan.keep_plan_out_of_context).toBe(true);
    expect(plan.stages.some((s) => s.adversarial_verify)).toBe(true);
    expect(plan.stages.every((s) => s.input && s.output)).toBe(true);
  });
});
