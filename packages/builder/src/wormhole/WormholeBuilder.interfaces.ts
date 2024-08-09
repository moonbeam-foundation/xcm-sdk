import { AnyChain, AssetAmount } from '@moonbeam-network/xcm-types';
import { WormholeConfig } from './WormholeConfig';

export interface WormholeConfigBuilder {
  build: (params: WormholeConfigBuilderPrams) => WormholeConfig;
}

export interface WormholeConfigBuilderPrams {
  asset: AssetAmount;
  destination: AnyChain;
  destinationAddress: string;
  source: AnyChain;
  sourceAddress: string;
  payload?: Uint8Array;
}
