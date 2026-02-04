import type { ConfidenceConfig } from '../types/config';

export const defaultConfidenceConfig: ConfidenceConfig = {
  factors: {
    specification_clarity: {
      weight: 0.25,
      description: 'How clear is the task and expected outcome?',
    },
    solution_certainty: {
      weight: 0.25,
      description: 'How confident is the solution approach?',
    },
    reversibility: {
      weight: 0.2,
      description: 'How easy is it to undo if wrong?',
    },
    scope_containment: {
      weight: 0.15,
      description: 'How isolated is the change?',
    },
    precedent_available: {
      weight: 0.15,
      description: 'Have similar changes been done successfully?',
    },
  },
  thresholds: {
    high: 0.8,
    medium: 0.5,
    low: 0.3,
    uncertain: 0,
  },
};
