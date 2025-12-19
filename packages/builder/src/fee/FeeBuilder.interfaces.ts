import type {
  AnyChain,
  AssetAmount,
  ChainAsset,
} from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';
import type { Enum } from '@polkadot/types';
import type { StagingXcmV3MultiLocation } from '@polkadot/types/lookup';
import type { ConfigBuilder } from '../builder.interfaces';
import type { SubstrateQueryConfig } from '../types';
import type { ContractConfig } from '../types/evm/ContractConfig';
import type { SubstrateCallConfig } from '../types/substrate/SubstrateCallConfig';

export type FeeConfigBuilder = ConfigBuilder<
  SubstrateCallConfig | SubstrateQueryConfig | ContractConfig,
  FeeConfigBuilderParams
>;

export type BridgeFeeConfigBuilder = ConfigBuilder<
  SubstrateQueryConfig | ContractConfig,
  BridgeFeeConfigBuilderParams
>;

export interface BaseFeeConfigBuilderParams {
  address: string;
  asset: ChainAsset;
  feeAsset: ChainAsset;
  balance?: AssetAmount;
  source: AnyChain;
  destination: AnyChain;
  api?: ApiPromise;
}

export interface FeeConfigBuilderParams extends BaseFeeConfigBuilderParams {
  api: ApiPromise;
}

export interface BridgeFeeConfigBuilderParams
  extends BaseFeeConfigBuilderParams {}

export type AnyFeeConfigBuilder = FeeConfigBuilder | BridgeFeeConfigBuilder;

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
