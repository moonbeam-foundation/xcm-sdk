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
}
