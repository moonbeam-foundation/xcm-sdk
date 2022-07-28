import { Asset } from '../constants';
import { AssetConfig, ChainConfig } from '../interfaces';

export function getOriginAssetId<Assets extends Asset>(
  asset: AssetConfig<Assets>,
) {
  if (!asset.originAssetId) {
    throw new Error(`No originAssetId defined for asset ${asset.originSymbol}`);
  }

  return asset.originAssetId;
}

export function getMoonAssetId(chain: ChainConfig) {
  if (!chain.moonAssetId) {
    throw new Error(`No moonAssetId defined for chain ${chain.chain}`);
  }

  return chain.moonAssetId;
}

export function getPalletInstance(chain: ChainConfig) {
  if (!chain.palletInstance) {
    throw new Error(`No palletInstance defined for chain ${chain.chain}`);
  }

  return chain.palletInstance;
}
