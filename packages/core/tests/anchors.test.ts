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
});
