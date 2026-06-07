import { describe, expect, it } from 'vitest';
import { evaluateChange, matchAnchors } from '@nsb/core';
import { getBuiltInAnchors } from '@nsb/anchors';

const anchors = getBuiltInAnchors();
const ids = (content: string) => matchAnchors(anchors, [{ path: 'f.sh', content }]).map((m) => m.id);
const verdict = (content: string) => evaluateChange(matchAnchors(anchors, [{ path: 'f.sh', content }]), 'strict').verdict;

describe('NBB hard-stop anchors (HARD_STOPS Tier 5/4 -> enforced)', () => {
  it('blocks destructive commands (incl. rm flag-order / long-flag / no-preserve-root variants)', () => {
    expect(verdict('terraform destroy -auto-approve')).toBe('block');
    expect(verdict('DROP DATABASE prod;')).toBe('block');
    expect(verdict('git push --force origin main')).toBe('block');
    expect(verdict('prisma db push --force-reset')).toBe('block');
    for (const rm of ['rm -rf /', 'rm -fr /', 'rm -f -r /', 'rm --recursive --force /', 'rm -rf --no-preserve-root /', 'rm -rf ~']) {
      expect(verdict(rm), rm).toBe('block');
    }
  });

  it('does NOT hard-stop ordinary commands (precision)', () => {
    expect(ids('terraform plan')).not.toContain('destroy_infra');
    expect(ids('git push origin main')).not.toContain('force_push');
    for (const rm of ['rm -rf ./build', 'rm -rf node_modules', 'rm -rf "$TMPDIR"']) {
      expect(ids(rm), rm).not.toContain('rm_rf_root');
    }
  });

  it('exposes a hard_stops category', () => {
    expect(Object.keys(anchors)).toContain('hard_stops');
  });
});
