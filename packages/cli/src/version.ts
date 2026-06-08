// Single source of truth for the NBCLI version and product name.
//
// IMPORTANT: NBCLI_VERSION MUST equal `version` in packages/cli/package.json.
// This invariant is enforced by tests/unit/version.test.ts so the two can never
// silently drift (the pre-modernization code hardcoded "0.1.0" in three places).
export const NBCLI_VERSION = '2.26.0';

// Display name for banners and help. The npm bin names remain `northstarbuild`
// and `nsb` for backward compatibility.
export const NBCLI_NAME = 'NorthStar Bootstrap CLI';
export const NBCLI_TAGLINE = 'Build with intention. Ship with confidence.';
