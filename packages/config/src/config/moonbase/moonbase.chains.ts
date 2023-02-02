import { ChainKey } from '../../constants';
import { ChainsMap } from '../config.interfaces';
import { MoonbaseChains } from './moonbase.interfaces';

export const MOONBASE_CHAINS = <const>[
  ChainKey.AlphanetRelay,
  ChainKey.LitentryAlphanet,
  ChainKey.BitCountryPioneer,
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
    ss58Format: 42,
    genesisHash:
      '0xe1ea3ab1d46ba8f4898b6b4b9c54ffc05282d299f89e84bd0fd08067758c9443',
  },
  [ChainKey.BitCountryPioneer]: {
    key: ChainKey.BitCountryPioneer,
    name: 'Bit.Country Pioneer',
    ws: 'wss://moonbase-rpc.bit.country',
    weight: 1_000_000_000,
    parachainId: 2096,
    moonAssetId: 0,
    ss58Format: 268,
    genesisHash:
      '0xb27da7332d3a229f0d5f2a83f711b3f74a70f22b68021e92c37817057de58e74',
  },
  [ChainKey.LitentryAlphanet]: {
    key: ChainKey.LitentryAlphanet,
    name: 'Litentry Alphanet',
    ws: 'wss://moonbase-parachain-sg-0.litentry.io',
    weight: 1_000_000_000,
    parachainId: 2106,
    ss58Format: 131,
    genesisHash:
      '0x4decfd421755d9008781d00ce40ea4cf47ec24a3717a34ca995126fc4a78c4f8',
  },
  [ChainKey.MoonbaseBeta]: {
    key: ChainKey.MoonbaseBeta,
    name: 'Moonbase Beta',
    ws: 'wss://frag-moonbase-beta-rpc-ws.g.moonbase.moonbeam.network',
    weight: 1_000_000_000,
    palletInstance: 3,
    parachainId: 888,
    unitsPerSecond: 50_000_000_000_000_000n,
    ss58Format: 0,
    genesisHash:
      '0xeebb5d05763801e54d6a7a60a4b7998ac125c4d050dcec418dd07ea959a54464',
    weights: {
      descendOriginWeight: 9_620_000n,
      withdrawAssetWeight: 200_000_000n,
      buyExecutionWeight: 130_464_000n + 100_000_000n,
      transactWeight: 31_693_000n + 25_000_000n,
    },
  },
  [ChainKey.StatemineAlphanet]: {
    key: ChainKey.StatemineAlphanet,
    name: 'Statemine Alphanet',
    ws: 'wss://frag-moonbase-sm-rpc-ws.g.moonbase.moonbeam.network/',
    weight: 1_000_000_000,
    parachainId: 1001,
    palletInstance: 50,
    ss58Format: 42,
    genesisHash:
      '0x2c63baa36880c9cf820d5ccfc4e49841bfd714e93ede2bebc4abc4531dd4e8a0',
  },
};
