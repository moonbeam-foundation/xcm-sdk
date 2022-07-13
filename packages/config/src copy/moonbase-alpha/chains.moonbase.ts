// eslint-disable-next-line import/no-cycle
import { ChainConfig } from '../interfaces/xcm-config.interfaces';

export const PARACHAIN_ID = 1000;

export enum Chains {
  Alphanet_Relay = 'Alphanet_Relay',
  Bifrost_Alphanet = 'Bifrost_Alphanet',
  Karura_Alphanet = 'Karura_Alphanet',
  interBTC_Alphanet = 'interBTC_Alphanet',
  Crust_Shadow_Alphanet = 'Crust_Shadow_Alphanet',
  Basilisk_Alphanet = 'Basilisk_Alphanet',
  Khala_Alphanet = 'Khala_Alphanet',
  Parallel_Alphanet = 'Parallel_Alphanet',
  Calamari_Alphanet = 'Calamari_Alphanet',
  Litentry_Alphanet = 'Litentry_Alphanet',
  Darwinia_Alphanet = 'Darwinia_Alphanet',
  Integritee_Alphanet = 'Integritee_Alphanet',
  Astar_Alphanet = 'Astar_Alphanet',
}

export const ChainsConfig: Record<Chains, ChainConfig> = {
  [Chains.Alphanet_Relay]: {
    name: 'Alphanet Relay',
    ws: 'wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network',
    weight: 1_000_000_000,
  },
  [Chains.Bifrost_Alphanet]: {
    name: 'Bifrost Alphanet',
    ws: 'wss://moonriver.bifrost-rpc.testnet.liebi.com/ws',
    parachainId: 2001,
    weight: 1_000_000_000,
  },
  [Chains.Karura_Alphanet]: {
    name: 'Karura Alphanet',
    ws: 'wss://crosschain-dev.polkawallet.io:9908',
    parachainId: 2000,
    weight: 1_000_000_000,
  },
  [Chains.interBTC_Alphanet]: {
    name: 'interBTC Alphanet',
    ws: 'wss://api-dev-moonbeam.interlay.io/parachain',
    parachainId: 1002,
    weight: 1_000_000_000,
  },
  [Chains.Crust_Shadow_Alphanet]: {
    name: 'Crust Shadow Alphanet',
    ws: 'wss://shadow-rpc-alpha.crustapps.net/',
    parachainId: 2012,
    weight: 1_000_000_000,
  },
  [Chains.Basilisk_Alphanet]: {
    name: 'Basilisk Alphanet',
    ws: 'wss://rpc-01.basilisk-moonbase.hydradx.io',
    parachainId: 2090,
    weight: 1_000_000_000,
  },
  [Chains.Khala_Alphanet]: {
    name: 'Khala Alphanet',
    ws: 'wss://bridge-testnet-api.phala.network/moon/ws',
    parachainId: 2004,
    weight: 1_000_000_000,
  },
  [Chains.Parallel_Alphanet]: {
    name: 'Parallel Alphanet',
    ws: 'wss://crosschain-dev-rpc.parallel.fi',
    parachainId: 2085,
    weight: 1_000_000_000,
  },
  [Chains.Calamari_Alphanet]: {
    name: 'Calamari Alphanet',
    ws: 'wss://crispy.moonbase-relay.testnet.calamari.systems',
    parachainId: 2084,
    weight: 1_000_000_000,
  },
  [Chains.Litentry_Alphanet]: {
    name: 'Litentry Alphanet',
    ws: 'wss://moonbase-parachain-sg-0.litentry.io',
    parachainId: 2106,
    weight: 1_000_000_000,
  },
  [Chains.Darwinia_Alphanet]: {
    name: 'Pangolin Alphanet',
    ws: 'wss://pangolin-parachain-alpha-rpc.darwinia.network',
    parachainId: 2105,
    weight: 1_000_000_000,
  },
  [Chains.Integritee_Alphanet]: {
    name: 'Integritee Alphanet',
    ws: 'wss://moonbeam-test.integritee.network',
    parachainId: 2015,
    weight: 1_000_000_000,
  },
  [Chains.Astar_Alphanet]: {
    name: 'Astar Alphanet',
    ws: 'wss://alphanet.astar.network/',
    parachainId: 2007,
    weight: 1_000_000_000,
  },
};

export const {
  Alphanet_Relay,
  Bifrost_Alphanet,
  Karura_Alphanet,
  interBTC_Alphanet,
  Crust_Shadow_Alphanet,
  Basilisk_Alphanet,
  Khala_Alphanet,
  Parallel_Alphanet,
  Calamari_Alphanet,
  Litentry_Alphanet,
  Darwinia_Alphanet,
  Integritee_Alphanet,
  Astar_Alphanet,
} = ChainsConfig;
