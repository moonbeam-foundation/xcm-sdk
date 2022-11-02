import { AssetSymbol, ChainKey, MoonChainKey, MOON_CHAINS } from '../constants';
import { Asset, Chain } from '../interfaces';
import {
  CreateConfigParams,
  TransactConfig,
  XcmConfigBuilder,
} from './config.interfaces';
import {
  getChainKey,
  getOverallFee,
  getOverallWeight,
  getSymbol,
} from './config.utils';
import {
  MoonbaseAssets,
  MoonbaseChains,
  MOONBASE_ASSETS_MAP,
  MOONBASE_CHAINS_MAP,
  MOONBASE_CONFIGS,
  MOONBASE_TRANSACT_CONFIGS,
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
>({
  assets,
  moonAsset,
  moonChain,
  chains,
  configs,
  transact,
}: CreateConfigParams<Symbols, ChainKeys>): XcmConfigBuilder<
  Symbols,
  ChainKeys
> {
  return {
    symbols: Object.keys(assets) as Symbols[],
    assets,
    moonAsset,
    moonChain,
    deposit: (symbolOrAsset: Symbols | Asset<Symbols>) => {
      const symbol = getSymbol(symbolOrAsset);
      const config = configs[symbol];

      if (!config) {
        throw new Error(`No config found for asset: ${symbol}`);
      }

      return {
        chains: (Object.keys(config.deposit) as ChainKeys[]).map(
          (chain) => chains[chain],
        ),
        from: (keyOrChain: ChainKeys | Chain<ChainKeys>) => {
          const key = getChainKey(keyOrChain);
          const depositConfig = config.deposit[key];

          if (!depositConfig) {
            throw new Error(
              `No deposit config found for asset: ${symbol} and chain: ${key}`,
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
    withdraw: (symbolOrAsset: Symbols | Asset<Symbols>) => {
      const symbol = getSymbol(symbolOrAsset);
      const config = configs[symbol];

      if (!config) {
        throw new Error(`No config found for asset: ${symbol}`);
      }

      return {
        chains: (Object.keys(config.withdraw) as ChainKeys[]).map(
          (chain) => chains[chain],
        ),
        to: (keyOrChain: ChainKeys | Chain<ChainKeys>) => {
          const key = getChainKey(keyOrChain);
          const withdrawConfig = config.withdraw[key];

          if (!withdrawConfig) {
            throw new Error(
              `No withdraw config found for asset: ${symbol} and chain: ${key}`,
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
    transact: () => {
      const { chainsTo, chainsFrom } = Object.values<
        TransactConfig<Symbols, ChainKeys>
      >(transact as { [s: string]: TransactConfig<Symbols, ChainKeys> }).reduce(
        (acc, config) => {
          if (config.from) {
            acc.chainsFrom.push(config.chain);
          }

          if (config.to) {
            acc.chainsTo.push(config.chain);
          }

          return acc;
        },
        {
          chainsTo: [] as Chain<ChainKeys>[],
          chainsFrom: [] as Chain<ChainKeys>[],
        },
      );

      return {
        chainsFrom,
        chainsTo,
        from: (keyOrChain: ChainKeys | Chain<ChainKeys>) => {
          const key = getChainKey(keyOrChain);
          const config = transact[key];

          if (!config?.from) {
            throw new Error(`No transact config found from chain: ${key}`);
          }

          return {
            chain: config.chain,
            config: config.from,
            balance: config.balance,
            getOverallFee: (overallWeight: bigint) =>
              getOverallFee(overallWeight, moonChain.unitsPerSecond),
            getOverallWeight: (txWeight: bigint) =>
              getOverallWeight(moonChain, txWeight),
          };
        },
        to: (keyOrChain: ChainKeys | Chain<ChainKeys>) => {
          const key = getChainKey(keyOrChain);
          const config = transact[key];

          if (!config?.to) {
            throw new Error(`No transact config found to chain: ${key}`);
          }

          return {
            chain: config.chain,
            config: config.to,
            balance: config.balance,
            getOverallFee: (overallWeight: bigint) =>
              getOverallFee(overallWeight, config.unitsPerSecond),
            getOverallWeight: (txWeight: bigint) =>
              getOverallWeight(config.chain, txWeight),
          };
        },
      };
    },
  };
}

export const moonbase = createConfig<MoonbaseAssets, MoonbaseChains>({
  assets: MOONBASE_ASSETS_MAP,
  moonAsset: MOONBASE_ASSETS_MAP[AssetSymbol.DEV],
  moonChain: MOON_CHAINS[MoonChainKey.MoonbaseAlpha],
  chains: MOONBASE_CHAINS_MAP,
  configs: MOONBASE_CONFIGS,
  transact: MOONBASE_TRANSACT_CONFIGS,
});
export const moonbeam = createConfig<MoonbeamAssets, MoonbeamChains>({
  assets: MOONBEAM_ASSETS_MAP,
  moonAsset: MOONBEAM_ASSETS_MAP[AssetSymbol.GLMR],
  moonChain: MOON_CHAINS[MoonChainKey.Moonbeam],
  chains: MOONBEAM_CHAINS_MAP,
  configs: MOONBEAM_CONFIGS,
  transact: {},
});
export const moonriver = createConfig<MoonriverAssets, MoonriverChains>({
  assets: MOONRIVER_ASSETS_MAP,
  moonAsset: MOONRIVER_ASSETS_MAP[AssetSymbol.MOVR],
  moonChain: MOON_CHAINS[MoonChainKey.Moonriver],
  chains: MOONRIVER_CHAINS_MAP,
  configs: MOONRIVER_CONFIGS,
  transact: {},
});
