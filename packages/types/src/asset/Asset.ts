/* eslint-disable import/no-cycle */
import { Omit } from 'viem/chains';
import { ChainAsset, ChainAssetConstructorParams } from './ChainAsset';

export interface AssetConstructorParams {
  key: string;
  originSymbol: string;
}

export class Asset {
  readonly key: string;

  readonly originSymbol: string;

  constructor({ key, originSymbol }: AssetConstructorParams) {
    this.key = key;
    this.originSymbol = originSymbol;
  }

  toChainAsset(
    params: Omit<ChainAssetConstructorParams, keyof AssetConstructorParams>,
  ): ChainAsset {
    return new ChainAsset({
      key: this.key,
      originSymbol: this.originSymbol,
      ...params,
    });
  }

  isEqual(asset: Asset): boolean {
    return this.key === asset.key && this.originSymbol === asset.originSymbol;
  }
}
