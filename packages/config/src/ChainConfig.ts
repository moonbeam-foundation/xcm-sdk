import { Chain } from '@moonbeam-network/xcm-types';
import { AssetConfig } from './AssetConfig';

export interface ChainConfigConstructorParams {
  assets: AssetConfig[];
  chain: Chain;
}

export class ChainConfig {
  readonly assets: Map<string, AssetConfig>;

  readonly chain: Chain;

  constructor({ assets, chain }: ChainConfigConstructorParams) {
    this.assets = new Map(assets.map((asset) => [asset.asset.key, asset]));
    this.chain = chain;
  }
}
