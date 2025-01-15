import type { AnyAsset, AnyChain } from '@moonbeam-network/xcm-types';
import { getKey } from '../config.utils';
import { ChainRoutes, type ChainRoutesConstructorParams } from './ChainRoutes';
import {
  MrlAssetRoute,
  type MrlAssetRouteConstructorParams,
  type MrlSourceConfig,
} from './MrlAssetRoute';

export interface MrlChainRoutesConstructorParams
  extends ChainRoutesConstructorParams {
  routes: MrlRoutesParam[];
}

interface MrlRoutesParam
  extends Omit<MrlAssetRouteConstructorParams, 'source'> {
  source: Omit<MrlSourceConfig, 'chain'>;
}

export class MrlChainRoutes extends ChainRoutes {
  readonly #routes: Map<string, MrlAssetRoute>;

  constructor({ chain, routes }: MrlChainRoutesConstructorParams) {
    super({ chain, routes });
    this.#routes = new Map(
      routes.map(({ source, destination, contract, extrinsic, mrl }) => [
        `${source.asset.key}-${destination.chain.key}`,
        new MrlAssetRoute({
          source: { ...source, chain },
          destination,
          contract,
          extrinsic,
          mrl,
        }),
      ]),
    );
  }

  getRoutes(): MrlAssetRoute[] {
    return Array.from(this.#routes.values());
  }

  getAssetRoute(
    asset: string | AnyAsset,
    destination: string | AnyChain,
  ): MrlAssetRoute {
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
