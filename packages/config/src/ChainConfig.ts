import { AnyChain, Asset, Chain } from '@moonbeam-network/xcm-types';
import { AssetConfig } from './AssetConfig';

export interface ChainConfigConstructorParams {
  assets: AssetConfig[];
  chain: Chain;
}

export class ChainConfig {
  readonly #assets: Map<string, AssetConfig> = new Map();

  readonly chain: Chain;

  constructor({ assets, chain }: ChainConfigConstructorParams) {
    this.chain = chain;
    this.#assets = new Map(
      assets.map((asset) => [
        `${asset.asset.key}-${asset.destination.key}`,
        asset,
      ]),
    );
  }

  getAssetsConfigs(): AssetConfig[] {
    return Array.from(this.#assets.values());
  }

  getAssetConfigs(asset: Asset): AssetConfig[] {
    return this.getAssetsConfigs().filter(
      (assetConfig) => assetConfig.asset.key === asset.key,
    );
  }

  getAssetDestinations(asset: Asset): AnyChain[] {
    return this.getAssetConfigs(asset).map(
      (assetConfig) => assetConfig.destination,
    );
  }

  getDestinationConfig(asset: Asset, destination: Chain): AssetConfig {
    const assetConfig = this.#assets.get(`${asset.key}-${destination.key}`);

    if (!assetConfig) {
      throw new Error(
        `AssetConfig for ${asset.key} and destination ${destination.key} not found`,
      );
    }

    return assetConfig;
  }
}
