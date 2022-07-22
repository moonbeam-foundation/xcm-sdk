// eslint-disable-next-line import/no-cycle
import {
  ChainConfig,
  MoonbaseChains,
  MoonbeamChains,
  MoonChainConfig,
  MoonriverChains,
} from '../interfaces';

export enum MoonChain {
  MoonbaseAlpha = 'MoonbaseAlpha',
  Moonbeam = 'Moonbeam',
  Moonriver = 'Moonriver',
}
export const MOON_CHINS_CONFIGS: Readonly<Record<MoonChain, MoonChainConfig>> =
  {
    [MoonChain.MoonbaseAlpha]: {
      name: 'Moonbase Alpha',
      ws: 'wss://wss.api.moonbase.moonbeam.network',
      parachainId: 1000,
    },
    [MoonChain.Moonbeam]: {
      name: 'Moonbeam',
      ws: 'wss://wss.api.moonbeam.network',
      parachainId: 2004,
    },
    [MoonChain.Moonriver]: {
      name: 'Moonriver',
      ws: 'wss://wss.api.moonriver.moonbeam.network',
      parachainId: 2023,
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
  Statemine = 'Statemine',
}

export const DEV_ID = {
  [Chain.AstarAlphanet]: 100,
  [Chain.BasiliskAlphanet]: 0,
  [Chain.CalamariAlphanet]: 8,
  [Chain.KaruraAlphanet]: 0,
  [Chain.ParallelAlphanet]: 113,
};

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
export const MOONBASE_CHINS_CONFIGS: Readonly<
  Record<MoonbaseChains, ChainConfig>
> = {
  [Chain.AlphanetRelay]: {
    name: 'Alphanet Relay',
    ws: 'wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network',
    weight: 1_000_000_000,
    parachainId: 0,
  },
  [Chain.AstarAlphanet]: {
    name: 'Astar Alphanet',
    ws: 'wss://alphanet.astar.network/',
    weight: 1_000_000_000,
    parachainId: 2007,
  },
  [Chain.BasiliskAlphanet]: {
    name: 'Basilisk Alphanet',
    ws: 'wss://rpc-01.basilisk-moonbase.hydradx.io',
    weight: 1_000_000_000,
    parachainId: 2090,
  },
  [Chain.BifrostAlphanet]: {
    name: 'Bifrost Alphanet',
    ws: 'wss://moonriver.bifrost-rpc.testnet.liebi.com/ws',
    weight: 1_000_000_000,
    parachainId: 2001,
  },
  [Chain.CalamariAlphanet]: {
    name: 'Calamari Alphanet',
    ws: 'wss://crispy.moonbase-relay.testnet.calamari.systems',
    weight: 1_000_000_000,
    parachainId: 2084,
  },
  [Chain.CrustShadowAlphanet]: {
    name: 'Crust Shadow Alphanet',
    ws: 'wss://shadow-rpc-alpha.crustapps.net/',
    weight: 1_000_000_000,
    parachainId: 2012,
  },
  [Chain.DarwiniaAlphanet]: {
    name: 'Darwinia Alphanet',
    ws: 'wss://pangolin-parachain-alpha-rpc.darwinia.network',
    weight: 1_000_000_000,
    parachainId: 2105,
  },
  [Chain.IntegriteeAlphanet]: {
    name: 'Integritee Alphanet',
    ws: 'wss://moonbeam-test.integritee.network',
    weight: 1_000_000_000,
    parachainId: 2015,
  },
  [Chain.InterBTCAlphanet]: {
    name: 'interBTC Alphanet',
    ws: 'wss://api-dev-moonbeam.interlay.io/parachain',
    weight: 1_000_000_000,
    parachainId: 1002,
  },
  [Chain.KaruraAlphanet]: {
    name: 'Karura Alphanet',
    ws: 'wss://crosschain-dev.polkawallet.io:9908',
    weight: 1_000_000_000,
    parachainId: 2000,
  },
  [Chain.KhalaAlphanet]: {
    name: 'Khala Alphanet',
    ws: 'wss://bridge-testnet-api.phala.network/moon/ws',
    weight: 1_000_000_000,
    parachainId: 2004,
  },
  [Chain.LitentryAlphanet]: {
    name: 'Litentry Alphanet',
    ws: 'wss://moonbase-parachain-sg-0.litentry.io',
    weight: 1_000_000_000,
    parachainId: 2106,
  },
  [Chain.ParallelAlphanet]: {
    name: 'Parallel Alphanet',
    ws: 'wss://crosschain-dev-rpc.parallel.fi',
    weight: 1_000_000_000,
    parachainId: 2085,
  },
};

export const MOVR_ID = {
  [Chain.Karura]: 3,
  [Chain.Khala]: 6,
  [Chain.Parallel]: 113,
};

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
  Chain.Statemine,
];
export const MOONRIVER_CHINS_CONFIGS: Readonly<
  Record<MoonriverChains, ChainConfig>
> = {
  [Chain.Bifrost]: {
    name: 'Bifrost',
    ws: 'wss://bifrost-rpc.liebi.com/ws',
    weight: 1_000_000_000,
    parachainId: 2001,
  },
  [Chain.Calamari]: {
    name: 'Calamari',
    ws: 'wss://ws.calamari.systems',
    weight: 1_000_000_000,
    parachainId: 2084,
  },
  [Chain.CrustShadow]: {
    name: 'CrustShadow',
    ws: 'wss://rpc2-shadow.crust.network',
    weight: 1_000_000_000,
    parachainId: 2012,
  },
  [Chain.Darwinia]: {
    name: 'Darwinia',
    ws: 'wss://crab-parachain-rpc.darwinia.network',
    weight: 1_000_000_000,
    parachainId: 2105,
  },
  [Chain.Integritee]: {
    name: 'Integritee',
    ws: 'wss://integritee-kusama.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2015,
  },
  [Chain.Karura]: {
    name: 'Karura',
    ws: 'wss://karura.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2000,
  },
  [Chain.Khala]: {
    name: 'Khala',
    ws: 'wss://khala.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2004,
  },
  [Chain.Kintsugi]: {
    name: 'Kintsugi',
    ws: 'wss://api-kusama.interlay.io/parachain',
    weight: 1_000_000_000,
    parachainId: 2092,
  },
  [Chain.Kusama]: {
    name: 'Kusama',
    ws: 'wss://kusama-rpc.polkadot.io',
    weight: 1_000_000_000,
    parachainId: 0,
  },
  [Chain.Parallel]: {
    name: 'Parallel',
    ws: 'wss://heiko-rpc.parallel.fi',
    weight: 1_000_000_000,
    parachainId: 2085,
  },
  [Chain.Statemine]: {
    name: 'Statemine',
    ws: 'wss://statemine-rpc.polkadot.io',
    weight: 1_000_000_000,
    parachainId: 1000,
  },
};

export const GLMR_ID = {
  [Chain.Acala]: 0,
  [Chain.Parallel]: 114,
};

export const MOONBEAM_CHAINS = <const>[
  Chain.Acala,
  Chain.Parallel,
  Chain.Polkadot,
];
export const MOONBEAM_CHINS_CONFIGS: Readonly<
  Record<MoonbeamChains, ChainConfig>
> = {
  [Chain.Acala]: {
    name: 'Acala',
    ws: 'wss://acala-polkadot.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2000,
  },
  [Chain.Parallel]: {
    name: 'Parallel',
    ws: 'wss://rpc.parallel.fi',
    weight: 1_000_000_000,
    parachainId: 2012,
  },
  [Chain.Polkadot]: {
    name: 'Polkadot',
    ws: 'wss://rpc.polkadot.io',
    weight: 1_000_000_000,
    parachainId: 0,
  },
};
