import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { cli: 'src/index.ts' },
  format: ['cjs'],
  dts: true,
  shims: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
});
