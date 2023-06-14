import { AnyChain, Asset, Ecosystem } from '@moonbeam-network/xcm-types';
import { assetsList, assetsMap } from '../assets';
import { chainsMap } from '../chains';
import { chainsConfigMap } from '../configs';
import { AssetConfig } from '../types/AssetConfig';

export function getEcosystemAssets(ecosystem?: Ecosystem): Asset[] {
  if (!ecosystem) {
    return assetsList;
  }

  return Array.from(
    new Set(
      Array.from(chainsConfigMap.values())
        .filter((chainConfig) => chainConfig.chain.ecosystem === ecosystem)
        .map((chainConfig) => chainConfig.getAssetsConfigs())
        .flat(2)
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

export function getSourceChains(
  asset: Asset,
  ecosystem: Ecosystem | undefined,
): AnyChain[] {
  return Array.from(chainsConfigMap.values())
    .filter((chainConfig) => chainConfig.getAssetConfigs(asset).length)
    .filter(
      (chainConfig) => !ecosystem || chainConfig.chain.ecosystem === ecosystem,
    )
    .map((chainConfig) => chainConfig.chain);
}

export function getDestinationChains(
  asset: Asset,
  source: AnyChain,
): AnyChain[] {
  const chainConfig = chainsConfigMap.get(source.key);

  if (!chainConfig) {
    throw new Error(`Config for chain ${source.key} not found`);
  }

  return chainConfig.getAssetDestinations(asset);
}

export function getAssetDestinationConfig(
  asset: Asset,
  source: AnyChain,
  destination: AnyChain,
): AssetConfig {
  const chainConfig = chainsConfigMap.get(source.key);

  if (!chainConfig) {
    throw new Error(`Config for chain ${source.key} not found`);
  }

  return chainConfig.getAssetDestinationConfig(asset, destination);
}
