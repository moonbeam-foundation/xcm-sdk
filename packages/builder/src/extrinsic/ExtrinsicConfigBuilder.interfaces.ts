import { Chain } from '@moonbeam-network/xcm-types';
import { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import { ExtrinsicConfig } from './ExtrinsicConfig';

export interface ExtrinsicConfigBuilder {
  build: (params: ExtrinsicConfigBuilderPrams) => ExtrinsicConfig;
}

export interface ExtrinsicConfigBuilderPrams {
  address: string;
  amount: bigint;
  asset: ExtrinsicAssetId;
  destination: Chain;
  extrinsicFunction: SubmittableExtrinsicFunction<'promise'>;
  fee: bigint;
  feeAsset: ExtrinsicAssetId;
  origin: Chain;
  source: Chain;
}

export type ExtrinsicAssetId =
  | string
  | number
  | bigint
  | { [key: string]: string | number | bigint };
