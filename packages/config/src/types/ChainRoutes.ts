import { AnyAsset, AnyChain, Asset } from '@moonbeam-network/xcm-types';
import { getKey } from '../config.utils';
import { AssetRoute } from './AssetRoute';

export interface ChainRoutesConstructorParams {
  routes: AssetRoute[];
  chain: AnyChain;
}

export class ChainRoutes {
  readonly #routes: Map<string, AssetRoute>;

  readonly chain: AnyChain;

  constructor({ routes: assets, chain }: ChainRoutesConstructorParams) {
    this.chain = chain;
    this.#routes = new Map(
      assets.map((asset) => [
        `${asset.asset.key}-${asset.destination.key}`,
        asset,
      ]),
    );
  }

  getRoutes(): AssetRoute[] {
    return Array.from(this.#routes.values());
  }

  getAssetRoutes(keyOrAsset: string | AnyAsset): AssetRoute[] {
    const key = getKey(keyOrAsset);

    return this.getRoutes().filter((cfg) => cfg.asset.key === key);
  }

  getAssetDestinations(keyOrAsset: string | AnyAsset): AnyChain[] {
    return this.getAssetRoutes(keyOrAsset).map(
      (assetConfig) => assetConfig.destination,
    );
  }

  getDestinationAssets(keyOrChain: string | AnyChain): Asset[] {
    const key = getKey(keyOrChain);

    return this.getRoutes()
      .filter((cfg) => cfg.destination.key === key)
      .map((cfg) => cfg.asset);
  }

  getAssetRoute(
    asset: string | AnyAsset,
    destination: string | AnyChain,
  ): AssetRoute {
    const assetKey = getKey(asset);
    const destKey = getKey(destination);
    const config = this.#routes.get(`${assetKey}-${destKey}`);

    if (!config) {
      throw new Error(
        `AssetConfig for ${assetKey} and destination ${destKey} not found`,
      );
    }

    return config;
  }
}
