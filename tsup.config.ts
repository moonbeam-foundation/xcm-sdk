/* eslint-disable sort-keys */
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'tsup';

// eslint-disable-next-line import/no-default-export
export default defineConfig(({ watch }) => ({
  entry: ['src/index.ts'],
  format: 'esm',
  outDir: 'build',
  target: 'es2022',
  minify: !watch,
  sourcemap: true,
  clean: true,
  dts: true,
  outExtension({ format }) {
    const ext = format === 'esm' ? 'mjs' : 'cjs';

    return {
      js: `.${ext}`,
    };
  },
}));
