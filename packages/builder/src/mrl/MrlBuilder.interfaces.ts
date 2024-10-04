import type {
  AnyChain,
  ChainAsset,
  EvmParachain,
} from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';
import type { HexString } from '@polkadot/util/types';
import type { BuilderPrams, ConfigBuilder } from '../builder.interfaces';
import type { ContractConfig } from '../contract';
import type { ExtrinsicConfig } from '../extrinsic';
import type { WormholeConfig } from './providers/wormhole/wormhole';

export type MrlConfigBuilder = ConfigBuilder<
  ContractConfig | ExtrinsicConfig | ExtrinsicWormholeConfig | WormholeConfig,
  MrlBuilderParams
>;

// TODO mjm improve this
export interface ExtrinsicWormholeConfig {
  extrinsic: ExtrinsicConfig;
  wormholeConfig: WormholeConfig;
}

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
