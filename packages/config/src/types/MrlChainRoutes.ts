import type { AnyAsset, AnyChain } from '@moonbeam-network/xcm-types';
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
  protected routes: Map<string, MrlAssetRoute>;

  constructor({ chain, routes }: MrlChainRoutesConstructorParams) {
    super({ chain, routes });
    this.routes = new Map(
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
    return Array.from(this.routes.values());
  }

  getAssetRoute(
    asset: string | AnyAsset,
    destination: string | AnyChain,
  ): MrlAssetRoute {
    const route = super.getAssetRoute(asset, destination);
    // Since we know this class only stores MrlAssetRoute instances,
    // we can safely cast the parent's return value
    return route as MrlAssetRoute;
  }
}
