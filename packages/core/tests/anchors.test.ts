import { describe, expect, it } from 'vitest';
import { matchAnchors } from '../src/anchors/matcher';
import type { AnchorCollection } from '../src/types/config';

const anchors: AnchorCollection = {
  security: [
    {
      id: 'auth_path',
      patterns: ['/auth/'],
      adjustment: -0.3,
      reason: 'Auth path',
      target: 'path',
    },
  ],
};

describe('matchAnchors', () => {
  it('matches path-based anchors', () => {
    const matches = matchAnchors(anchors, [{ path: 'src/auth/login.ts' }]);
    expect(matches.length).toBe(1);
    expect(matches[0].id).toBe('auth_path');
  });

  it('substring matching is case insensitive', () => {
    const collection: AnchorCollection = {
      test: [{ id: 'sub', patterns: ['AUTH'], adjustment: -0.1, reason: 'Test', target: 'path' }],
    };
    const matches = matchAnchors(collection, [{ path: 'src/auth/login.ts' }]);
    expect(matches.length).toBe(1);
  });

  it('glob matching with *.ts pattern', () => {
    const collection: AnchorCollection = {
      test: [{ id: 'glob_ts', patterns: ['*.ts'], adjustment: -0.1, reason: 'TS files', target: 'path' }],
    };
    const matches = matchAnchors(collection, [{ path: 'file.ts' }]);
    expect(matches.length).toBe(1);
  });

  it('glob matching with **/*.yaml pattern', () => {
    const collection: AnchorCollection = {
      test: [{ id: 'glob_yaml', patterns: ['**/*.yaml'], adjustment: -0.1, reason: 'YAML files', target: 'path' }],
    };
    const matches = matchAnchors(collection, [{ path: 'config/settings.yaml' }]);
    expect(matches.length).toBe(1);
  });

  it('regex matching with /pattern/ syntax', () => {
    const collection: AnchorCollection = {
      test: [{ id: 'regex', patterns: ['/^src\\/.*\\.ts$/'], adjustment: -0.1, reason: 'Regex', target: 'path' }],
    };
    const matches = matchAnchors(collection, [{ path: 'src/utils.ts' }]);
    expect(matches.length).toBe(1);
  });

  it('regex matching with regex: prefix', () => {
    const collection: AnchorCollection = {
      test: [{ id: 'regex_prefix', patterns: ['regex:password'], adjustment: -0.1, reason: 'Regex prefix', target: 'content' }],
    };
    const matches = matchAnchors(collection, [{ path: 'file.ts', content: 'const password = "secret"' }]);
    expect(matches.length).toBe(1);
  });

  it('target: path only matches path', () => {
    const collection: AnchorCollection = {
      test: [{ id: 'path_only', patterns: ['secret'], adjustment: -0.1, reason: 'Path only', target: 'path' }],
    };
    const matches = matchAnchors(collection, [{ path: 'file.ts', content: 'const secret = 1' }]);
    expect(matches.length).toBe(0);
  });

  it('target: content only matches content', () => {
    const collection: AnchorCollection = {
      test: [{ id: 'content_only', patterns: ['secret'], adjustment: -0.1, reason: 'Content only', target: 'content' }],
    };
    const matches = matchAnchors(collection, [{ path: 'file.ts', content: 'const secret = 1' }]);
    expect(matches.length).toBe(1);
    expect(matches[0].target).toBe('content');
  });

  it('target: any (default) matches both path and content', () => {
    const collection: AnchorCollection = {
      test: [{ id: 'any_target', patterns: ['secret'], adjustment: -0.1, reason: 'Any target' }],
    };
    const matches = matchAnchors(collection, [{ path: 'secret.ts', content: 'const secret = 1' }]);
    expect(matches.length).toBe(2);
  });

  it('empty patterns array returns no matches', () => {
    const collection: AnchorCollection = {
      test: [{ id: 'empty', patterns: [], adjustment: -0.1, reason: 'Empty' }],
    };
    const matches = matchAnchors(collection, [{ path: 'file.ts' }]);
    expect(matches.length).toBe(0);
  });

  it('no matching anchors returns empty array', () => {
    const matches = matchAnchors(anchors, [{ path: 'src/utils/helpers.ts' }]);
    expect(matches.length).toBe(0);
  });

  it('multiple matching anchors sum their adjustments', () => {
    const collection: AnchorCollection = {
      security: [
        { id: 'anchor1', patterns: ['auth'], adjustment: -0.2, reason: 'Auth', target: 'path' },
        { id: 'anchor2', patterns: ['login'], adjustment: -0.1, reason: 'Login', target: 'path' },
      ],
    };
    const matches = matchAnchors(collection, [{ path: 'src/auth/login.ts' }]);
    expect(matches.length).toBe(2);
    const totalAdjustment = matches.reduce((sum, m) => sum + m.adjustment, 0);
    expect(totalAdjustment).toBeCloseTo(-0.3);
  });
});
