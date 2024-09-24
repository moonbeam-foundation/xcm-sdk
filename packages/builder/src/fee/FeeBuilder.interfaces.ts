import { AnyParachain, ChainAssetId } from '@moonbeam-network/xcm-types';
import { ApiPromise } from '@polkadot/api';
import { Enum } from '@polkadot/types';
import { StagingXcmV3MultiLocation } from '@polkadot/types/lookup';
import { SubstrateCallConfig } from '../types/substrate/SubstrateCallConfig';

export interface FeeConfigBuilder {
  build: (params: FeeConfigBuilderPrams) => SubstrateCallConfig;
}

export interface FeeConfigBuilderPrams {
  address: string;
  api: ApiPromise;
  feeAsset: ChainAssetId;
  transferAsset: ChainAssetId;
  chain: AnyParachain;
}

export interface XcmPaymentFeeProps {
  isAssetReserveChain: boolean;
  shouldTransferAssetPrecedeAsset?: boolean;
}

export interface MoonbeamRuntimeXcmConfigAssetType extends Enum {
  readonly isXcm: boolean;
  readonly asXcm: StagingXcmV3MultiLocation;
  readonly type: 'Xcm';
}
