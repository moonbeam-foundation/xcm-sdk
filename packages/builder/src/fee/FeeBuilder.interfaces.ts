import type { ChainAssetId } from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';
import type { ConfigBuilder } from '../builder.interfaces';
import type { SubstrateCallConfig } from '../types/substrate/SubstrateCallConfig';

export type FeeConfigBuilder = ConfigBuilder<
  SubstrateCallConfig,
  FeeConfigBuilderPrams
>;

export interface FeeConfigBuilderPrams {
  asset: ChainAssetId;
  api: ApiPromise;
}
