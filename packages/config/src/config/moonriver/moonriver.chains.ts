import { ChainKey } from '../../constants';
import { ChainsMap } from '../config.interfaces';
// eslint-disable-next-line import/no-cycle
import { MoonriverChains } from './moonriver.interfaces';

export const MOONRIVER_CHAINS = <const>[
  ChainKey.Bifrost,
  ChainKey.Calamari,
  ChainKey.CrustShadow,
  ChainKey.Darwinia,
  ChainKey.Integritee,
  ChainKey.Karura,
  ChainKey.Khala,
  ChainKey.Kintsugi,
  ChainKey.Kusama,
  ChainKey.Litmus,
  ChainKey.Parallel,
  ChainKey.Shiden,
  ChainKey.Statemine,
];

export const MOONRIVER_CHAINS_CONFIGS: ChainsMap<MoonriverChains> = {
  [ChainKey.Bifrost]: {
    key: ChainKey.Bifrost,
    name: 'Bifrost',
    ws: 'wss://bifrost-rpc.liebi.com/ws',
    weight: 1_000_000_000,
    parachainId: 2001,
  },
  [ChainKey.Calamari]: {
    key: ChainKey.Calamari,
    name: 'Calamari',
    ws: 'wss://ws.calamari.systems',
    weight: 1_000_000_000,
    parachainId: 2084,
  },
  [ChainKey.CrustShadow]: {
    key: ChainKey.CrustShadow,
    name: 'Crust Shadow',
    ws: 'wss://rpc2-shadow.crust.network',
    weight: 1_000_000_000,
    parachainId: 2012,
  },
  [ChainKey.Darwinia]: {
    key: ChainKey.Darwinia,
    name: 'Darwinia Crab',
    ws: 'wss://crab-parachain-rpc.darwinia.network',
    weight: 1_000_000_000,
    parachainId: 2105,
  },
  [ChainKey.Integritee]: {
    key: ChainKey.Integritee,
    name: 'Integritee',
    ws: 'wss://integritee-kusama.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2015,
  },
  [ChainKey.Karura]: {
    key: ChainKey.Karura,
    name: 'Karura',
    ws: 'wss://karura.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2000,
    moonAssetId: 3,
  },
  [ChainKey.Khala]: {
    key: ChainKey.Khala,
    name: 'Khala',
    ws: 'wss://khala.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2004,
    moonAssetId: 6,
    palletInstance: 10,
  },
  [ChainKey.Kintsugi]: {
    key: ChainKey.Kintsugi,
    name: 'Kintsugi',
    ws: 'wss://api-kusama.interlay.io/parachain',
    weight: 1_000_000_000,
    parachainId: 2092,
  },
  [ChainKey.Kusama]: {
    key: ChainKey.Kusama,
    name: 'Kusama',
    ws: 'wss://kusama-rpc.polkadot.io',
    weight: 1_000_000_000,
    parachainId: 0,
  },
  [ChainKey.Litmus]: {
    key: ChainKey.Litmus,
    name: 'Litmus',
    ws: 'wss://rpc.litmus-parachain.litentry.io',
    weight: 1_000_000_000,
    parachainId: 2106,
  },
  [ChainKey.Parallel]: {
    key: ChainKey.Parallel,
    name: 'Parallel Heiko',
    ws: 'wss://heiko-rpc.parallel.fi',
    weight: 1_000_000_000,
    parachainId: 2085,
    moonAssetId: 113,
  },
  [ChainKey.Shiden]: {
    key: ChainKey.Shiden,
    name: 'Shiden',
    ws: 'wss://shiden.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2007,
    moonAssetId: 18446744073709551620n,
    palletInstance: 10,
  },
  [ChainKey.Statemine]: {
    key: ChainKey.Statemine,
    name: 'Statemine',
    ws: 'wss://statemine-rpc.polkadot.io',
    weight: 1_000_000_000,
    parachainId: 1000,
    palletInstance: 50,
  },
};
