import {
  AnyChain,
  AssetAmount,
  EvmParachain,
} from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';
import { WormholeConfig } from './WormholeConfig';

export interface WormholeConfigBuilder {
  build: (params: WormholeConfigBuilderPrams) => WormholeConfig;
}

export interface WormholeConfigBuilderPrams {
  asset: AssetAmount;
  destination: AnyChain;
  destinationAddress: string;
  moonApi: ApiPromise;
  moonChain: EvmParachain;
  source: AnyChain;
  sourceAddress: string;
}
