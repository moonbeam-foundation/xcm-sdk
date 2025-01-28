import type { AnyParachain, ChainAsset } from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';
import type { Enum } from '@polkadot/types';
import type { StagingXcmV3MultiLocation } from '@polkadot/types/lookup';
import type { ConfigBuilder } from '../builder.interfaces';
import type { SubstrateCallConfig } from '../types/substrate/SubstrateCallConfig';

export type FeeConfigBuilder = ConfigBuilder<
  SubstrateCallConfig,
  FeeConfigBuilderParams
>;

export interface FeeConfigBuilderParams {
  address: string;
  api: ApiPromise;
  asset: ChainAsset;
  destination: AnyParachain;
  feeAsset: ChainAsset;
}

export interface XcmPaymentFeeProps {
  isAssetReserveChain: boolean;
  shouldTransferAssetPrecedeFeeAsset?: boolean;
}

export interface MoonbeamRuntimeXcmConfigAssetType extends Enum {
  readonly isXcm: boolean;
  readonly asXcm: StagingXcmV3MultiLocation;
  readonly type: 'Xcm';
}
