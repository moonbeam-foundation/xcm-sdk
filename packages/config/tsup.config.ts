import { defineConfig } from 'tsup';
import { baseConfig } from '../../tsup.config';

export default defineConfig({
  ...baseConfig,
  splitting: true,
  entry: {
    index: 'src/index.ts',
    assets: 'src/assets.ts',
    chains: 'src/chains.ts',
    'config-utils': 'src/config.utils.ts',
    'config-service': 'src/ConfigService/index.ts',
    'cross-ecosystem-configs': 'src/cross-ecosystem-configs/index.ts',
    'mrl-configs': 'src/mrl-configs/index.ts',
    'types/asset-route': 'src/types/AssetRoute.ts',
    'types/chain-routes': 'src/types/ChainRoutes.ts',
    'types/mrl-asset-route': 'src/types/MrlAssetRoute.ts',
    'types/mrl-chain-routes': 'src/types/MrlChainRoutes.ts',
    'xcm-configs': 'src/xcm-configs/index.ts',
  },
});
