import { Chain } from '@moonbeam-network/xcm-types';
import { AssetConfig } from './AssetConfig';

export interface ChainConfigConstructorParams {
  assets: AssetConfig[];
  chain: Chain;
}

export class ChainConfig {
  readonly assets: Map<string, AssetConfig[]> = new Map();

  readonly chain: Chain;

  constructor({ assets, chain }: ChainConfigConstructorParams) {
    this.chain = chain;

    assets.forEach((asset) => {
      const configs = this.assets.get(asset.asset.key) || [];

      configs.push(asset);

      this.assets.set(asset.asset.key, configs);
    });
  }
}
