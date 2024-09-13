import type { Options } from 'tsup';

export const baseConfig: Options = {
  entry: ['src/index.ts'],
  format: 'esm',
  outDir: 'build',
  target: 'es2022',
  minify: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  outExtension({ format }) {
    const ext = format === 'esm' ? 'mjs' : 'cjs';

    return {
      js: `.${ext}`,
    };
  },
};
