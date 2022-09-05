import { AssetSymbol, ChainKey, MoonChainKey, MOON_CHAINS } from '../constants';
import { Asset, MoonChain } from '../interfaces';
import {
  AssetsMap,
  ChainsMap,
  ChainXcmConfigs,
  XcmConfigBuilder,
} from './config.interfaces';
import {
  MoonbaseAssets,
  MoonbaseChains,
  MOONBASE_ASSETS_MAP,
  MOONBASE_CHAINS_MAP,
  MOONBASE_CONFIGS,
} from './moonbase';
import {
  MoonbeamAssets,
  MoonbeamChains,
  MOONBEAM_ASSETS_MAP,
  MOONBEAM_CHAINS_MAP,
  MOONBEAM_CONFIGS,
} from './moonbeam';
import {
  MoonriverAssets,
  MoonriverChains,
  MOONRIVER_ASSETS_MAP,
  MOONRIVER_CHAINS_MAP,
  MOONRIVER_CONFIGS,
} from './moonriver';

export function createConfig<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
>(
  assets: AssetsMap<Symbols>,
  moonAsset: Asset<Symbols>,
  moonChain: MoonChain,
  chains: ChainsMap<ChainKeys>,
  configs: ChainXcmConfigs<Symbols, ChainKeys>,
): XcmConfigBuilder<Symbols, ChainKeys> {
  return {
    symbols: Object.keys(assets) as Symbols[],
    assets,
    moonAsset,
    moonChain,
    deposit: (symbol: Symbols) => {
      const config = configs[symbol];

      if (!config) {
        throw new Error(`No config found for asset: ${symbol}`);
      }

      return {
        chains: (Object.keys(config.deposit) as ChainKeys[]).map(
          (chain) => chains[chain],
        ),
        from: (chain: ChainKeys) => {
          const depositConfig = config.deposit[chain];

          if (!depositConfig) {
            throw new Error(
              `No deposit config found for asset: ${symbol} and chain: ${chain}`,
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
    withdraw: (symbol: Symbols) => {
      const config = configs[symbol];

      if (!config) {
        throw new Error(`No config found for asset: ${symbol}`);
      }

      return {
        chains: (Object.keys(config.withdraw) as ChainKeys[]).map(
          (chain) => chains[chain],
        ),
        to: (chain: ChainKeys) => {
          const withdrawConfig = config.withdraw[chain];

          if (!withdrawConfig) {
            throw new Error(
              `No withdraw config found for asset: ${symbol} and chain: ${chain}`,
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

export const moonbase = createConfig<MoonbaseAssets, MoonbaseChains>(
  MOONBASE_ASSETS_MAP,
  MOONBASE_ASSETS_MAP[AssetSymbol.DEV],
  MOON_CHAINS[MoonChainKey.MoonbaseAlpha],
  MOONBASE_CHAINS_MAP,
  MOONBASE_CONFIGS,
);
export const moonbeam = createConfig<MoonbeamAssets, MoonbeamChains>(
  MOONBEAM_ASSETS_MAP,
  MOONBEAM_ASSETS_MAP[AssetSymbol.GLMR],
  MOON_CHAINS[MoonChainKey.Moonbeam],
  MOONBEAM_CHAINS_MAP,
  MOONBEAM_CONFIGS,
);
export const moonriver = createConfig<MoonriverAssets, MoonriverChains>(
  MOONRIVER_ASSETS_MAP,
  MOONRIVER_ASSETS_MAP[AssetSymbol.MOVR],
  MOON_CHAINS[MoonChainKey.Moonriver],
  MOONRIVER_CHAINS_MAP,
  MOONRIVER_CONFIGS,
);
