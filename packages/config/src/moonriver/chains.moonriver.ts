// eslint-disable-next-line import/no-cycle
import { ChainConfig } from '../interfaces/xcm-config.interfaces';

export const PARACHAIN_ID = 2023;

export enum Chains {
  Kusama = 'Kusama',
  Statemine = 'Statemine',
  Kintsugi = 'Kintsugi',
  Karura = 'Karura',
  Bifrost = 'Bifrost',
  Crust_Shadow = 'Crust_Shadow',
  Khala = 'Khala',
  Parallel = 'Parallel',
  Calamari = 'Calamari',
  Darwinia = 'Darwinia',
  Integritee = 'Integritee',
}

export const ChainsConfig: Record<Chains, ChainConfig> = {
  [Chains.Kusama]: {
    name: 'Kusama',
    ws: 'wss://kusama-rpc.polkadot.io',
    weight: 1_000_000_000,
    explorer: 'https://kusama.subscan.io',
  },
  [Chains.Statemine]: {
    name: 'Statemine',
    ws: 'wss://statemine-rpc.polkadot.io',
    parachainId: 1000,
    weight: 1_000_000_000,
    explorer: 'https://statemine.subscan.io',
  },
  [Chains.Kintsugi]: {
    name: 'Kintsugi',
    ws: 'wss://api-kusama.interlay.io/parachain',
    parachainId: 2092,
    weight: 1_000_000_000,
    explorer: 'https://kintsugi.subscan.io',
  },
  [Chains.Karura]: {
    name: 'Karura',
    ws: 'wss://karura.api.onfinality.io/public-ws',
    parachainId: 2000,
    weight: 1_000_000_000,
    explorer: 'https://karura.subscan.io',
  },
  [Chains.Bifrost]: {
    name: 'Bifrost',
    ws: 'wss://bifrost-rpc.liebi.com/ws',
    parachainId: 2001,
    weight: 1_000_000_000,
    explorer: 'https://bifrost-kusama.subscan.io',
  },
  [Chains.Crust_Shadow]: {
    name: 'Crust Shadow',
    ws: 'wss://rpc2-shadow.crust.network',
    parachainId: 2012,
    weight: 1_000_000_000,
    explorer: 'https://shadow.subscan.io',
  },
  [Chains.Khala]: {
    name: 'Khala',
    ws: 'wss://khala.api.onfinality.io/public-ws',
    parachainId: 2004,
    weight: 1_000_000_000,
    explorer: 'https://khala.subscan.io',
  },
  [Chains.Parallel]: {
    name: 'Parallel Heiko',
    ws: 'wss://heiko-rpc.parallel.fi',
    parachainId: 2085,
    weight: 1_000_000_000,
    explorer: 'https://parallel-heiko.subscan.io',
  },
  [Chains.Calamari]: {
    name: 'Calamari',
    ws: 'wss://ws.calamari.systems',
    parachainId: 2084,
    weight: 1_000_000_000,
    explorer: 'https://calamari.subscan.io',
  },
  [Chains.Darwinia]: {
    name: 'Darwinia Crab',
    ws: 'wss://crab-parachain-rpc.darwinia.network',
    parachainId: 2105,
    weight: 1_000_000_000,
    explorer: 'https://crab-parachain.subscan.io',
  },
  [Chains.Integritee]: {
    name: 'Integritee',
    ws: 'wss://integritee-kusama.api.onfinality.io/public-ws',
    parachainId: 2015,
    weight: 1_000_000_000,
    explorer: 'https://integritee.subscan.io',
  },
};

export const {
  Kusama,
  Statemine,
  Kintsugi,
  Karura,
  Bifrost,
  Crust_Shadow,
  Khala,
  Parallel,
  Calamari,
  Darwinia,
  Integritee,
} = ChainsConfig;
