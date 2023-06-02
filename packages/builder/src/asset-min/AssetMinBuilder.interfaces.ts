import { ChainAssetId } from '@moonbeam-network/xcm-types';
import { SubstrateQueryConfig } from '../types/substrate/SubstrateQueryConfig';

export interface AssetMinConfigBuilder {
  build: (params: AssetMinConfigBuilderPrams) => SubstrateQueryConfig;
}

export interface AssetMinConfigBuilderPrams {
  asset: ChainAssetId;
}
