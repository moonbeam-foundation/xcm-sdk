import type { ChainAssetId } from '@moonbeam-network/xcm-types';
import type { ConfigBuilder } from '../builder.interfaces';
import type { SubstrateQueryConfig } from '../types/substrate/SubstrateQueryConfig';

export type AssetMinConfigBuilder = ConfigBuilder<
  SubstrateQueryConfig,
  AssetMinConfigBuilderParams
>;

export interface AssetMinConfigBuilderParams {
  address?: string;
  asset: ChainAssetId;
}
