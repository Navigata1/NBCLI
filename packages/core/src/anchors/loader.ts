import { readFileSync } from 'fs';
import { parse } from 'yaml';
import type { AnchorCollection, AnchorRule } from '../types/config';

const normalizeRule = (rule: Record<string, unknown>): AnchorRule => {
  const patterns = Array.isArray(rule.patterns)
    ? (rule.patterns as string[])
    : typeof rule.pattern === 'string'
      ? [rule.pattern]
      : [];

  return {
    id: String(rule.id ?? rule.name ?? 'anchor'),
    patterns,
    adjustment: Number(rule.adjustment ?? 0),
    reason: String(rule.reason ?? 'Anchor triggered'),
    target: (rule.target as AnchorRule['target']) ?? 'any',
    match: (rule.match as AnchorRule['match']) ?? undefined,
  };
};

const normalizeCollection = (data: unknown): AnchorCollection => {
  if (Array.isArray(data)) {
    return {
      custom: data.map((rule) => normalizeRule(rule as Record<string, unknown>)),
    };
  }

  if (data && typeof data === 'object') {
    const collection: AnchorCollection = {};
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      if (Array.isArray(value)) {
        collection[key] = value.map((rule) => normalizeRule(rule as Record<string, unknown>));
      }
    }
    return collection;
  }

  return {};
};

export const loadAnchorsFromFile = (filePath: string): AnchorCollection => {
  const raw = readFileSync(filePath, 'utf-8');
  const parsed = parse(raw);
  return normalizeCollection(parsed);
};

export const mergeAnchorCollections = (...collections: AnchorCollection[]): AnchorCollection => {
  const merged: AnchorCollection = {};
  for (const collection of collections) {
    for (const [category, rules] of Object.entries(collection)) {
      if (!merged[category]) merged[category] = [];
      merged[category].push(...rules);
    }
  }
  return merged;
};
