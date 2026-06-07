import type { AnchorTarget } from './config';

export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'uncertain';

export interface FactorScore {
  key: string;
  score: number;
  weight: number;
  normalized: number;
  reason?: string;
}

export interface AnchorMatch {
  id: string;
  reason: string;
  adjustment: number;
  pattern: string;
  target: AnchorTarget;
  source?: string;
  /** Propagated from the rule — block-worthy (enforced) vs advisory. */
  enforce?: boolean;
}

export interface ConfidenceAssessment {
  baseScore: number;
  anchorAdjustment: number;
  finalScore: number;
  level: ConfidenceLevel;
  factors: FactorScore[];
  anchors: AnchorMatch[];
  recommendation: string;
}
