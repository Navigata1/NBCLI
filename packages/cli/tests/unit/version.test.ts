import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import path from 'path';
import { NBCLI_VERSION } from '../../src/version';

describe('version single-source', () => {
  it('NBCLI_VERSION equals package.json version (no drift)', () => {
    const pkg = JSON.parse(readFileSync(path.resolve(__dirname, '../../package.json'), 'utf-8'));
    expect(NBCLI_VERSION).toBe(pkg.version);
  });
});
