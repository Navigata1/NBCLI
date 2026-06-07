import { describe, expect, it } from 'vitest';
import { toCedar, toRego } from '../src/policy';
import type { AnchorCollection } from '../src/types/config';

const anchors: AnchorCollection = {
  security: [
    { id: 'auth_path', patterns: ['/auth/'], adjustment: -0.3, reason: 'auth', target: 'path', match: 'substring', enforce: true },
    { id: 'env_files', patterns: ['regex:(^|/)\\.env$'], adjustment: -0.4, reason: 'env', target: 'path', enforce: true },
    { id: 'pem', patterns: ['*.pem'], adjustment: -0.4, reason: 'pem', target: 'path', enforce: true },
    { id: 'raw_sql', patterns: ['select'], adjustment: -0.35, reason: 'sql', target: 'content', match: 'substring' },
  ],
};

describe('toRego', () => {
  const rego = toRego(anchors);

  it('emits a package + allow default that flips on deny', () => {
    expect(rego).toContain('package nbcli.governance');
    expect(rego).toContain('default allow := true');
    expect(rego).toContain('allow := false if { count(deny) > 0 }');
  });

  it('substring path anchor compiles to case-insensitive contains() — NOT regex', () => {
    expect(rego).toContain('contains(lower(input.path), "/auth/")');
    expect(rego).not.toContain('regex.match("(?i)auth"');
  });

  it('regex anchor compiles to a case-insensitive regex.match()', () => {
    expect(rego).toContain('regex.match("(?i)');
    expect(rego).toContain('.env');
  });

  it('glob anchor compiles to an anchored case-insensitive regex', () => {
    expect(rego).toContain('regex.match("(?i)^.*');
    expect(rego).toContain('.pem');
  });

  it('enforced → deny, advisory → warn, with always-defined seed sets', () => {
    expect(rego).toContain('deny contains msg');
    expect(rego).toContain('warn contains msg');
    expect(rego).toContain('deny contains msg if { false');
  });
});

describe('toCedar', () => {
  const cedar = toCedar(anchors);

  it('path substring anchor → forbid + path like', () => {
    expect(cedar).toContain('forbid (principal, action, resource)');
    expect(cedar).toContain('resource.path like "*/auth/*"');
  });

  it('regex and glob anchors are skipped honestly (Cedar limitation)', () => {
    expect(cedar).toContain('skipped env_files');
    expect(cedar).toContain('skipped pem');
  });

  it('advisory anchors are not forbidden', () => {
    expect(cedar).not.toContain('select');
  });
});
