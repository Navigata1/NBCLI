import { describe, expect, it } from 'vitest';
import { matchAnchors } from '@nsb/core';
import { getBuiltInAnchors } from '@nsb/anchors';

const anchors = getBuiltInAnchors();
const ids = (path: string, content = ''): string[] =>
  matchAnchors(anchors, [{ path, content }]).map((m) => m.id);

// Precision regressions: enforced anchors must not false-positive on ordinary paths/identifiers,
// and must still catch the real risks. (Guards the v2.7 enforce-flag + pattern fixes.)
describe('built-in anchor precision', () => {
  it('auth_path matches the real /auth/ segment, not author/ or authorize', () => {
    expect(ids('src/auth/login.ts')).toContain('auth_path');
    expect(ids('src/author/bio.ts')).not.toContain('auth_path');
    expect(ids('lib/authorize.ts')).not.toContain('auth_path');
  });

  it('env_files matches real .env files, not .envconfig/.envrc', () => {
    expect(ids('.env')).toContain('env_files');
    expect(ids('config/.env.local')).toContain('env_files');
    expect(ids('src/run.envconfig.ts')).not.toContain('env_files');
    expect(ids('.envrc')).not.toContain('env_files');
  });

  it('schema_migration matches /migrations/, not immigrations', () => {
    expect(ids('db/migrations/001.ts')).toContain('schema_migration');
    expect(ids('db/immigrations_log/x.ts')).not.toContain('schema_migration');
  });

  it('docker_changes matches /containers/, not containershelper', () => {
    expect(ids('infra/containers/web.ts')).toContain('docker_changes');
    expect(ids('app/containershelper.ts')).not.toContain('docker_changes');
  });

  it('raw_sql matches a real SELECT (substring, not anchored glob)', () => {
    expect(ids('q.ts', 'const q = "SELECT * FROM users WHERE id=1";')).toContain('raw_sql');
  });

  it('secrets_handling matches assignments + key literals, not bare identifiers', () => {
    expect(ids('c.ts', 'const password = "hunter2";')).toContain('secrets_handling');
    expect(ids('c.ts', 'const api_key = "x";')).toContain('secrets_handling');
    expect(ids('c.ts', 'function getToken(token) { return token; }')).not.toContain('secrets_handling');
  });
});
