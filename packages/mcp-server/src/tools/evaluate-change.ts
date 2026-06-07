import type { AnchorCollection, AnchorMatchTarget, HookProfile } from '@nsb/core';
import { evaluateChange, matchAnchors } from '@nsb/core';
import { getBuiltInAnchors } from '@nsb/anchors';

export interface EvaluateChangeInput {
  targets: AnchorMatchTarget[];
  profile?: HookProfile;
  /** Optional override; defaults to the built-in anchor library. */
  anchors?: AnchorCollection;
}

/**
 * The enforcement decision an agent can query BEFORE acting: given file targets
 * (path/content) and a hook profile, return the allow/warn/block verdict. This is
 * NBCLI's policy-at-the-tool-call-layer surface (OWASP Agentic Top-10: goal hijacking).
 */
export const evaluateChangeTool = ({ targets, profile = 'standard', anchors }: EvaluateChangeInput) => {
  const library = anchors ?? getBuiltInAnchors();
  // Coerce a missing/non-array `targets` to [] so a malformed agent call yields a
  // clean allow verdict instead of a raw TypeError.
  const matches = matchAnchors(library, Array.isArray(targets) ? targets : []);
  return evaluateChange(matches, profile);
};
