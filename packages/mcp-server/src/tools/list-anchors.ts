import { getBuiltInAnchors } from '@nsb/anchors';

/** Expose the built-in anchor library so an agent can introspect the policy. */
export const listAnchors = () => getBuiltInAnchors();
