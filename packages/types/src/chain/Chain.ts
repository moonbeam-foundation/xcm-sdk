import type { Chain as WhChain } from '@wormhole-foundation/sdk-connect';
import type { Asset, AssetAmount, ChainAsset } from '../asset';
import type { Ecosystem, WormholeConfig } from './Chain.interfaces';

export interface ChainConstructorParams {
  assets: Map<string, ChainAsset> | ChainAsset[];
  ecosystem?: Ecosystem;
  explorer?: string;
  isTestChain?: boolean;
  key: string;
  name: string;
  nativeAsset: Asset;
  wh?: WormholeConfig;
}

export abstract class Chain {
  readonly assets: Map<string, ChainAsset>;

  readonly ecosystem?: Ecosystem;

  readonly explorer?: string;

  readonly isTestChain: boolean;

  readonly key: string;

  readonly name: string;

  readonly #nativeAsset: Asset;

  readonly wh?: WormholeConfig;

  constructor({
    assets,
    ecosystem,
    explorer,
    isTestChain = false,
    key,
    name,
    nativeAsset,
    wh,
  }: ChainConstructorParams) {
    this.assets =
      assets instanceof Map
        ? assets
        : new Map(assets?.map((data) => [data.key, data]));
    this.ecosystem = ecosystem;
    this.explorer = explorer;
    this.isTestChain = isTestChain;
    this.key = key;
    this.name = name;
    this.#nativeAsset = nativeAsset;
    this.wh = wh;
  }

  get nativeAsset(): ChainAsset {
    return this.getChainAsset(this.#nativeAsset);
  }

  isEqual<T extends Chain>(chain: T): boolean {
    return this.key === chain.key;
  }

  getChainAsset(keyOrAsset: string | Asset | AssetAmount): ChainAsset {
    const key = typeof keyOrAsset === 'string' ? keyOrAsset : keyOrAsset.key;
    const chainAsset = this.assets.get(key);

    if (!chainAsset) {
      throw new Error(
        `No ChainAsset found by the key ${key} for chain ${this.name} (${this.key})`,
      );
    }

    return chainAsset;
  }

  getWormholeName(): WhChain {
    if (!this.wh?.name) {
      throw new Error(`Chain ${this.name} does not have a wormhole name`);
    }

    return this.wh.name;
  }
}
