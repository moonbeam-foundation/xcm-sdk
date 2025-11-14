import type { Chain } from '@wormhole-foundation/sdk-connect';
import type { EvmChain } from './EvmChain';
import type { EvmParachain, Parachain } from './parachain';

export type AnyChain = EvmChain | Parachain | EvmParachain;
export type AnyParachain = Parachain | EvmParachain;

export enum Ecosystem {
  Polkadot = 'polkadot',
  Kusama = 'kusama',
  AlphanetRelay = 'alphanet-relay',
  StagenetRelay = 'stagenet-relay',
  MoonlamaRelay = 'moonlama-relay',
  MoonsamaRelay = 'moonsama-relay',
  // TODO mjm maybe we could make it optional and not require it for all chains
  TanssiTestnet = 'tanssi-testnet',
}

export interface WormholeConfig {
  name?: Chain;
}
