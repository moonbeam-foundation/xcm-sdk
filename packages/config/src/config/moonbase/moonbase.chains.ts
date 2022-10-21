import { ChainKey } from '../../constants';
import { ChainsMap } from '../config.interfaces';
import { MoonbaseChains } from './moonbase.interfaces';

export const MOONBASE_CHAINS = <const>[
  ChainKey.AlphanetRelay,
  ChainKey.CloverAlphanet,
  ChainKey.CrustShadowAlphanet,
  ChainKey.LitentryAlphanet,
  ChainKey.MoonbaseBeta,
  ChainKey.StatemineAlphanet,
];

export const MOONBASE_CHAINS_MAP: ChainsMap<MoonbaseChains> = {
  [ChainKey.AlphanetRelay]: {
    key: ChainKey.AlphanetRelay,
    name: 'Alphanet Relay',
    ws: 'wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network',
    weight: 1_000_000_000,
    parachainId: 0,
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
  [ChainKey.LitentryAlphanet]: {
    key: ChainKey.LitentryAlphanet,
    name: 'Litentry Alphanet',
    ws: 'wss://moonbase-parachain-sg-0.litentry.io',
    weight: 1_000_000_000,
    parachainId: 2106,
  },
  [ChainKey.MoonbaseBeta]: {
    key: ChainKey.MoonbaseBeta,
    name: 'Moonbase Beta',
    ws: 'wss://frag-moonbase-beta-rpc-ws.g.moonbase.moonbeam.network',
    weight: 1_000_000_000,
    palletInstance: 3,
    parachainId: 888,
    unitsPerSecond: 50_000_000_000_000_000n,
    weights: {
      descendOriginWeight: 9_620_000n,
      // TODO: check with Gorka, second and third numbers are random
      withdrawAssetWeight: 465_091_000n + 100_000_000n + 100_000_000n,
      buyExecutionWeight: 130_464_000n,
      // TODO: check with Gorka, second number is random
      transactWeight: 31_693_000n + 100_000_000n,
      // TODO: check with Gorka
      baseExtrinsicWeight: 1_000_000_000n,
    },
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
