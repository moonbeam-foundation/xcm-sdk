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
  SubstrateCallConfig | ContractConfig,
  FeeConfigBuilderParams
>;

export type BridgeFeeConfigBuilder = ConfigBuilder<
  SubstrateQueryConfig | ContractConfig,
  BridgeFeeConfigBuilderParams
>;

export interface FeeConfigBuilderParams {
  address: string;
  api: ApiPromise;
  asset: ChainAsset;
  balance?: AssetAmount;
  destination: AnyChain;
  feeAsset: ChainAsset;
  source: AnyChain;
}

// TODO mjm rename to ProtocolFee...?
export interface BridgeFeeConfigBuilderParams
  extends Omit<FeeConfigBuilderParams, 'api'> {
  bridgeChainFee: AssetAmount;
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
