import type {
  AnyAsset,
  AnyChain,
  Asset,
  Ecosystem,
} from '@moonbeam-network/xcm-types';
import { assetsMap } from '../assets';
import { chainsMap } from '../chains';
import { getKey } from '../config.utils';
import type { AssetRoute } from '../types/AssetRoute';
import type { ChainRoutes } from '../types/ChainRoutes';
import type { MrlAssetRoute } from '../types/MrlAssetRoute';
import type { MrlChainRoutes } from '../types/MrlChainRoutes';

export interface ConfigServiceOptions {
  assets?: Map<string, Asset>;
  chains?: Map<string, AnyChain>;
  routes: Map<string, ChainRoutes | MrlChainRoutes>;
}

export class ConfigService {
  protected assets: Map<string, Asset>;

  protected chains: Map<string, AnyChain>;

  protected routes: Map<string, ChainRoutes | MrlChainRoutes>;

  constructor(options: ConfigServiceOptions) {
    this.assets = options.assets ?? assetsMap;
    this.chains = options.chains ?? chainsMap;
    this.routes = options.routes;
  }

  getAsset(keyOrAsset: string | Asset): Asset {
    const key = getKey(keyOrAsset);
    const asset = this.assets.get(key);

    if (!asset) {
      throw new Error(`Asset ${key} not found`);
    }

    return asset;
  }

  getEcosystemAssets(ecosystem?: Ecosystem): Asset[] {
    if (!ecosystem) {
      return Array.from(this.assets.values());
    }

    return Array.from(
      new Set(
        Array.from(this.routes.values())
          .filter((routes) => routes.chain.ecosystem === ecosystem)
          .map((routes) => routes.getRoutes())
          .flat(2)
          .map((route) => route.source.asset),
      ),
    ).sort((a, b) => a.key.localeCompare(b.key));
  }

  getChain(keyOrChain: string | AnyChain): AnyChain {
    const key = getKey(keyOrChain);
    const chain = this.chains.get(key);

    if (!chain) {
      throw new Error(`Chain ${key} not found`);
    }

    return chain;
  }

  getChainRoutes(keyOrChain: string | AnyChain): ChainRoutes | MrlChainRoutes {
    const key = getKey(keyOrChain);
    const route = this.routes.get(key);

    if (!route) {
      throw new Error(`ChainRoute for ${key} not found`);
    }

    return route;
  }

  getSourceChains({
    asset,
    ecosystem,
  }: {
    asset?: string | Asset;
    ecosystem?: Ecosystem;
  }): AnyChain[] {
    const routes = Array.from(this.routes.values()).filter(
      (chainRoutes) => !ecosystem || chainRoutes.chain.ecosystem === ecosystem,
    );

    if (!asset) {
      return routes.map((route) => route.chain);
    }

    return routes
      .filter((route) => route.getAssetRoutes(asset).length)
      .map((route) => route.chain);
  }

  getDestinationChains({
    asset,
    source,
  }: {
    asset?: string | AnyAsset;
    source: string | AnyChain;
  }): AnyChain[] {
    const chainRoutes = this.getChainRoutes(source);

    if (asset) {
      return chainRoutes.getAssetDestinations(asset);
    }

    return Array.from(
      new Set(
        chainRoutes.getRoutes().map((routes) => routes.destination.chain),
      ),
    );
  }

  getAssetRoute({
    asset,
    source,
    destination,
  }: {
    asset: string | AnyAsset;
    source: string | AnyChain;
    destination: string | AnyChain;
  }): AssetRoute | MrlAssetRoute {
    const routes = this.getChainRoutes(source);

    return routes.getAssetRoute(asset, destination);
  }

  getRouteAssets({
    source,
    destination,
  }: {
    source: string | AnyChain;
    destination: string | AnyChain;
  }): Asset[] {
    const routes = this.getChainRoutes(source);

    return routes.getDestinationAssets(destination);
  }

  updateAsset(asset: Asset): void {
    this.assets.set(asset.key, asset);
  }

  updateChain(chain: AnyChain): void {
    this.chains.set(chain.key, chain);
  }

  updateChainRoute(route: ChainRoutes): void {
    this.routes.set(route.chain.key, route);
  }
}
