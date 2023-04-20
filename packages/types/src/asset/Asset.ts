export interface AssetConstructorProps {
  key: string;
  originSymbol: string;
}

export class Asset {
  key: string;

  originSymbol: string;

  constructor({ key, originSymbol }: AssetConstructorProps) {
    this.key = key;
    this.originSymbol = originSymbol;
  }
}
