// eslint-disable-next-line import/no-cycle
import { MoonChain } from '../interfaces';

export enum MoonChainKey {
  MoonbaseAlpha = 'MoonbaseAlpha',
  Moonbeam = 'Moonbeam',
  Moonriver = 'Moonriver',
}
export const MOON_CHAINS: Record<MoonChainKey, MoonChain> = {
  [MoonChainKey.MoonbaseAlpha]: {
    key: MoonChainKey.MoonbaseAlpha,
    name: 'Moonbase Alpha',
    ws: 'wss://wss.api.moonbase.moonbeam.network',
    parachainId: 1000,
    decimals: 18,
    unitsPerSecond: 50_000_000_000_000_000n,
  },
  [MoonChainKey.Moonbeam]: {
    key: MoonChainKey.Moonbeam,
    name: 'Moonbeam',
    ws: 'wss://wss.api.moonbeam.network',
    parachainId: 2004,
    decimals: 18,
    unitsPerSecond: 10_000_000_000_000_000_000n,
  },
  [MoonChainKey.Moonriver]: {
    key: MoonChainKey.Moonriver,
    name: 'Moonriver',
    ws: 'wss://wss.api.moonriver.moonbeam.network',
    parachainId: 2023,
    decimals: 18,
    unitsPerSecond: 100_000_000_000_000_000n,
  },
};

export enum ChainKey {
  Acala = 'Acala',
  AlphanetRelay = 'AlphanetRelay',
  Astar = 'Astar',
  AstarAlphanet = 'AstarAlphanet',
  BasiliskAlphanet = 'BasiliskAlphanet',
  Bifrost = 'Bifrost',
  Calamari = 'Calamari',
  CloverAlphanet = 'CloverAlphanet',
  CrustShadow = 'CrustShadow',
  CrustShadowAlphanet = 'CrustShadowAlphanet',
  Darwinia = 'Darwinia',
  DarwiniaAlphanet = 'DarwiniaAlphanet',
  Integritee = 'Integritee',
  IntegriteeAlphanet = 'IntegriteeAlphanet',
  InterBTCAlphanet = 'InterBTCAlphanet',
  Interlay = 'Interlay',
  Karura = 'Karura',
  Khala = 'Khala',
  Kintsugi = 'Kintsugi',
  Kusama = 'Kusama',
  LitentryAlphanet = 'LitentryAlphanet',
  Litmus = 'Litmus',
  Parallel = 'Parallel',
  ParallelHeiko = 'ParallelHeiko',
  Phala = 'Phala',
  Polkadot = 'Polkadot',
  Shiden = 'Shiden',
  Statemine = 'Statemine',
  StatemineAlphanet = 'StatemineAlphanet',
}
