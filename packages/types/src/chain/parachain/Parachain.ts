import { Asset, ChainAsset } from '../../asset';
import { SetOptional } from '../../common.interfaces';
import { Chain, ChainConstructorParams } from '../Chain';
import { ChainType } from '../Chain.interfaces';

export interface ParachainConstructorParams
  extends SetOptional<ChainConstructorParams, 'type'> {
  assets?: Map<string, ChainAsset> | ChainAsset[];
  genesisHash: string;
  parachainId: number;
  ss58Format: number;
  usesChainDecimals?: boolean;
  weight?: number;
  ws: string | string[];
}

export class Parachain extends Chain {
  readonly assets: Map<string, ChainAsset>;

  readonly genesisHash: string;

  readonly parachainId: number;

  readonly ss58Format: number;

  readonly usesChainDecimals: boolean;

  readonly weight: number | undefined;

  readonly ws: string | string[];

  constructor({
    assets,
    genesisHash,
    parachainId,
    usesChainDecimals,
    ss58Format,
    weight,
    ws,
    type = ChainType.Parachain,
    ...others
  }: ParachainConstructorParams) {
    super({ type, ...others });

    this.assets =
      assets instanceof Map
        ? assets
        : new Map(assets?.map((data) => [data.key, data]));
    this.genesisHash = genesisHash;
    this.parachainId = parachainId;
    this.ss58Format = ss58Format;
    this.usesChainDecimals = !!usesChainDecimals;
    this.weight = weight;
    this.ws = ws;
  }

  getChainAsset(keyOrAsset: string | Asset): ChainAsset {
    const key = typeof keyOrAsset === 'string' ? keyOrAsset : keyOrAsset.key;
    const chainAsset = this.assets.get(key);

    if (!chainAsset) {
      throw new Error(
        `No ChainAsset found by the key ${key} for chain ${this.name} (${this.key})`,
      );
    }

    return chainAsset;
  }
}
