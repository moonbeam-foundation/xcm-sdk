import { AnyChain, Asset } from '@moonbeam-network/xcm-types';
import { AssetConfig } from './AssetConfig';

export interface TransferConfig {
  asset: Asset;
  source: {
    chain: AnyChain;
    config: AssetConfig;
  };
  destination: {
    chain: AnyChain;
    config: AssetConfig;
  };
}
