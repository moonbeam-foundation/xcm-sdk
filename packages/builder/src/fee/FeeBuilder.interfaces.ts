import type {
  AnyChain,
  AnyParachain,
  ChainAsset,
} from '@moonbeam-network/xcm-types';
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
  source: AnyChain;
}

export interface XcmPaymentFeeProps {
  isAssetReserveChain: boolean;
  shouldTransferAssetPrecedeFeeAsset?: boolean;
  isEcosystemBridge?: boolean;
  parents?: number;
}

export interface MoonbeamRuntimeXcmConfigAssetType extends Enum {
  readonly isXcm: boolean;
  readonly asXcm: StagingXcmV3MultiLocation;
  readonly type: 'Xcm';
}

export type GetVersionedAssetId = (
  params: FeeConfigBuilderParams,
) => Promise<object> | object;
