import { AnyChain, Asset } from '@moonbeam-network/xcm-types';
import { AssetRoute } from '../types/AssetRoute';

export interface TransferConfig {
  asset: Asset;
  source: ChainTransferConfig;
  destination: ChainTransferConfig;
}

export interface ChainTransferConfig {
  chain: AnyChain;
  config: AssetRoute;
}
