import { EvmParachain, Parachain } from './parachain';

export type AnyChain = Parachain | EvmParachain;

export enum Ecosystem {
  Polkadot = 'polkadot',
  Kusama = 'kusama',
  AlphanetRelay = 'alphanet-relay',
}
