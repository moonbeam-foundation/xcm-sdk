import type { EvmParachain, Parachain } from './parachain';

export type AnyChain = Parachain | EvmParachain;
export type AnyParachain = Parachain | EvmParachain;

export enum ChainType {
  'Parachain' = 'parachain',
  'EvmParachain' = 'evm-parachain',
}

export enum Ecosystem {
  Polkadot = 'polkadot',
  Kusama = 'kusama',
  AlphanetRelay = 'alphanet-relay',
}
