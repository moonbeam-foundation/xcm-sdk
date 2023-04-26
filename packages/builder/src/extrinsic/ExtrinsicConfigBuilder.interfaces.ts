import { EthereumChain, SubstrateChain } from '@moonbeam-network/xcm-types';
import { ExtrinsicConfig } from './ExtrinsicConfig';

export interface ExtrinsicConfigBuilder {
  build: (params: ExtrinsicConfigBuilderPrams) => ExtrinsicConfig;
}

export interface ExtrinsicConfigBuilderPrams {
  address: string;
  amount: bigint;
  asset: ExtrinsicAssetId;
  destination: SubstrateChain | EthereumChain;
  fee: bigint;
  feeAsset: ExtrinsicAssetId;
  origin: SubstrateChain | EthereumChain;
  palletInstance?: number;
  source: SubstrateChain | EthereumChain;
}

export type ExtrinsicAssetId =
  | string
  | number
  | bigint
  | { [key: string]: string | number | bigint };

export enum XcmMultiLocationVersion {
  v1 = 'V1',
  v2 = 'V2',
}

export type Parents = 0 | 1;
