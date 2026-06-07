import { describe, expect, it } from 'vitest';
import { buildSandboxArgs } from '../../src/commands/sandbox';
import { buildWorkflowPlan, validateWorkflowPlan } from '../../src/commands/workflow';

describe('buildSandboxArgs', () => {
  it('disables network by default and mounts the cwd at /work', () => {
    const args = buildSandboxArgs({ image: 'img', cmd: ['echo', 'hi'], cwd: '/repo' });
    expect(args).toContain('--network');
    expect(args).toContain('none');
    expect(args.join(' ')).toContain('/repo:/work');
    expect(args.join(' ')).toContain('-w /work');
    expect(args.slice(-2)).toEqual(['echo', 'hi']);
  });

  it('--allow-network omits the network lockdown', () => {
    expect(buildSandboxArgs({ image: 'img', cmd: ['x'], cwd: '/r', allowNetwork: true })).not.toContain('none');
  });

  it('applies memory/cpu limits when given', () => {
    const args = buildSandboxArgs({ image: 'i', cmd: ['x'], cwd: '/r', memory: '512m', cpus: '1' });
    expect(args).toContain('512m');
    expect(args).toContain('1');
  });
});

describe('validateWorkflowPlan', () => {
  it('accepts a generated plan', () => {
    expect(validateWorkflowPlan(buildWorkflowPlan('review', 'goal')).valid).toBe(true);
  });

  it('rejects a non-object and missing fields', () => {
    expect(validateWorkflowPlan(null).valid).toBe(false);
    const result = validateWorkflowPlan({ name: 'x' });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('rejects concurrency_cap > total_agent_cap', () => {
    const result = validateWorkflowPlan({
      name: 'n',
      goal: 'g',
      concurrency_cap: 10,
      total_agent_cap: 5,
      stages: [{ id: 'a', description: 'd', input: '', output: '', parallel: true, adversarial_verify: false }],
    });
    expect(result.valid).toBe(false);
    expect(result.errors.join(' ')).toContain('concurrency_cap');
  });
});
