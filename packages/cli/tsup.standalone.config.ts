import { defineConfig } from 'tsup';

// Monolithic distributable: a single self-contained CJS file with EVERY
// dependency inlined (workspace + third-party). Produces dist/nsb-standalone.js
// (tsup emits .js for cjs format) which runs from any directory with just
// Node >=22 — no node_modules required.
export default defineConfig({
  entry: { 'nsb-standalone': 'src/index.ts' },
  format: ['cjs'],
  dts: false,
  shims: true,
  noExternal: [/.*/],
  banner: { js: '#!/usr/bin/env node' },
  minify: true,
  treeshake: true,
});
