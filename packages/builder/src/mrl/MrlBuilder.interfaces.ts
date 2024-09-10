import type {
  AnyChain,
  ChainAsset,
  EvmParachain,
} from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';
import type { HexString } from '@polkadot/util/types';
import type { BuilderPrams, ConfigBuilder } from '../builder.interfaces';
import type { WormholeConfig } from './providers/wormhole/wormhole';
import type { ExtrinsicConfig } from '../extrinsic';
import type { ContractConfig } from '../contract';

export type MrlConfigBuilder = ConfigBuilder<
  ContractConfig | ExtrinsicConfig | WormholeConfig,
  MrlBuilderParams
>;

export interface MrlBuilderParams extends BuilderPrams<AnyChain> {
  isAutomatic: boolean;
  moonApi: ApiPromise;
  moonAsset: ChainAsset;
  moonChain: EvmParachain;
  moonGasLimit?: bigint;
  transact?: Transact;
}

export interface Transact {
  call: HexString;
  txWeight: {
    refTime: bigint;
    proofSize: bigint;
  };
}
