import { Relay } from '../chain';

export interface AssetConstructorProps {
  isTestAsset?: boolean;
  key: string;
  originSymbol: string;
  relays: Relay[];
}

export class Asset {
  isTestAsset: boolean;

  key: string;

  originSymbol: string;

  relays: Relay[];

  constructor({
    isTestAsset = false,
    key,
    originSymbol,
    relays,
  }: AssetConstructorProps) {
    this.isTestAsset = isTestAsset;
    this.key = key;
    this.originSymbol = originSymbol;
    this.relays = relays;
  }
}
