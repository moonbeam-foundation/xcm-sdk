import { Ecosystem } from '../chain';

export interface AssetConstructorProps {
  isTestAsset?: boolean;
  key: string;
  originSymbol: string;
  ecosystems: Ecosystem[];
}

export class Asset {
  isTestAsset: boolean;

  key: string;

  originSymbol: string;

  ecosystems: Ecosystem[];

  constructor({
    isTestAsset = false,
    key,
    originSymbol,
    ecosystems,
  }: AssetConstructorProps) {
    this.isTestAsset = isTestAsset;
    this.key = key;
    this.originSymbol = originSymbol;
    this.ecosystems = ecosystems;
  }
}
