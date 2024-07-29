// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'tsup';
// eslint-disable-next-line import/no-relative-packages
import { baseConfig } from '../../tsup.config';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  ...baseConfig,
  entry: {
    index: 'src/index.ts',
    'mrl-configs': './src/mrl-configs/index.ts',
    'xcm-configs': './src/xcm-configs/index.ts',
  },
});
