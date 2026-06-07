import { describe, expect, it } from 'vitest';
import { composeHome, type HomeStatus } from '../../src/utils/banner';

const status: HomeStatus = {
  version: '2.5.0',
  initialized: true,
  profile: 'professional',
  hookProfile: 'standard',
  tools: ['claude', 'skill'],
  mcp: false,
};

describe('composeHome', () => {
  it('renders the version and resolved profile', () => {
    const out = composeHome(status, 0, 100);
    expect(out).toContain('2.5.0');
    expect(out).toContain('professional');
  });

  it('is constant height across frames (so animation redraws in place)', () => {
    const h0 = composeHome(status, 0, 100).split('\n').length;
    const h9 = composeHome(status, 9, 100).split('\n').length;
    expect(h0).toBe(h9);
  });

  it('shows the init hint when uninitialized', () => {
    const out = composeHome({ version: '2.5.0', initialized: false }, 0, 100);
    expect(out).toContain('nsb init');
  });
});
