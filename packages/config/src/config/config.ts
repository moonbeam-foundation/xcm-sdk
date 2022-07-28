import { Asset, Chain } from '../constants';
import { DepositConfig } from '../deposit';
import {} from '../interfaces';
import { WithdrawConfig } from '../withdraw';
import { ChainXcmConfigs } from './config.interfaces';
import { MoonbaseAssets, MoonbaseChains, MOONBASE_CONFIGS } from './moonbase';
import { MoonbeamAssets, MoonbeamChains, MOONBEAM_CONFIGS } from './moonbeam';
import {
  MoonriverAssets,
  MoonriverChains,
  MOONRIVER_CONFIGS,
} from './moonriver';

export function createConfigGetter<Assets extends Asset, Chains extends Chain>(
  configs: ChainXcmConfigs<Assets, Chains>,
) {
  return {
    deposit: (asset: Assets) => {
      const config = configs[asset];

      if (!config) {
        throw new Error(`No config found for asset: ${asset}`);
      }

      return {
        chains: Object.keys(config.deposit) as Chains[],
        from: (chain: Chains): DepositConfig<Assets> => {
          const cfg = config.deposit[chain];

          if (!cfg) {
            throw new Error(
              `No deposit config found for asset: ${asset} and chain: ${chain}`,
            );
          }

          return cfg;
        },
      };
    },
    withdraw: (asset: Assets) => {
      const config = configs[asset];

      if (!config) {
        throw new Error(`No config found for asset: ${asset}`);
      }

      return {
        chains: Object.keys(config.withdraw) as Chains[],
        to: (chain: Chains): WithdrawConfig<Assets> => {
          const cfg = config.withdraw[chain];

          if (!cfg) {
            throw new Error(
              `No withdraw config found for asset: ${asset} and chain: ${chain}`,
            );
          }

          return cfg;
        },
      };
    },
  };
}

export const moonbase = createConfigGetter<MoonbaseAssets, MoonbaseChains>(
  MOONBASE_CONFIGS,
);
export const moonbeam = createConfigGetter<MoonbeamAssets, MoonbeamChains>(
  MOONBEAM_CONFIGS,
);
export const moonriver = createConfigGetter<MoonriverAssets, MoonriverChains>(
  MOONRIVER_CONFIGS,
);
