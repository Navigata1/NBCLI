import type { AnchorCollection, AnchorRule } from '@nsb/core';

export interface MergeResult {
  merged: AnchorCollection;
  added: AnchorRule[];
  overridden: AnchorRule[];
}

export function mergeAnchors(builtIn: AnchorCollection, custom: AnchorCollection): MergeResult {
  const merged: AnchorCollection = {};
  const added: AnchorRule[] = [];
  const overridden: AnchorRule[] = [];

  const builtInIds = new Set<string>();
  for (const rules of Object.values(builtIn)) {
    for (const rule of rules) {
      builtInIds.add(rule.id);
    }
  }

  for (const [category, rules] of Object.entries(builtIn)) {
    merged[category] = [...rules];
  }

  for (const [category, customRules] of Object.entries(custom)) {
    if (!merged[category]) {
      merged[category] = [];
    }

    for (const customRule of customRules) {
      let didOverride = false;

      for (const cat of Object.keys(merged)) {
        const idx = merged[cat].findIndex((r) => r.id === customRule.id);
        if (idx !== -1) {
          overridden.push(customRule);
          merged[cat][idx] = customRule;
          didOverride = true;
          break;
        }
      }

      if (!didOverride) {
        added.push(customRule);
        merged[category].push(customRule);
      }
    }
  }

  return { merged, added, overridden };
}

export function formatMergeDiff(result: MergeResult): string {
  const lines: string[] = [];

  if (result.overridden.length > 0) {
    lines.push('Overridden anchors:');
    for (const rule of result.overridden) {
      lines.push(`  - ${rule.id}: ${rule.reason}`);
    }
  }

  if (result.added.length > 0) {
    lines.push('Added anchors:');
    for (const rule of result.added) {
      lines.push(`  + ${rule.id}: ${rule.reason}`);
    }
  }

  if (result.overridden.length === 0 && result.added.length === 0) {
    lines.push('No custom anchors to merge.');
  }

  return lines.join('\n');
}
