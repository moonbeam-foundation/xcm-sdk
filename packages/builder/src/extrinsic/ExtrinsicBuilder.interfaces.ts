import { AnyParachain, ChainAssetId } from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';
import { ExtrinsicConfig } from './ExtrinsicConfig';

export interface ExtrinsicConfigBuilder {
  build: (params: ExtrinsicConfigBuilderPrams) => ExtrinsicConfig;
}

export interface ExtrinsicConfigBuilderPrams {
  address: string;
  api: ApiPromise;
  amount: bigint;
  asset: ChainAssetId;
  destination: AnyParachain;
  fee: bigint;
  feeAsset: ChainAssetId;
  palletInstance?: number;
  source: AnyParachain;
}

export enum XcmVersion {
  v1 = 'V1',
  v2 = 'V2',
  v3 = 'V3',
}

export type Parents = 0 | 1;
