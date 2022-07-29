import { Chain } from '../../constants';
import { ChainsConfigs } from '../config.interfaces';
// eslint-disable-next-line import/no-cycle
import { MoonriverChains } from './moonriver.interfaces';

export const MOONRIVER_CHAINS = <const>[
  Chain.Bifrost,
  Chain.Calamari,
  Chain.CrustShadow,
  Chain.Darwinia,
  Chain.Integritee,
  Chain.Karura,
  Chain.Khala,
  Chain.Kintsugi,
  Chain.Kusama,
  Chain.Parallel,
  Chain.Shiden,
  Chain.Statemine,
];

export const MOONRIVER_CHAINS_CONFIGS: ChainsConfigs<MoonriverChains> = {
  [Chain.Bifrost]: {
    chain: Chain.Bifrost,
    name: 'Bifrost',
    ws: 'wss://bifrost-rpc.liebi.com/ws',
    weight: 1_000_000_000,
    parachainId: 2001,
  },
  [Chain.Calamari]: {
    chain: Chain.Calamari,
    name: 'Calamari',
    ws: 'wss://ws.calamari.systems',
    weight: 1_000_000_000,
    parachainId: 2084,
  },
  [Chain.CrustShadow]: {
    chain: Chain.CrustShadow,
    name: 'CrustShadow',
    ws: 'wss://rpc2-shadow.crust.network',
    weight: 1_000_000_000,
    parachainId: 2012,
  },
  [Chain.Darwinia]: {
    chain: Chain.Darwinia,
    name: 'Darwinia',
    ws: 'wss://crab-parachain-rpc.darwinia.network',
    weight: 1_000_000_000,
    parachainId: 2105,
  },
  [Chain.Integritee]: {
    chain: Chain.Integritee,
    name: 'Integritee',
    ws: 'wss://integritee-kusama.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2015,
  },
  [Chain.Karura]: {
    chain: Chain.Karura,
    name: 'Karura',
    ws: 'wss://karura.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2000,
    moonAssetId: 3,
  },
  [Chain.Khala]: {
    chain: Chain.Khala,
    name: 'Khala',
    ws: 'wss://khala.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2004,
    moonAssetId: 6,
    palletInstance: 10,
  },
  [Chain.Kintsugi]: {
    chain: Chain.Kintsugi,
    name: 'Kintsugi',
    ws: 'wss://api-kusama.interlay.io/parachain',
    weight: 1_000_000_000,
    parachainId: 2092,
  },
  [Chain.Kusama]: {
    chain: Chain.Kusama,
    name: 'Kusama',
    ws: 'wss://kusama-rpc.polkadot.io',
    weight: 1_000_000_000,
    parachainId: 0,
  },
  [Chain.Parallel]: {
    chain: Chain.Parallel,
    name: 'Parallel',
    ws: 'wss://heiko-rpc.parallel.fi',
    weight: 1_000_000_000,
    parachainId: 2085,
    moonAssetId: 113,
  },
  [Chain.Shiden]: {
    chain: Chain.Shiden,
    name: 'Shiden',
    ws: 'wss://shiden.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2007,
    moonAssetId: 18446744073709551620n,
    palletInstance: 10,
  },
  [Chain.Statemine]: {
    chain: Chain.Statemine,
    name: 'Statemine',
    ws: 'wss://statemine-rpc.polkadot.io',
    weight: 1_000_000_000,
    parachainId: 1000,
    palletInstance: 50,
  },
};
