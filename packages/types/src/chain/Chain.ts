import { Asset, AssetAmount, ChainAsset } from '../asset';
import { ChainType, Ecosystem } from './Chain.interfaces';
import type { EvmParachain, Parachain } from './parachain';

export interface ChainConstructorParams {
  assets?: Map<string, ChainAsset> | ChainAsset[];
  ecosystem?: Ecosystem;
  isTestChain?: boolean;
  key: string;
  name: string;
  nativeAsset: Asset;
  type: ChainType;
}

export abstract class Chain {
  readonly assets: Map<string, ChainAsset>;

  readonly ecosystem?: Ecosystem;

  readonly isTestChain: boolean;

  readonly key: string;

  readonly name: string;

  readonly #nativeAsset: Asset;

  readonly type: ChainType;

  constructor({
    assets,
    ecosystem,
    isTestChain = false,
    key,
    name,
    nativeAsset,
    type,
  }: ChainConstructorParams) {
    this.assets =
      assets instanceof Map
        ? assets
        : new Map(assets?.map((data) => [data.key, data]));
    this.ecosystem = ecosystem;
    this.isTestChain = isTestChain;
    this.key = key;
    this.name = name;
    this.#nativeAsset = nativeAsset;
    this.type = type;
  }

  get nativeAsset(): ChainAsset {
    return this.getChainAsset(this.#nativeAsset);
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

  isParachain(): this is Parachain {
    return this.type === ChainType.Parachain;
  }

  isEvmParachain(): this is EvmParachain {
    return this.type === ChainType.EvmParachain;
  }
}
