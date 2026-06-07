import type {
  AnchorCollection,
  BudgetConfig,
  ConfidenceThresholds,
  HookProfile,
  PermissionConfig,
} from '@nsb/core';

export const formatThresholds = (thresholds: ConfidenceThresholds) =>
  `High >= ${thresholds.high.toFixed(2)} | Medium >= ${thresholds.medium.toFixed(2)} | Low >= ${thresholds.low.toFixed(2)} | Uncertain < ${thresholds.low.toFixed(2)}`;

export const summarizeAnchors = (anchors: AnchorCollection) => {
  const entries = Object.entries(anchors).map(
    ([category, rules]) => `${category} (${rules.length})`,
  );
  return entries.length > 0 ? entries.join(', ') : 'none';
};

const HOOK_PROFILE_RULES: Record<HookProfile, string[]> = {
  minimal: [
    'Format changed files before reporting done.',
    'Confirm before deleting or overwriting tracked files.',
  ],
  standard: [
    'Format + lint changed files before reporting done.',
    'Type-check the package you changed.',
    'Confirm before deleting/overwriting tracked files or touching more than one package.',
    'Re-state the task before edits when confidence is below "high".',
  ],
  strict: [
    'Format + lint + type-check + run the focused test set before reporting done.',
    'Block edits to security/secret/auth/payment paths without explicit human approval (see anchors).',
    'Confirm before ANY destructive or outward-facing action; never use skip-permissions modes.',
    'Emit a CONFIDENCE ASSESSMENT before edits; stop and ask when level is "low" or "uncertain".',
    'Record each autonomous decision to the run ledger.',
  ],
};

export const describeHookProfile = (profile: HookProfile): string[] =>
  HOOK_PROFILE_RULES[profile] ?? HOOK_PROFILE_RULES.standard;

export const formatBudgets = (budgets?: BudgetConfig): string | null => {
  if (!budgets) return null;
  const currency = budgets.currency ?? 'USD';
  const parts: string[] = [];
  if (budgets.per_run_usd != null) parts.push(`per-run <= ${budgets.per_run_usd} ${currency}`);
  if (budgets.per_project_usd != null) parts.push(`per-project <= ${budgets.per_project_usd} ${currency}`);
  if (budgets.per_run_tokens != null) parts.push(`per-run <= ${budgets.per_run_tokens} tokens`);
  if (parts.length === 0) return null;
  const warn = Math.round((budgets.warn_at ?? 0.8) * 100);
  return `${parts.join(' | ')} (warn at ${warn}%)`;
};

export const formatPermissions = (permissions?: PermissionConfig): string[] => {
  if (!permissions) return [];
  const lines: string[] = [];
  if (permissions.allow?.length) lines.push(`Allowed: ${permissions.allow.join(', ')}`);
  if (permissions.deny?.length) lines.push(`Denied: ${permissions.deny.join(', ')}`);
  if (permissions.destructive_gates?.length)
    lines.push(`Always confirm: ${permissions.destructive_gates.join(', ')}`);
  return lines;
};
