import { AnyChain, ChainAssetId } from '@moonbeam-network/xcm-types';
import { ContractConfig } from './ContractConfig';

export interface ContractConfigBuilder {
  build: (params: ContractConfigBuilderPrams) => ContractConfig;
}

export interface ContractConfigBuilderPrams {
  address: string;
  amount: bigint;
  asset: ChainAssetId;
  destination: AnyChain;
  fee: bigint;
  feeAsset: ChainAssetId;
}
