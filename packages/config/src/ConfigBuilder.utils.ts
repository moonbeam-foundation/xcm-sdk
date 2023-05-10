import { AnyChain, Asset, Ecosystem } from '@moonbeam-network/xcm-types';
import { AssetConfig } from './AssetConfig';
import { assetsList, assetsMap } from './assets';
import { chainsMap } from './chains';
import { chainsConfigMap } from './configs';

export function getEcosystemAssets(ecosystem?: Ecosystem): Asset[] {
  if (!ecosystem) {
    return assetsList;
  }

  return Array.from(
    new Set(
      Array.from(chainsConfigMap.values())
        .filter((chainConfig) => chainConfig.chain.ecosystem === ecosystem)
        .map((chainConfig) => Array.from(chainConfig.assets.values()))
        .flat(3)
        .map((assetConfig) => assetConfig.asset),
    ),
  ).sort((a, b) => a.key.localeCompare(b.key));
}

export function getAsset(keyOrAsset: string | Asset): Asset {
  const key = typeof keyOrAsset === 'string' ? keyOrAsset : keyOrAsset.key;
  const asset = assetsMap.get(key);

  if (!asset) {
    throw new Error(`Asset ${key} not found`);
  }

  return asset;
}

export function getChain(keyOrAsset: string | AnyChain): AnyChain {
  const key = typeof keyOrAsset === 'string' ? keyOrAsset : keyOrAsset.key;
  const chain = chainsMap.get(key);

  if (!chain) {
    throw new Error(`Chain ${key} not found`);
  }

  return chain;
}

export function getSourceChains(asset: Asset): AnyChain[] {
  return Array.from(chainsConfigMap.values())
    .filter((chainConfig) => chainConfig.assets.has(asset.key))
    .map((chainConfig) => chainConfig.chain);
}

export function getAssetConfigs(asset: Asset, chain: AnyChain): AssetConfig[] {
  const chainConfig = chainsConfigMap.get(chain.key);

  if (!chainConfig) {
    throw new Error(`Config for chain ${chain.key} not found`);
  }

  const assetConfigs = chainConfig.assets.get(asset.key);

  if (!assetConfigs) {
    throw new Error(
      `Config for chain ${chain.key} and asset ${asset.key} not found`,
    );
  }

  return assetConfigs;
}

export function filterAssetConfigsByChain(
  configs: AssetConfig[],
  chain: AnyChain,
): AssetConfig {
  const config = configs.find((cfg) => cfg.destinations.includes(chain));

  if (!config) {
    throw new Error(`Config for chain ${chain.key} not found`);
  }

  return config;
}

export function getDestinations(configs: AssetConfig[]): AnyChain[] {
  return configs.map((config) => config.destinations).flat(1);
}
