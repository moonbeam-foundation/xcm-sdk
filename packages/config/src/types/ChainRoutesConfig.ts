import { AnyChain, Asset } from '@moonbeam-network/xcm-types';
import { AssetTransferConfig } from './AssetTransferConfig';

export interface ChainRoutesConfigConstructorParams {
  assets: AssetTransferConfig[];
  chain: AnyChain;
}

export class ChainRoutesConfig {
  readonly #assets: Map<string, AssetTransferConfig> = new Map();

  readonly chain: AnyChain;

  constructor({ assets, chain }: ChainRoutesConfigConstructorParams) {
    this.chain = chain;
    this.#assets = new Map(
      assets.map((asset) => [
        `${asset.asset.key}-${asset.destination.key}`,
        asset,
      ]),
    );
  }

  getAssetsConfigs(): AssetTransferConfig[] {
    return Array.from(this.#assets.values());
  }

  getAssetConfigs(asset: Asset): AssetTransferConfig[] {
    return this.getAssetsConfigs().filter(
      (assetConfig) => assetConfig.asset.key === asset.key,
    );
  }

  getAssetDestinations(asset: Asset): AnyChain[] {
    return this.getAssetConfigs(asset).map(
      (assetConfig) => assetConfig.destination,
    );
  }

  getAssetDestinationConfig(
    asset: Asset,
    destination: AnyChain,
  ): AssetTransferConfig {
    const assetConfig = this.#assets.get(`${asset.key}-${destination.key}`);

    if (!assetConfig) {
      throw new Error(
        `AssetConfig for ${asset.key} and destination ${destination.key} not found`,
      );
    }

    return assetConfig;
  }
}
