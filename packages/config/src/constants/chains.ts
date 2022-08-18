// eslint-disable-next-line import/no-cycle
import { MoonChainConfig } from '../interfaces';

export enum MoonChain {
  MoonbaseAlpha = 'MoonbaseAlpha',
  Moonbeam = 'Moonbeam',
  Moonriver = 'Moonriver',
}
export const MOON_CHAINS_CONFIGS: Readonly<Record<MoonChain, MoonChainConfig>> =
  {
    [MoonChain.MoonbaseAlpha]: {
      chain: MoonChain.MoonbaseAlpha,
      name: 'Moonbase Alpha',
      ws: 'wss://wss.api.moonbase.moonbeam.network',
      parachainId: 1000,
      decimals: 18,
      unitsPerSecond: 50_000_000_000_000_000n,
    },
    [MoonChain.Moonbeam]: {
      chain: MoonChain.Moonbeam,
      name: 'Moonbeam',
      ws: 'wss://wss.api.moonbeam.network',
      parachainId: 2004,
      decimals: 18,
      unitsPerSecond: 10_000_000_000_000_000_000n,
    },
    [MoonChain.Moonriver]: {
      chain: MoonChain.Moonriver,
      name: 'Moonriver',
      ws: 'wss://wss.api.moonriver.moonbeam.network',
      parachainId: 2023,
      decimals: 18,
      unitsPerSecond: 100_000_000_000_000_000n,
    },
  };

export enum Chain {
  Acala = 'Acala',
  AlphanetRelay = 'AlphanetRelay',
  AstarAlphanet = 'AstarAlphanet',
  BasiliskAlphanet = 'BasiliskAlphanet',
  Bifrost = 'Bifrost',
  BifrostAlphanet = 'BifrostAlphanet',
  Calamari = 'Calamari',
  CalamariAlphanet = 'CalamariAlphanet',
  CrustShadow = 'CrustShadow',
  CrustShadowAlphanet = 'CrustShadowAlphanet',
  Darwinia = 'Darwinia',
  DarwiniaAlphanet = 'DarwiniaAlphanet',
  Integritee = 'Integritee',
  IntegriteeAlphanet = 'IntegriteeAlphanet',
  InterBTCAlphanet = 'InterBTCAlphanet',
  Karura = 'Karura',
  KaruraAlphanet = 'KaruraAlphanet',
  Khala = 'Khala',
  KhalaAlphanet = 'KhalaAlphanet',
  Kintsugi = 'Kintsugi',
  Kusama = 'Kusama',
  LitentryAlphanet = 'LitentryAlphanet',
  Parallel = 'Parallel',
  ParallelAlphanet = 'ParallelAlphanet',
  Polkadot = 'Polkadot',
  Shiden = 'Shiden',
  Statemine = 'Statemine',
}
