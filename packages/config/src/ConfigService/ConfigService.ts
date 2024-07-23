import {
  AnyAsset,
  AnyChain,
  Asset,
  Ecosystem,
} from '@moonbeam-network/xcm-types';
import { assetsMap } from '../assets';
import { chainsMap } from '../chains';
import { AssetTransferConfig } from '../types/AssetTransferConfig';
import { ChainRoutesConfig } from '../types/ChainRoutesConfig';
import { getKey } from '../config.utils';

export interface ConfigServiceOptions {
  assets?: Map<string, Asset>;
  chains?: Map<string, AnyChain>;
  routes: Map<string, ChainRoutesConfig>;
}

export class ConfigService {
  protected assets: Map<string, Asset>;

  protected chains: Map<string, AnyChain>;

  protected routes: Map<string, ChainRoutesConfig>;

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
          .filter((chainConfig) => chainConfig.chain.ecosystem === ecosystem)
          .map((chainConfig) => chainConfig.getAssetsConfigs())
          .flat(2)
          .map((assetConfig) => assetConfig.asset),
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

  getChainRoutesConfig(keyOrChain: string | AnyChain): ChainRoutesConfig {
    const key = getKey(keyOrChain);
    const config = this.routes.get(key);

    if (!config) {
      throw new Error(`Chain config for ${key} not found`);
    }

    return config;
  }

  getSourceChains({
    asset,
    ecosystem,
  }: {
    asset?: string | Asset;
    ecosystem?: Ecosystem;
  }): AnyChain[] {
    const configs = Array.from(this.routes.values()).filter(
      (cfg) => !ecosystem || cfg.chain.ecosystem === ecosystem,
    );

    if (!asset) {
      return configs.map((cfg) => cfg.chain);
    }

    return configs
      .filter((cfg) => cfg.getAssetConfigs(asset).length)
      .map((cfg) => cfg.chain);
  }

  getDestinationChains({
    asset,
    source,
  }: {
    asset?: string | AnyAsset;
    source: string | AnyChain;
  }): AnyChain[] {
    const config = this.getChainRoutesConfig(source);

    if (asset) {
      return config.getAssetDestinations(asset);
    }

    return Array.from(
      new Set(config.getAssetsConfigs().map((cfg) => cfg.destination)),
    );
  }

  getAssetDestinationConfig({
    asset,
    source,
    destination,
  }: {
    asset: string | AnyAsset;
    source: string | AnyChain;
    destination: string | AnyChain;
  }): AssetTransferConfig {
    const config = this.getChainRoutesConfig(source);

    return config.getAssetDestinationConfig(asset, destination);
  }

  getRouteAssets({
    source,
    destination,
  }: {
    source: string | AnyChain;
    destination: string | AnyChain;
  }): Asset[] {
    const config = this.getChainRoutesConfig(source);

    return config.getDestinationAssets(destination);
  }

  updateAsset(asset: Asset): void {
    this.assets.set(asset.key, asset);
  }

  updateChain(chain: AnyChain): void {
    this.chains.set(chain.key, chain);
  }

  updateChainConfig(chainConfig: ChainRoutesConfig): void {
    this.routes.set(chainConfig.chain.key, chainConfig);
  }
}
