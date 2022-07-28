import { Chain } from '../../constants';
import { ChainConfig } from '../../interfaces';
// eslint-disable-next-line import/no-cycle
import { MoonbaseChains } from './moonbase.interfaces';

export const MOONBASE_CHAINS = <const>[
  Chain.AlphanetRelay,
  Chain.AstarAlphanet,
  Chain.BasiliskAlphanet,
  Chain.BifrostAlphanet,
  Chain.CalamariAlphanet,
  Chain.CrustShadowAlphanet,
  Chain.DarwiniaAlphanet,
  Chain.IntegriteeAlphanet,
  Chain.InterBTCAlphanet,
  Chain.KaruraAlphanet,
  Chain.KhalaAlphanet,
  Chain.LitentryAlphanet,
  Chain.ParallelAlphanet,
];
export const MOONBASE_CHAINS_CONFIGS: Readonly<
  Record<MoonbaseChains, ChainConfig>
> = {
  [Chain.AlphanetRelay]: {
    chain: Chain.AlphanetRelay,
    name: 'Alphanet Relay',
    ws: 'wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network',
    weight: 1_000_000_000,
    parachainId: 0,
    moonAssetId: 100,
  },
  [Chain.AstarAlphanet]: {
    chain: Chain.AstarAlphanet,
    name: 'Astar Alphanet',
    ws: 'wss://alphanet.astar.network/',
    weight: 1_000_000_000,
    parachainId: 2007,
    palletInstance: 3,
  },
  [Chain.BasiliskAlphanet]: {
    chain: Chain.BasiliskAlphanet,
    name: 'Basilisk Alphanet',
    ws: 'wss://rpc-01.basilisk-moonbase.hydradx.io',
    weight: 1_000_000_000,
    parachainId: 2090,
    moonAssetId: 0,
  },
  [Chain.BifrostAlphanet]: {
    chain: Chain.BifrostAlphanet,
    name: 'Bifrost Alphanet',
    ws: 'wss://moonriver.bifrost-rpc.testnet.liebi.com/ws',
    weight: 1_000_000_000,
    parachainId: 2001,
  },
  [Chain.CalamariAlphanet]: {
    chain: Chain.CalamariAlphanet,
    name: 'Calamari Alphanet',
    ws: 'wss://crispy.moonbase-relay.testnet.calamari.systems',
    weight: 1_000_000_000,
    parachainId: 2084,
    moonAssetId: 8,
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
    name: 'Darwinia Alphanet',
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
  [Chain.KaruraAlphanet]: {
    chain: Chain.KaruraAlphanet,
    name: 'Karura Alphanet',
    ws: 'wss://crosschain-dev.polkawallet.io:9908',
    weight: 1_000_000_000,
    parachainId: 2000,
    moonAssetId: 0,
  },
  [Chain.KhalaAlphanet]: {
    chain: Chain.KhalaAlphanet,
    name: 'Khala Alphanet',
    ws: 'wss://bridge-testnet-api.phala.network/moon/ws',
    weight: 1_000_000_000,
    parachainId: 2004,
  },
  [Chain.LitentryAlphanet]: {
    chain: Chain.LitentryAlphanet,
    name: 'Litentry Alphanet',
    ws: 'wss://moonbase-parachain-sg-0.litentry.io',
    weight: 1_000_000_000,
    parachainId: 2106,
  },
  [Chain.ParallelAlphanet]: {
    chain: Chain.ParallelAlphanet,
    name: 'Parallel Alphanet',
    ws: 'wss://crosschain-dev-rpc.parallel.fi',
    weight: 1_000_000_000,
    parachainId: 2085,
    moonAssetId: 113,
  },
};
