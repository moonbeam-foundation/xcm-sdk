import {
  ChainAssetId,
  EthereumChain,
  SubstrateChain,
} from '@moonbeam-network/xcm-types';
import { ContractConfig } from './ContractConfig';

export interface ContractConfigBuilder {
  build: (params: ContractConfigBuilderPrams) => ContractConfig;
}

export interface ContractConfigBuilderPrams {
  address: string;
  amount: bigint;
  asset: ChainAssetId;
  destination: EthereumChain | SubstrateChain;
  fee: bigint;
  feeAsset: ChainAssetId;
  origin: SubstrateChain | EthereumChain;
  source: SubstrateChain | EthereumChain;
}
