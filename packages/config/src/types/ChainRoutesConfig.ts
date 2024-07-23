import { AnyAsset, AnyChain, Asset } from '@moonbeam-network/xcm-types';
import { AssetTransferConfig } from './AssetTransferConfig';
import { getKey } from '../config.utils';

export interface ChainRoutesConfigConstructorParams {
  assets: AssetTransferConfig[];
  chain: AnyChain;
}

export class ChainRoutesConfig {
  readonly #assets: Map<string, AssetTransferConfig>;

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

  getAssetConfigs(keyOrAsset: string | AnyAsset): AssetTransferConfig[] {
    const key = getKey(keyOrAsset);

    return this.getAssetsConfigs().filter((cfg) => cfg.asset.key === key);
  }

  getAssetDestinations(keyOrAsset: string | AnyAsset): AnyChain[] {
    return this.getAssetConfigs(keyOrAsset).map(
      (assetConfig) => assetConfig.destination,
    );
  }

  getDestinationAssets(keyOrChain: string | AnyChain): Asset[] {
    const key = getKey(keyOrChain);

    return this.getAssetsConfigs()
      .filter((cfg) => cfg.destination.key === key)
      .map((cfg) => cfg.asset);
  }

  getAssetDestinationConfig(
    asset: string | AnyAsset,
    destination: string | AnyChain,
  ): AssetTransferConfig {
    const assetKey = getKey(asset);
    const destKey = getKey(destination);
    const config = this.#assets.get(`${assetKey}-${destKey}`);

    if (!config) {
      throw new Error(
        `AssetConfig for ${assetKey} and destination ${destKey} not found`,
      );
    }

    return config;
  }
}
