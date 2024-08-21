import type { ChainAsset, EvmParachain } from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';
import type { HexString } from '@polkadot/util/types';
import type { BuilderPrams, ConfigBuilder } from '../builder.interfaces';
import type { WormholeConfig } from './wormhole/WormholeSdk';
import type { ExtrinsicConfig } from '../extrinsic';

export type MrlConfigBuilder = ConfigBuilder<
  ExtrinsicConfig | WormholeConfig,
  MrlBuilderPrams
>;

export interface MrlBuilderPrams extends BuilderPrams {
  moonApi: ApiPromise;
  moonAsset: ChainAsset;
  moonChain: EvmParachain;
  moonGasLimit: bigint;
  transact?: {
    call: HexString;
    txWeight: {
      refTime: bigint;
      proofSize: bigint;
    };
  };
}
