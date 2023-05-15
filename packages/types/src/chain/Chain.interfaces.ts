import { EvmParachain, Parachain } from './parachain';

export type AnyChain = Parachain | EvmParachain;

export enum Ecosystem {
  Polkadot = 'Polkadot',
  Kusama = 'Kusama',
  AlphanetRelay = 'AlphanetRelay',
}
