export interface AssetConstructorParams {
  key: string;
  originSymbol: string;
}

export class Asset {
  key: string;

  originSymbol: string;

  constructor({ key, originSymbol }: AssetConstructorParams) {
    this.key = key;
    this.originSymbol = originSymbol;
  }
}
