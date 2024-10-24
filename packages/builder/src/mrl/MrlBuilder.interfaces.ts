import type {
  AnyChain,
  ChainAsset,
  EvmParachain,
} from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';
import type { HexString } from '@polkadot/util/types';
import type { BuilderParams, ConfigBuilder } from '../builder.interfaces';
import type { ContractConfig } from '../contract';
import type { ExtrinsicConfig } from '../extrinsic';
import type { WormholeConfig } from './providers/wormhole/wormhole';

export type MrlConfigBuilder = ConfigBuilder<
  ContractConfig | ExtrinsicConfig | WormholeConfig,
  MrlBuilderParams
>;

export type MrlRedeemConfigBuilder = ConfigBuilder<
  ContractConfig,
  MrlRedeemBuilderParams
>;

export interface MrlBuilderParams extends BuilderParams<AnyChain> {
  isAutomatic: boolean;
  moonApi: ApiPromise;
  moonAsset: ChainAsset;
  moonChain: EvmParachain;
  moonGasLimit?: bigint;
  transact?: Transact;
}

export interface MrlRedeemBuilderParams {
  bytes?: Uint8Array;
}

export interface Transact {
  call: HexString;
  txWeight: {
    refTime: bigint;
    proofSize: bigint;
  };
}
