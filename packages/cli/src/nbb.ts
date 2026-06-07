/**
 * NBB provenance — the single source of truth for NBCLI's methodology + governance
 * doctrine. PINNED (see docs/ADR-001-nbb-realignment.md). Never invent this SHA;
 * bump it deliberately and run `nsb sync` to refresh vendor/nbb.
 */
export const NBB_REPO = 'https://github.com/Navigata1/NBB';
export const NBB_PINNED_SHA = '282028336df169d73e49a2d3b6a12acc95896399';
export const NBB_VENDOR_DIR = 'vendor/nbb';
/** Methodology versions at the pinned SHA (NBB's versions, independent of NBCLI's CLI version). */
export const NBB_BLUEPRINT_VERSION = 'v6.5';
export const NBB_MBF_VERSION = 'v2.5';
