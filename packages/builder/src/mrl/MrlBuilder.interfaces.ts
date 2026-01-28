import type {
  AnyChain,
  AnyParachain,
  AssetAmount,
  ChainAsset,
} from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';
import type { HexString } from '@polkadot/util/types';
import type { BuilderParams, ConfigBuilder } from '../builder.interfaces';
import type { ContractConfig } from '../contract';
import type { ExtrinsicConfig } from '../extrinsic';
import type { SnowbridgeConfig } from './providers/snowbridge/snowbridge';
import type { WormholeConfig } from './providers/wormhole/wormhole';

export enum Provider {
  Snowbridge = 'snowbridge',
  Wormhole = 'wormhole',
}

export type MrlTransferConfig =
  | ContractConfig
  | ExtrinsicConfig
  | WormholeConfig
  | SnowbridgeConfig;

export type MrlConfigBuilder = ConfigBuilder<
  MrlTransferConfig,
  MrlBuilderParams
> & {
  provider: Provider;
};

export type MrlExecuteConfigBuilder = ConfigBuilder<
  ContractConfig,
  MrlExecuteBuilderParams
>;

export interface MrlBuilderParams extends BuilderParams<AnyChain> {
  isAutomatic: boolean;
  protocolFee?: AssetAmount;
  bridgeChainFee?: AssetAmount;
  moonApi: ApiPromise;
  moonAsset: ChainAsset;
  bridgeChain: AnyParachain;
  bridgeChainGasLimit?: bigint;
  sendOnlyRemoteExecution?: boolean;
  transact?: Transact;
}

export interface MrlExecuteBuilderParams {
  bytes?: Uint8Array;
}

export interface Transact {
  call: HexString;
  txWeight: {
    refTime: bigint;
    proofSize: bigint;
  };
}
