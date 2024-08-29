import type { ChainAssetId } from '@moonbeam-network/xcm-types';
import type { SubstrateQueryConfig } from '../types/substrate/SubstrateQueryConfig';
import type { ConfigBuilder } from '../builder.interfaces';

export type AssetMinConfigBuilder = ConfigBuilder<
  SubstrateQueryConfig,
  AssetMinConfigBuilderPrams
>;

export interface AssetMinConfigBuilderPrams {
  asset: ChainAssetId;
}
