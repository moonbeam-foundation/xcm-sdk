// TODO: move to interfaces
export interface ChainConfig {
  ws: string;
  weight: number;
  parachainId?: number;
}

export enum MoonChains {
  Moonbeam = 'Moonbeam',
  Moonriver = 'Moonriver',
  MoonbaseAlpha = 'MoonbaseAlpha',
}

export enum Chains {
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

export type MoonbaseChains = typeof MOONBASE_CHAINS[number];
export const MOONBASE_CHAINS = <const>[
  Chains.AlphanetRelay,
  Chains.AstarAlphanet,
  Chains.BasiliskAlphanet,
  Chains.BifrostAlphanet,
  Chains.CalamariAlphanet,
  Chains.CrustShadowAlphanet,
  Chains.DarwiniaAlphanet,
  Chains.IntegriteeAlphanet,
  Chains.InterBTCAlphanet,
  Chains.KaruraAlphanet,
  Chains.KhalaAlphanet,
  Chains.LitentryAlphanet,
  Chains.ParallelAlphanet,
];
export const MOONBASE_CHINS_CONFIGS: Readonly<
  Record<MoonbaseChains, ChainConfig>
> = {
  [Chains.AlphanetRelay]: {
    ws: 'wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network',
    weight: 1_000_000_000,
  },
  [Chains.AstarAlphanet]: {
    ws: 'wss://alphanet.astar.network/',
    weight: 1_000_000_000,
    parachainId: 2007,
  },
  [Chains.BasiliskAlphanet]: {
    ws: 'wss://rpc-01.basilisk-moonbase.hydradx.io',
    weight: 1_000_000_000,
    parachainId: 2090,
  },
  [Chains.BifrostAlphanet]: {
    ws: 'wss://moonriver.bifrost-rpc.testnet.liebi.com/ws',
    weight: 1_000_000_000,
    parachainId: 2001,
  },
  [Chains.CalamariAlphanet]: {
    ws: 'wss://crispy.moonbase-relay.testnet.calamari.systems',
    weight: 1_000_000_000,
    parachainId: 2084,
  },
  [Chains.CrustShadowAlphanet]: {
    ws: 'wss://shadow-rpc-alpha.crustapps.net/',
    weight: 1_000_000_000,
    parachainId: 2012,
  },
  [Chains.DarwiniaAlphanet]: {
    ws: 'wss://pangolin-parachain-alpha-rpc.darwinia.network',
    weight: 1_000_000_000,
    parachainId: 2105,
  },
  [Chains.IntegriteeAlphanet]: {
    ws: 'wss://moonbeam-test.integritee.network',
    weight: 1_000_000_000,
    parachainId: 2015,
  },
  [Chains.InterBTCAlphanet]: {
    ws: 'wss://api-dev-moonbeam.interlay.io/parachain',
    weight: 1_000_000_000,
    parachainId: 1002,
  },
  [Chains.KaruraAlphanet]: {
    ws: 'wss://crosschain-dev.polkawallet.io:9908',
    weight: 1_000_000_000,
    parachainId: 2000,
  },
  [Chains.KhalaAlphanet]: {
    ws: 'wss://bridge-testnet-api.phala.network/moon/ws',
    weight: 1_000_000_000,
    parachainId: 2004,
  },
  [Chains.LitentryAlphanet]: {
    ws: 'wss://moonbase-parachain-sg-0.litentry.io',
    weight: 1_000_000_000,
    parachainId: 2106,
  },
  [Chains.ParallelAlphanet]: {
    ws: 'wss://crosschain-dev-rpc.parallel.fi',
    weight: 1_000_000_000,
    parachainId: 2085,
  },
};

export type MoonriverChains = typeof MOONRIVER_CHAINS[number];
export const MOONRIVER_CHAINS = <const>[
  Chains.Bifrost,
  Chains.Calamari,
  Chains.CrustShadow,
  Chains.Darwinia,
  Chains.Integritee,
  Chains.Karura,
  Chains.Khala,
  Chains.Kintsugi,
  Chains.Kusama,
  Chains.Parallel,
  Chains.Statemine,
];
export const MOONRIVER_CHINS_CONFIGS: Readonly<
  Record<MoonriverChains, ChainConfig>
> = {
  [Chains.Bifrost]: {
    ws: 'wss://bifrost-rpc.liebi.com/ws',
    weight: 1_000_000_000,
    parachainId: 2001,
  },
  [Chains.Calamari]: {
    ws: 'wss://ws.calamari.systems',
    weight: 1_000_000_000,
    parachainId: 2084,
  },
  [Chains.CrustShadow]: {
    ws: 'wss://rpc2-shadow.crust.network',
    weight: 1_000_000_000,
    parachainId: 2012,
  },
  [Chains.Darwinia]: {
    ws: 'wss://crab-parachain-rpc.darwinia.network',
    weight: 1_000_000_000,
    parachainId: 2105,
  },
  [Chains.Integritee]: {
    ws: 'wss://integritee-kusama.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2015,
  },
  [Chains.Karura]: {
    ws: 'wss://karura.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2000,
  },
  [Chains.Khala]: {
    ws: 'wss://khala.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2004,
  },
  [Chains.Kintsugi]: {
    ws: 'wss://api-kusama.interlay.io/parachain',
    weight: 1_000_000_000,
    parachainId: 2092,
  },
  [Chains.Kusama]: {
    ws: 'wss://kusama-rpc.polkadot.io',
    weight: 1_000_000_000,
  },
  [Chains.Parallel]: {
    ws: 'wss://heiko-rpc.parallel.fi',
    weight: 1_000_000_000,
    parachainId: 2085,
  },
  [Chains.Statemine]: {
    ws: 'wss://statemine-rpc.polkadot.io',
    weight: 1_000_000_000,
    parachainId: 1000,
  },
};

export type MoonbeamChains = typeof MOONBEAM_CHAINS[number];
export const MOONBEAM_CHAINS = <const>[
  Chains.Acala,
  Chains.Parallel,
  Chains.Polkadot,
];
export const MOONRBEAM_CHINS_CONFIGS: Readonly<
  Record<MoonbeamChains, ChainConfig>
> = {
  [Chains.Acala]: {
    ws: 'wss://acala-polkadot.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2000,
  },
  [Chains.Parallel]: {
    ws: 'wss://rpc.parallel.fi',
    weight: 1_000_000_000,
    parachainId: 2012,
  },
  [Chains.Polkadot]: {
    ws: 'wss://rpc.polkadot.io',
    weight: 1_000_000_000,
  },
};
