// eslint-disable-next-line import/no-cycle
import { ChainConfig } from '../interfaces/xcm-config.interfaces';

export const PARACHAIN_ID = 2004;

export enum Chains {
  Polkadot = 'Polkadot',
  Acala = 'Acala',
  Parallel = 'Parallel',
}

export const ChainsConfig: Record<Chains, ChainConfig> = {
  [Chains.Polkadot]: {
    name: 'Polkadot',
    ws: 'wss://rpc.polkadot.io',
    weight: 1_000_000_000,
    explorer: 'https://polkadot.subscan.io',
  },
  [Chains.Acala]: {
    name: 'Acala',
    ws: 'wss://acala-polkadot.api.onfinality.io/public-ws',
    parachainId: 2000,
    weight: 1_000_000_000,
    explorer: 'https://acala.subscan.io',
  },
  [Chains.Parallel]: {
    name: 'Parallel',
    ws: 'wss://rpc.parallel.fi',
    parachainId: 2012,
    weight: 1_000_000_000,
    explorer: 'https://parallel.subscan.io',
  },
};

export const { Polkadot, Acala, Parallel } = ChainsConfig;
