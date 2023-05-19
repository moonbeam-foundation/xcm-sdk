import { ChainAssetId } from '@moonbeam-network/xcm-types';
import { ApiPromise } from '@polkadot/api';
import { QueryConfig } from '../QueryConfig';

export interface FeeConfigBuilder {
  build: (params: FeeConfigBuilderPrams) => QueryConfig;
}

export interface FeeConfigBuilderPrams {
  asset: ChainAssetId;
  api: ApiPromise;
}
