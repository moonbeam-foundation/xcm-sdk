import '@moonbeam-network/api-augment';

import { MOONBEAM_CONFIGS } from './config/constants/moonbeam';
import { Asset, Chain } from './constants';
import { MoonbeamAssets } from './interfaces';

export function moonbeam() {
  return {
    deposit: (asset: MoonbeamAssets) => {
      const config = MOONBEAM_CONFIGS[asset];

      if (!config) {
        // TODO: throw proper error
        throw new Error('No config');
      }

      return {
        chains: Object.keys(config.deposit) as MoonbeamAssets[],
        from: <C extends keyof typeof config.deposit>(chain: C) =>
          config.deposit[chain],
      };
    },
    // withdraw: (asset: MoonbeamAssets) => {
    //   return {};
    // },
  };
}

moonbeam().deposit(Asset.GLMR).from(Chain.Acala);
