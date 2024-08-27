import type { AnyAsset, AnyChain, Asset } from '@moonbeam-network/xcm-types';
import { getKey } from '../config.utils';
import {
  AssetRoute,
  AssetRouteConstructorParams,
  SourceConfig,
} from './AssetRoute';

export interface ChainRoutesConstructorParams {
  chain: AnyChain;
  routes: RoutesParam[];
}

interface RoutesParam extends Omit<AssetRouteConstructorParams, 'source'> {
  source: Omit<SourceConfig, 'chain'>;
}

export class ChainRoutes {
  readonly chain: AnyChain;

  readonly #routes: Map<string, AssetRoute>;

  constructor({ chain, routes }: ChainRoutesConstructorParams) {
    this.chain = chain;
    this.#routes = new Map(
      routes.map(({ asset, source, destination, contract, extrinsic }) => [
        `${asset.key}-${destination.chain.key}`,
        new AssetRoute({
          asset,
          source: { ...source, chain },
          destination,
          contract,
          extrinsic,
        }),
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
      (assetConfig) => assetConfig.destination.chain,
    );
  }

  getDestinationAssets(keyOrChain: string | AnyChain): Asset[] {
    const key = getKey(keyOrChain);

    return this.getRoutes()
      .filter((cfg) => cfg.destination.chain.key === key)
      .map((cfg) => cfg.asset);
  }

  getAssetRoute(
    asset: string | AnyAsset,
    destination: string | AnyChain,
  ): AssetRoute {
    const assetKey = getKey(asset);
    const destKey = getKey(destination);
    const route = this.#routes.get(`${assetKey}-${destKey}`);

    if (!route) {
      throw new Error(
        `AssetRoute for asset ${assetKey} and destination ${destKey} not found`,
      );
    }

    return route;
  }
}
