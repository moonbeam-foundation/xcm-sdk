import type { AnyParachain, ChainAsset } from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';
import type { Enum } from '@polkadot/types';
import type { StagingXcmV3MultiLocation } from '@polkadot/types/lookup';
import type { ConfigBuilder } from '../builder.interfaces';
import type { SubstrateCallConfig } from '../types/substrate/SubstrateCallConfig';

export type FeeConfigBuilder = ConfigBuilder<
  SubstrateCallConfig,
  FeeConfigBuilderPrams
>;

export interface FeeConfigBuilderPrams {
  address: string;
  api: ApiPromise;
  asset: ChainAsset;
  chain: AnyParachain;
  transferAsset: ChainAsset;
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
