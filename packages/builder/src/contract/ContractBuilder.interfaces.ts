import { AnyParachain, ChainAssetId } from '@moonbeam-network/xcm-types';
import { ContractConfig } from './ContractConfig';

export interface ContractConfigBuilder {
  build: (params: ContractConfigBuilderPrams) => ContractConfig;
}

export interface ContractConfigBuilderPrams {
  address: string;
  amount: bigint;
  asset: ChainAssetId;
  destination: AnyParachain;
  fee: bigint;
  feeAsset: ChainAssetId;
}
