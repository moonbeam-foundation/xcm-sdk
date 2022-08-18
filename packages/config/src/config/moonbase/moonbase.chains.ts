import { Chain } from '../../constants';
import { ChainsConfigs } from '../config.interfaces';
// eslint-disable-next-line import/no-cycle
import { MoonbaseChains } from './moonbase.interfaces';

export const MOONBASE_CHAINS = <const>[
  Chain.AlphanetRelay,
  Chain.AstarAlphanet,
  Chain.BasiliskAlphanet,
  Chain.CloverAlphanet,
  Chain.CrustShadowAlphanet,
  Chain.DarwiniaAlphanet,
  Chain.IntegriteeAlphanet,
  Chain.InterBTCAlphanet,
  Chain.LitentryAlphanet,
];

export const MOONBASE_CHAINS_CONFIGS: ChainsConfigs<MoonbaseChains> = {
  [Chain.AlphanetRelay]: {
    chain: Chain.AlphanetRelay,
    name: 'Alphanet Relay',
    ws: 'wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network',
    weight: 1_000_000_000,
    parachainId: 0,
  },
  [Chain.AstarAlphanet]: {
    chain: Chain.AstarAlphanet,
    name: 'Astar Alphanet',
    ws: 'wss://alphanet.astar.network/',
    weight: 1_000_000_000,
    parachainId: 2007,
    palletInstance: 3,
    moonAssetId: 100,
  },
  [Chain.BasiliskAlphanet]: {
    chain: Chain.BasiliskAlphanet,
    name: 'Basilisk Alphanet',
    ws: 'wss://rpc-01.basilisk-moonbase.hydradx.io',
    weight: 1_000_000_000,
    parachainId: 2090,
    moonAssetId: 0,
  },
  [Chain.CloverAlphanet]: {
    chain: Chain.CloverAlphanet,
    name: 'Clover Alphanet',
    ws: 'wss://test-para-api.clv.org/',
    weight: 1_000_000_000,
    parachainId: 2002,
    moonAssetId: 100,
    palletInstance: 3,
  },
  [Chain.CrustShadowAlphanet]: {
    chain: Chain.CrustShadowAlphanet,
    name: 'Crust Shadow Alphanet',
    ws: 'wss://shadow-rpc-alpha.crustapps.net/',
    weight: 1_000_000_000,
    parachainId: 2012,
  },
  [Chain.DarwiniaAlphanet]: {
    chain: Chain.DarwiniaAlphanet,
    name: 'Pangolin Alphanet',
    ws: 'wss://pangolin-parachain-alpha-rpc.darwinia.network',
    weight: 1_000_000_000,
    parachainId: 2105,
  },
  [Chain.IntegriteeAlphanet]: {
    chain: Chain.IntegriteeAlphanet,
    name: 'Integritee Alphanet',
    ws: 'wss://moonbeam-test.integritee.network',
    weight: 1_000_000_000,
    parachainId: 2015,
  },
  [Chain.InterBTCAlphanet]: {
    chain: Chain.InterBTCAlphanet,
    name: 'interBTC Alphanet',
    ws: 'wss://api-dev-moonbeam.interlay.io/parachain',
    weight: 1_000_000_000,
    parachainId: 1002,
  },
  [Chain.LitentryAlphanet]: {
    chain: Chain.LitentryAlphanet,
    name: 'Litentry Alphanet',
    ws: 'wss://moonbase-parachain-sg-0.litentry.io',
    weight: 1_000_000_000,
    parachainId: 2106,
  },
};
