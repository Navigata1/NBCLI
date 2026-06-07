import type { AnchorCollection, AnchorMatchType, AnchorRule, AnchorTarget } from '../types/config';
import type { AnchorMatch } from '../types/assessment';

export interface AnchorMatchTarget {
  path: string;
  content?: string;
}

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const globToRegex = (pattern: string) => {
  const escaped = escapeRegex(pattern)
    .replace(/\\\*/g, '.*')
    .replace(/\\\?/g, '.');
  return new RegExp(`^${escaped}$`, 'i');
};

const resolveMatchType = (pattern: string, match?: AnchorMatchType): AnchorMatchType => {
  if (match) return match;
  if (pattern.startsWith('regex:')) return 'regex';
  if (pattern.startsWith('/') && pattern.endsWith('/')) return 'regex';
  if (pattern.includes('*') || pattern.includes('?')) return 'glob';
  return 'substring';
};

const patternToRegex = (pattern: string, match: AnchorMatchType) => {
  if (match === 'regex') {
    if (pattern.startsWith('regex:')) {
      return new RegExp(pattern.slice(6), 'i');
    }
    if (pattern.startsWith('/') && pattern.endsWith('/')) {
      return new RegExp(pattern.slice(1, -1), 'i');
    }
    return new RegExp(pattern, 'i');
  }
  if (match === 'glob') {
    return globToRegex(pattern);
  }
  return new RegExp(escapeRegex(pattern), 'i');
};

const matchesTarget = (value: string | undefined, pattern: string, match: AnchorMatchType) => {
  if (!value) return false;
  if (match === 'substring') {
    return value.toLowerCase().includes(pattern.toLowerCase());
  }
  const regex = patternToRegex(pattern, match);
  return regex.test(value);
};

const targetFields = (target?: AnchorTarget) => {
  if (!target || target === 'any') return ['path', 'content'] as const;
  return [target] as const;
};

const matchRule = (rule: AnchorRule, targets: AnchorMatchTarget[], source?: string) => {
  const matches: AnchorMatch[] = [];
  for (const pattern of rule.patterns) {
    const matchType = resolveMatchType(pattern, rule.match);
    for (const target of targets) {
      for (const field of targetFields(rule.target)) {
        const value = field === 'path' ? target.path : target.content;
        if (matchesTarget(value, pattern, matchType)) {
          matches.push({
            id: rule.id,
            reason: rule.reason,
            adjustment: rule.adjustment,
            pattern,
            target: field,
            source,
            enforce: rule.enforce,
          });
        }
      }
    }
  }
  return matches;
};

export const matchAnchors = (
  anchors: AnchorCollection,
  targets: AnchorMatchTarget[],
): AnchorMatch[] => {
  const matches: AnchorMatch[] = [];
  for (const [category, rules] of Object.entries(anchors)) {
    for (const rule of rules) {
      matches.push(...matchRule(rule, targets, category));
    }
  }
  return matches;
};
