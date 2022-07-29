import { Asset, Chain } from '../constants';
import {} from '../interfaces';
import {
  ChainsConfigs,
  ChainXcmConfigs,
  ConfigGetter,
} from './config.interfaces';
import {
  MoonbaseAssets,
  MoonbaseChains,
  MOONBASE_CHAINS_CONFIGS,
  MOONBASE_CONFIGS,
} from './moonbase';
import {
  MoonbeamAssets,
  MoonbeamChains,
  MOONBEAM_CHAINS_CONFIGS,
  MOONBEAM_CONFIGS,
} from './moonbeam';
import {
  MoonriverAssets,
  MoonriverChains,
  MOONRIVER_CHAINS_CONFIGS,
  MOONRIVER_CONFIGS,
} from './moonriver';

export function createConfigGetter<Assets extends Asset, Chains extends Chain>(
  configs: ChainXcmConfigs<Assets, Chains>,
  chains: ChainsConfigs<Chains>,
): ConfigGetter<Assets, Chains> {
  return {
    deposit: (asset: Assets) => {
      const config = configs[asset];

      if (!config) {
        throw new Error(`No config found for asset: ${asset}`);
      }

      return {
        chains: (Object.keys(config.deposit) as Chains[]).map(
          (chain) => chains[chain],
        ),
        from: (chain: Chains) => {
          const depositConfig = config.deposit[chain];

          if (!depositConfig) {
            throw new Error(
              `No deposit config found for asset: ${asset} and chain: ${chain}`,
            );
          }

          return {
            asset: config.asset,
            origin: config.origin,
            config: depositConfig,
          };
        },
      };
    },
    withdraw: (asset: Assets) => {
      const config = configs[asset];

      if (!config) {
        throw new Error(`No config found for asset: ${asset}`);
      }

      return {
        chains: (Object.keys(config.withdraw) as Chains[]).map(
          (chain) => chains[chain],
        ),
        to: (chain: Chains) => {
          const withdrawConfig = config.withdraw[chain];

          if (!withdrawConfig) {
            throw new Error(
              `No withdraw config found for asset: ${asset} and chain: ${chain}`,
            );
          }

          return {
            asset: config.asset,
            origin: config.origin,
            config: withdrawConfig,
          };
        },
      };
    },
  };
}

export const moonbase = createConfigGetter<MoonbaseAssets, MoonbaseChains>(
  MOONBASE_CONFIGS,
  MOONBASE_CHAINS_CONFIGS,
);
export const moonbeam = createConfigGetter<MoonbeamAssets, MoonbeamChains>(
  MOONBEAM_CONFIGS,
  MOONBEAM_CHAINS_CONFIGS,
);
export const moonriver = createConfigGetter<MoonriverAssets, MoonriverChains>(
  MOONRIVER_CONFIGS,
  MOONRIVER_CHAINS_CONFIGS,
);
