import type { ConfidenceFactorDefinition, GovernanceConfig, GovernanceProfile } from '@nsb/core';

// Built-in governance profiles, embedded as typed constants so they are
// available in every distribution form (npm bin, standalone monolith, tests)
// without runtime filesystem access. This replaces the previous fragile
// __dirname-relative YAML loading.
const FACTORS: Record<string, ConfidenceFactorDefinition> = {
  specification_clarity: { weight: 0.25, description: 'How clear is the task?' },
  solution_certainty: { weight: 0.25, description: 'How confident in the approach?' },
  reversibility: { weight: 0.2, description: 'How easy to undo if wrong?' },
  scope_containment: { weight: 0.15, description: 'How isolated is the change?' },
  precedent_available: { weight: 0.15, description: 'Have similar changes been done before?' },
};

export const PROFILES: Record<GovernanceProfile, GovernanceConfig> = {
  starter: {
    version: '1.0',
    governance: { profile: 'starter' },
    confidence: { factors: FACTORS, thresholds: { high: 0.8, medium: 0.5, low: 0.3, uncertain: 0 } },
    autonomy: {
      default_level: 2,
      escalation_paths: [
        { condition: 'confidence < 0.30', action: 'require_human_approval' },
        { condition: 'anchor_triggered', action: 'explain_and_confirm' },
      ],
    },
    tools: { enabled: [] },
    hooks: { profile: 'minimal' },
    permissions: { allow: ['read', 'format'], destructive_gates: ['rm -rf', 'git push --force'] },
  },
  professional: {
    version: '1.0',
    governance: { profile: 'professional' },
    confidence: { factors: FACTORS, thresholds: { high: 0.8, medium: 0.5, low: 0.3, uncertain: 0 } },
    autonomy: {
      default_level: 3,
      escalation_paths: [
        { condition: 'confidence < 0.30', action: 'require_human_approval' },
        { condition: 'anchor_triggered', action: 'explain_and_confirm' },
      ],
    },
    tools: { enabled: [] },
    hooks: { profile: 'standard' },
    budgets: { per_run_usd: 5, per_project_usd: 50, warn_at: 0.8, currency: 'USD' },
    permissions: {
      allow: ['read', 'format', 'lint', 'test'],
      destructive_gates: ['rm -rf', 'git push --force', 'db migrate'],
    },
    routing: {
      orchestrator: 'claude-opus-4-8',
      subtask: 'claude-sonnet-4-6',
      cheap: 'claude-haiku-4-5',
      fast: false,
    },
  },
  enterprise: {
    version: '1.0',
    governance: { profile: 'enterprise' },
    confidence: { factors: FACTORS, thresholds: { high: 0.85, medium: 0.6, low: 0.35, uncertain: 0 } },
    autonomy: {
      default_level: 4,
      escalation_paths: [
        { condition: 'confidence < 0.35', action: 'require_human_approval' },
        { condition: 'anchor_triggered', action: 'explain_and_confirm' },
        { condition: 'security_anchor', action: 'require_security_review' },
      ],
    },
    tools: { enabled: [] },
    hooks: { profile: 'strict' },
    budgets: {
      per_run_usd: 10,
      per_project_usd: 100,
      per_run_tokens: 200000,
      per_project_tokens: 2000000,
      warn_at: 0.75,
      currency: 'USD',
    },
    permissions: {
      allow: ['read', 'format', 'lint', 'test'],
      deny: ['curl | sh', 'npx --yes'],
      destructive_gates: ['rm -rf', 'git push --force', 'db migrate', 'deploy prod', 'payment'],
    },
    routing: {
      orchestrator: 'claude-opus-4-8',
      subtask: 'claude-sonnet-4-6',
      cheap: 'claude-haiku-4-5',
      fast: false,
      effort: 'xhigh',
    },
  },
};

/** Deep-clone a built-in profile (falls back to professional for unknown names). */
export const getProfile = (profile: string): GovernanceConfig =>
  JSON.parse(JSON.stringify(PROFILES[profile as GovernanceProfile] ?? PROFILES.professional)) as GovernanceConfig;
