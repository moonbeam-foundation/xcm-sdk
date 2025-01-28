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

  copyWith(params: Partial<AssetConstructorParams>): Asset {
    return new Asset({
      ...this,
      ...params,
    });
  }

  isEqual(asset: Asset): boolean {
    return this.key === asset.key && this.originSymbol === asset.originSymbol;
  }
}
