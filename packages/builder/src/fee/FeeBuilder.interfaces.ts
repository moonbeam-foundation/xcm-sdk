import { ChainAssetId } from '@moonbeam-network/xcm-types';
import { ApiPromise } from '@polkadot/api';
import { SubstrateCallConfig } from '../types/substrate/SubstrateCallConfig';

export interface FeeConfigBuilder {
  build: (params: FeeConfigBuilderPrams) => SubstrateCallConfig;
}

export interface FeeConfigBuilderPrams {
  asset: ChainAssetId;
  api: ApiPromise;
}
