import {
  AnyChain,
  AssetAmount,
  EvmParachain,
} from '@moonbeam-network/xcm-types';
import { WormholeConfig } from './WormholeConfig';

export interface WormholeConfigBuilder {
  build: (params: WormholeConfigBuilderPrams) => WormholeConfig;
}

export interface WormholeConfigBuilderPrams {
  asset: AssetAmount;
  destination: AnyChain;
  destinationAddress: string;
  moonChain: EvmParachain;
  source: AnyChain;
  sourceAddress: string;
}
