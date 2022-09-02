import { ChainKey } from '../../constants';
import { ChainsMap } from '../config.interfaces';
// eslint-disable-next-line import/no-cycle
import { MoonbaseChains } from './moonbase.interfaces';

export const MOONBASE_CHAINS = <const>[
  ChainKey.AlphanetRelay,
  ChainKey.AstarAlphanet,
  ChainKey.BasiliskAlphanet,
  ChainKey.CloverAlphanet,
  ChainKey.CrustShadowAlphanet,
  ChainKey.DarwiniaAlphanet,
  ChainKey.IntegriteeAlphanet,
  ChainKey.InterBTCAlphanet,
  ChainKey.LitentryAlphanet,
  ChainKey.StatemineAlphanet,
];

export const MOONBASE_CHAINS_CONFIGS: ChainsMap<MoonbaseChains> = {
  [ChainKey.AlphanetRelay]: {
    key: ChainKey.AlphanetRelay,
    name: 'Alphanet Relay',
    ws: 'wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network',
    weight: 1_000_000_000,
    parachainId: 0,
  },
  [ChainKey.AstarAlphanet]: {
    key: ChainKey.AstarAlphanet,
    name: 'Astar Alphanet',
    ws: 'wss://alphanet.astar.network/',
    weight: 1_000_000_000,
    parachainId: 2007,
    palletInstance: 3,
    moonAssetId: 100,
  },
  [ChainKey.BasiliskAlphanet]: {
    key: ChainKey.BasiliskAlphanet,
    name: 'Basilisk Alphanet',
    ws: 'wss://rpc-01.basilisk-moonbase.hydradx.io',
    weight: 1_000_000_000,
    parachainId: 2090,
    moonAssetId: 0,
  },
  [ChainKey.CloverAlphanet]: {
    key: ChainKey.CloverAlphanet,
    name: 'Clover Alphanet',
    ws: 'wss://test-para-api.clv.org/',
    weight: 1_000_000_000,
    parachainId: 2002,
    moonAssetId: 4,
    palletInstance: 3,
  },
  [ChainKey.CrustShadowAlphanet]: {
    key: ChainKey.CrustShadowAlphanet,
    name: 'Crust Shadow Alphanet',
    ws: 'wss://shadow-rpc-alpha.crustapps.net/',
    weight: 1_000_000_000,
    parachainId: 2012,
  },
  [ChainKey.DarwiniaAlphanet]: {
    key: ChainKey.DarwiniaAlphanet,
    name: 'Pangolin Alphanet',
    ws: 'wss://pangolin-parachain-alpha-rpc.darwinia.network',
    weight: 1_000_000_000,
    parachainId: 2105,
  },
  [ChainKey.IntegriteeAlphanet]: {
    key: ChainKey.IntegriteeAlphanet,
    name: 'Integritee Alphanet',
    ws: 'wss://moonbeam-test.integritee.network',
    weight: 1_000_000_000,
    parachainId: 2015,
  },
  [ChainKey.InterBTCAlphanet]: {
    key: ChainKey.InterBTCAlphanet,
    name: 'interBTC Alphanet',
    ws: 'wss://api-dev-moonbeam.interlay.io/parachain',
    weight: 1_000_000_000,
    parachainId: 1002,
  },
  [ChainKey.LitentryAlphanet]: {
    key: ChainKey.LitentryAlphanet,
    name: 'Litentry Alphanet',
    ws: 'wss://moonbase-parachain-sg-0.litentry.io',
    weight: 1_000_000_000,
    parachainId: 2106,
  },
  [ChainKey.StatemineAlphanet]: {
    key: ChainKey.StatemineAlphanet,
    name: 'Statemine Alphanet',
    ws: 'wss://frag-moonbase-sm-rpc-ws.g.moonbase.moonbeam.network/',
    weight: 1_000_000_000,
    parachainId: 1001,
    palletInstance: 50,
  },
};
