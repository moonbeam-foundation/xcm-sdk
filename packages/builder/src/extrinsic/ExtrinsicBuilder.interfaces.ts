import {
  ChainAssetId,
  EthereumChain,
  SubstrateChain,
} from '@moonbeam-network/xcm-types';
import { ExtrinsicConfig } from './ExtrinsicConfig';

export interface ExtrinsicConfigBuilder {
  build: (params: ExtrinsicConfigBuilderPrams) => ExtrinsicConfig;
}

export interface ExtrinsicConfigBuilderPrams {
  address: string;
  amount: bigint;
  asset: ChainAssetId;
  destination: SubstrateChain | EthereumChain;
  fee: bigint;
  feeAsset: ChainAssetId;
  origin: SubstrateChain | EthereumChain;
  palletInstance?: number;
  source: SubstrateChain | EthereumChain;
}

export enum XcmMultiLocationVersion {
  v1 = 'V1',
  v2 = 'V2',
}

export type Parents = 0 | 1;
