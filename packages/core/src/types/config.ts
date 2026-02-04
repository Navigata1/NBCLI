export type GovernanceProfile = 'starter' | 'professional' | 'enterprise';

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
}

export type AnchorCollection = Record<string, AnchorRule[]>;

export interface AutonomyConfig {
  default_level: number;
  escalation_paths?: {
    condition: string;
    action: string;
  }[];
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
}
