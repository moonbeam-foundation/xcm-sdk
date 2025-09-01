import { defineConfig } from 'tsup';
import { baseConfig } from '../../tsup.config';

export default defineConfig({
  ...baseConfig,
  splitting: true,
  entry: {
    index: 'src/index.ts',
    assets: 'src/assets.ts',
    chains: 'src/chains.ts',
  },
});
