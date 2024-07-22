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
import { IConfigService } from './ConfigService.interfaces';

export interface ConfigServiceOptions {
  assets?: Map<string, Asset>;
  chains?: Map<string, AnyChain>;
  routes: Map<string, ChainRoutesConfig>;
}

export class ConfigService implements IConfigService {
  protected assets: Map<string, Asset>;

  protected chains: Map<string, AnyChain>;

  protected routes: Map<string, ChainRoutesConfig>;

  constructor(options: ConfigServiceOptions) {
    this.assets = options.assets ?? assetsMap;
    this.chains = options.chains ?? chainsMap;
    this.routes = options.routes;
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

  getAsset(keyOrAsset: string | Asset): Asset {
    const key = ConfigService.#getKey(keyOrAsset);
    const asset = this.assets.get(key);

    if (!asset) {
      throw new Error(`Asset ${key} not found`);
    }

    return asset;
  }

  getChain(keyOrAsset: string | AnyChain): AnyChain {
    const key = ConfigService.#getKey(keyOrAsset);
    const chain = this.chains.get(key);

    if (!chain) {
      throw new Error(`Chain ${key} not found`);
    }

    return chain;
  }

  getChainConfig(keyOrAsset: string | AnyChain): ChainRoutesConfig {
    const key = ConfigService.#getKey(keyOrAsset);
    const chainConfig = this.routes.get(key);

    if (!chainConfig) {
      throw new Error(`Chain config for ${key} not found`);
    }

    return chainConfig;
  }

  getSourceChains({
    asset,
    ecosystem,
  }: {
    asset?: Asset;
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
    asset?: Asset;
    source: AnyChain;
  }): AnyChain[] {
    const config = this.routes.get(source.key);

    if (!config) {
      throw new Error(`Chain routes config for chain ${source.key} not found`);
    }

    if (asset) {
      return config.getAssetDestinations(asset);
    }

    return config.getAssetsConfigs().map((cfg) => cfg.destination);
  }

  getAssetDestinationConfig(
    asset: Asset,
    source: AnyChain,
    destination: AnyChain,
  ): AssetTransferConfig {
    const chainConfig = this.routes.get(source.key);

    if (!chainConfig) {
      throw new Error(`Config for chain ${source.key} not found`);
    }

    return chainConfig.getAssetDestinationConfig(asset, destination);
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

  static #getKey(keyOrModel: string | AnyAsset | AnyChain): string {
    if (typeof keyOrModel === 'string') {
      return keyOrModel;
    }

    return keyOrModel.key;
  }
}
