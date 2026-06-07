import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { cli: 'src/index.ts' },
  format: ['cjs'],
  dts: true,
  shims: true,
  // Inline the workspace @nsb/* packages so the published bin is self-contained
  // and does not require sibling packages at runtime (third-party deps stay
  // external and are installed by npm). See tsup.standalone.config.ts for a
  // fully-bundled single-file artifact.
  noExternal: [/^@nsb\//],
  banner: {
    js: '#!/usr/bin/env node',
  },
});
