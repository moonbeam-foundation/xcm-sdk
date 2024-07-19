import { AnyChain, Asset } from '@moonbeam-network/xcm-types';
import { AssetTransferConfig } from '../types/AssetTransferConfig';

export interface TransferConfig {
  asset: Asset;
  source: ChainTransferConfig;
  destination: ChainTransferConfig;
}

export interface ChainTransferConfig {
  chain: AnyChain;
  config: AssetTransferConfig;
}
