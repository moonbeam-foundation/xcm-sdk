import { Chain } from '@moonbeam-network/xcm-types';
import { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import { ExtrinsicConfig } from './ExtrinsicConfig';

export interface ExtrinsicConfigBuilder {
  build: (params: ExtrinsicConfigBuilderPrams) => ExtrinsicConfig;
}

export interface ExtrinsicConfigBuilderPrams {
  address: string;
  amount: bigint;
  asset: string | number | bigint;
  destination: Chain;
  extrinsicFunction: SubmittableExtrinsicFunction<'promise'>;
  feeAsset: string | number | bigint;
  source: Chain;
}
