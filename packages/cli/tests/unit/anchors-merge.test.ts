import { describe, expect, it } from 'vitest';
import { mergeAnchors, formatMergeDiff } from '../../src/utils/anchors';
import type { AnchorCollection } from '@nsb/core';

describe('mergeAnchors', () => {
  it('returns built-in anchors when custom is empty', () => {
    const builtIn: AnchorCollection = {
      security: [
        { id: 'auth', patterns: ['/auth/'], adjustment: -0.3, reason: 'Auth', target: 'path' },
      ],
    };
    const custom: AnchorCollection = {};

    const result = mergeAnchors(builtIn, custom);

    expect(result.merged).toEqual(builtIn);
    expect(result.added).toEqual([]);
    expect(result.overridden).toEqual([]);
  });

  it('adds new custom anchor to existing category', () => {
    const builtIn: AnchorCollection = {
      security: [
        { id: 'auth', patterns: ['/auth/'], adjustment: -0.3, reason: 'Auth', target: 'path' },
      ],
    };
    const custom: AnchorCollection = {
      security: [
        { id: 'custom-sec', patterns: ['/admin/'], adjustment: -0.5, reason: 'Admin', target: 'path' },
      ],
    };

    const result = mergeAnchors(builtIn, custom);

    expect(result.merged.security).toHaveLength(2);
    expect(result.merged.security?.find((r) => r.id === 'custom-sec')).toBeDefined();
    expect(result.added).toHaveLength(1);
    expect(result.added[0].id).toBe('custom-sec');
    expect(result.overridden).toHaveLength(0);
  });

  it('adds new custom anchor to new category', () => {
    const builtIn: AnchorCollection = {
      security: [
        { id: 'auth', patterns: ['/auth/'], adjustment: -0.3, reason: 'Auth', target: 'path' },
      ],
    };
    const custom: AnchorCollection = {
      custom: [
        { id: 'my-anchor', patterns: ['/special/'], adjustment: -0.2, reason: 'Special', target: 'path' },
      ],
    };

    const result = mergeAnchors(builtIn, custom);

    expect(result.merged.custom).toHaveLength(1);
    expect(result.merged.custom?.[0].id).toBe('my-anchor');
    expect(result.added).toHaveLength(1);
    expect(result.overridden).toHaveLength(0);
  });

  it('overrides existing anchor with same ID', () => {
    const builtIn: AnchorCollection = {
      security: [
        { id: 'auth', patterns: ['/auth/'], adjustment: -0.3, reason: 'Auth', target: 'path' },
      ],
    };
    const custom: AnchorCollection = {
      security: [
        { id: 'auth', patterns: ['/auth/', '/login/'], adjustment: -0.5, reason: 'Custom Auth', target: 'path' },
      ],
    };

    const result = mergeAnchors(builtIn, custom);

    expect(result.merged.security).toHaveLength(1);
    expect(result.merged.security?.[0].adjustment).toBe(-0.5);
    expect(result.merged.security?.[0].reason).toBe('Custom Auth');
    expect(result.overridden).toHaveLength(1);
    expect(result.overridden[0].id).toBe('auth');
    expect(result.added).toHaveLength(0);
  });

  it('overrides anchor even if custom is in different category', () => {
    const builtIn: AnchorCollection = {
      security: [
        { id: 'auth', patterns: ['/auth/'], adjustment: -0.3, reason: 'Auth', target: 'path' },
      ],
    };
    const custom: AnchorCollection = {
      custom: [
        { id: 'auth', patterns: ['/auth/', '/sso/'], adjustment: -0.6, reason: 'SSO Auth', target: 'path' },
      ],
    };

    const result = mergeAnchors(builtIn, custom);

    expect(result.merged.security?.[0].adjustment).toBe(-0.6);
    expect(result.merged.security?.[0].reason).toBe('SSO Auth');
    expect(result.overridden).toHaveLength(1);
    expect(result.added).toHaveLength(0);
  });

  it('merges multiple categories', () => {
    const builtIn: AnchorCollection = {
      security: [
        { id: 'auth', patterns: ['/auth/'], adjustment: -0.3, reason: 'Auth', target: 'path' },
      ],
      infrastructure: [
        { id: 'k8s', patterns: ['*.yaml'], adjustment: -0.2, reason: 'K8s', target: 'path' },
      ],
      data: [
        { id: 'pii', patterns: ['ssn', 'credit_card'], adjustment: -0.4, reason: 'PII', target: 'content' },
      ],
    };
    const custom: AnchorCollection = {
      security: [
        { id: 'auth', patterns: ['/auth/'], adjustment: -0.5, reason: 'Custom Auth', target: 'path' },
      ],
      testing: [
        { id: 'e2e', patterns: ['*.spec.ts'], adjustment: 0.1, reason: 'E2E test', target: 'path' },
      ],
      custom: [
        { id: 'my-rule', patterns: ['/special/'], adjustment: -0.1, reason: 'My rule', target: 'path' },
      ],
    };

    const result = mergeAnchors(builtIn, custom);

    expect(Object.keys(result.merged)).toContain('security');
    expect(Object.keys(result.merged)).toContain('infrastructure');
    expect(Object.keys(result.merged)).toContain('data');
    expect(Object.keys(result.merged)).toContain('testing');
    expect(Object.keys(result.merged)).toContain('custom');

    expect(result.merged.security?.[0].reason).toBe('Custom Auth');
    expect(result.merged.testing).toHaveLength(1);
    expect(result.merged.custom).toHaveLength(1);

    expect(result.overridden).toHaveLength(1);
    expect(result.added).toHaveLength(2);
  });
});

describe('formatMergeDiff', () => {
  it('shows no changes message when empty', () => {
    const result = { merged: {}, added: [], overridden: [] };
    const output = formatMergeDiff(result);
    expect(output).toContain('No custom anchors to merge');
  });

  it('shows added anchors', () => {
    const result = {
      merged: {},
      added: [{ id: 'new-anchor', patterns: [], adjustment: 0, reason: 'New', target: 'any' as const }],
      overridden: [],
    };
    const output = formatMergeDiff(result);
    expect(output).toContain('Added anchors');
    expect(output).toContain('new-anchor');
  });

  it('shows overridden anchors', () => {
    const result = {
      merged: {},
      added: [],
      overridden: [{ id: 'auth', patterns: [], adjustment: 0, reason: 'Custom Auth', target: 'any' as const }],
    };
    const output = formatMergeDiff(result);
    expect(output).toContain('Overridden anchors');
    expect(output).toContain('auth');
  });
});
