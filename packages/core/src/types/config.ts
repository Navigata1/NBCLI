export type GovernanceProfile = 'starter' | 'professional' | 'enterprise';

/**
 * Hook strictness tiers (NBCLI v2.5). Defaults are derived from the governance
 * profile via {@link HOOK_PROFILE_BY_GOVERNANCE} but can be set explicitly.
 */
export type HookProfile = 'minimal' | 'standard' | 'strict';

export interface ConfidenceFactorDefinition {
  weight: number;
  description?: string;
}

export interface ConfidenceThresholds {
  high: number;
  medium: number;
  low: number;
  uncertain: number;
}

export interface ConfidenceConfig {
  factors: Record<string, ConfidenceFactorDefinition>;
  thresholds: ConfidenceThresholds;
}

export type AnchorTarget = 'path' | 'content' | 'any';
export type AnchorMatchType = 'substring' | 'regex' | 'glob';

export interface AnchorRule {
  id: string;
  patterns: string[];
  adjustment: number;
  reason: string;
  target?: AnchorTarget;
  match?: AnchorMatchType;
  /**
   * When true, this anchor is "block-worthy" and drives enforcement
   * (`nsb check` / hooks). When false/absent it is advisory — it still informs
   * confidence scoring but never blocks. Reserve `enforce` for high-precision,
   * low-false-positive rules (e.g. path-based auth/env/CI, precise PII/secret literals).
   */
  enforce?: boolean;
}

export type AnchorCollection = Record<string, AnchorRule[]>;

export interface AutonomyConfig {
  default_level: number;
  escalation_paths?: {
    condition: string;
    action: string;
  }[];
}

/**
 * Hook-profile governance (NBCLI v2.5). Rendered into the generated instruction
 * files so an agent knows which gates to run for this project.
 */
export interface HooksConfig {
  profile: HookProfile;
  /** Hook ids that are always disabled regardless of profile. */
  disabled?: string[];
}

/**
 * Per-run / per-project cost & token budgets (NBCLI v2.5).
 *
 * These are advisory caps: they are rendered into the instruction files and
 * enforced cooperatively by `nsb budget` against the local run ledger. They are
 * NOT an OS-level spend kill-switch — see CAPABILITY_ASSESSMENT.md.
 */
export interface BudgetConfig {
  per_run_usd?: number;
  per_project_usd?: number;
  per_run_tokens?: number;
  per_project_tokens?: number;
  /** Warn when spend reaches this fraction of a cap (0..1). Default 0.8. */
  warn_at?: number;
  currency?: string;
}

/**
 * Permission model (NBCLI v2.5). Advisory: rendered into tool instructions and
 * emittable as a least-privilege allowlist. Real OS/agent enforcement depends
 * on the consuming harness honoring these declarations.
 */
export interface PermissionConfig {
  allow?: string[];
  deny?: string[];
  /** Operations that always require explicit human confirmation. */
  destructive_gates?: string[];
}

/**
 * Model-routing defaults (NBCLI v2.5). Consumed by `nsb model-route` to
 * recommend (not execute) a model tier per task.
 */
export interface RoutingConfig {
  orchestrator?: string;
  subtask?: string;
  /** Cheap/fast tier model for low-risk, high-confidence, routine work. */
  cheap?: string;
  fast?: boolean;
  effort?: string;
}

export interface GovernanceConfig {
  version: string;
  governance: {
    profile: GovernanceProfile;
  };
  confidence: ConfidenceConfig;
  anchors?: AnchorCollection;
  autonomy?: AutonomyConfig;
  tools?: {
    enabled?: string[];
  };
  hooks?: HooksConfig;
  budgets?: BudgetConfig;
  permissions?: PermissionConfig;
  routing?: RoutingConfig;
  sinks?: SinksConfig;
}

export interface WebhookSink {
  url: string;
  enabled?: boolean;
  /** Drop the freeform `payload` field before sending (keeps seq/timestamp/kind/hash/cost/tokens). */
  redactPayload?: boolean;
  /** Allow plaintext http for THIS sink (default: https-only egress). */
  allowInsecure?: boolean;
  /** Allow a loopback/private/link-local host for THIS sink (default: blocked as an SSRF guard). */
  allowPrivate?: boolean;
}

export interface SinksConfig {
  webhooks?: WebhookSink[];
  /** Optional egress allowlist: only these hosts (and their subdomains) may be sync targets. */
  allowlist?: string[];
}

/** Default hook profile for each governance profile. */
export const HOOK_PROFILE_BY_GOVERNANCE: Record<GovernanceProfile, HookProfile> = {
  starter: 'minimal',
  professional: 'standard',
  enterprise: 'strict',
};
