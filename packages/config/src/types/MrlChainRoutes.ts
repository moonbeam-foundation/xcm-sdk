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
}
