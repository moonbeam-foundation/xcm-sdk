import {
  Ecosystem,
  EthereumChain,
  SubstrateChain,
} from '@moonbeam-network/xcm-types';
import { ausd, dev, glmr, movr } from './assets';

export const acala = new SubstrateChain({
  assetsData: [
    {
      asset: ausd,
      id: { Token: ausd.originSymbol },
    },
    {
      asset: glmr,
      id: { ForeignAsset: 0 },
    },
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c',
  key: 'acala',
  name: 'Acala',
  parachainId: 2000,
  ss58Format: 10,
  ws: 'wss://acala-rpc-0.aca-api.network',
});

export const alphanetRelay = new SubstrateChain({
  ecosystem: Ecosystem.AlphanetRelay,
  genesisHash:
    '0xe1ea3ab1d46ba8f4898b6b4b9c54ffc05282d299f89e84bd0fd08067758c9443',
  isTestChain: true,
  key: 'alphanet-relay',
  name: 'Alphanet Relay',
  parachainId: 0,
  ss58Format: 42,
  ws: 'wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network',
});

export const astar = new SubstrateChain({
  assetsData: [
    {
      asset: glmr,
      id: 18446744073709551619n,
      palletInstance: 10,
    },
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6',
  key: 'astar',
  name: 'Astar',
  parachainId: 2006,
  ss58Format: 5,
  ws: 'wss://rpc.astar.network',
});

export const bifrostKusama = new SubstrateChain({
  assetsData: [
    {
      asset: movr,
      id: { Token: movr.originSymbol },
    },
  ],
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0x9f28c6a68e0fc9646eff64935684f6eeeece527e37bbe1f213d22caa1d9d6bed',
  key: 'bifrost-karura',
  name: 'Bifrost',
  parachainId: 2001,
  ss58Format: 6,
  ws: 'wss://bifrost-rpc.liebi.com/ws',
});

export const bifrostPolkadot = new SubstrateChain({
  assetsData: [
    {
      asset: glmr,
      id: { Token2: 1 },
    },
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0x262e1b2ad728475fd6fe88e62d34c200abe6fd693931ddad144059b1eb884e5b',
  key: 'bifrost-polkadot',
  name: 'Bifrost',
  parachainId: 2030,
  ss58Format: 6,
  ws: 'wss://hk.p.bifrost-rpc.liebi.com/ws',
});

export const bitCountryPioneer = new SubstrateChain({
  assetsData: [
    {
      asset: dev,
      id: { FungibleToken: 0 },
    },
  ],
  ecosystem: Ecosystem.AlphanetRelay,
  genesisHash:
    '0xb27da7332d3a229f0d5f2a83f711b3f74a70f22b68021e92c37817057de58e74',
  isTestChain: true,
  key: 'bit-country-pioneer',
  name: 'Bit.Country Pioneer',
  parachainId: 2096,
  ss58Format: 268,
  ws: 'wss://moonbase-rpc.bit.country',
});

export const calamari = new SubstrateChain({
  assetsData: [
    {
      asset: movr,
      id: 11,
    },
  ],
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0x4ac80c99289841dd946ef92765bf659a307d39189b3ce374a92b5f0415ee17a1',
  key: 'calamari',
  name: 'Calamari',
  parachainId: 2084,
  ss58Format: 78,
  ws: 'wss://ws.calamari.systems',
});

export const crustShadow = new SubstrateChain({
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0xd4c0c08ca49dc7c680c3dac71a7c0703e5b222f4b6c03fe4c5219bb8f22c18dc',
  key: 'crust-shadow',
  name: 'Crust Shadow',
  parachainId: 2012,
  ss58Format: 66,
  ws: 'wss://rpc2-shadow.crust.network',
});

export const darwinia = new EthereumChain({
  ecosystem: Ecosystem.Polkadot,
  id: 46,
  key: 'darwinia',
  name: 'Darwinia',
  parachainId: 2046,
  ws: 'wss://parachain-rpc.darwinia.network',
});

export const darwiniaCrab = new EthereumChain({
  ecosystem: Ecosystem.Kusama,
  id: 44,
  key: 'darwinia-crab',
  name: 'Darwinia Crab',
  parachainId: 2105,
  ws: 'wss://crab-parachain-rpc.darwinia.network',
});

export const darwiniaPangoro = new EthereumChain({
  ecosystem: Ecosystem.AlphanetRelay,
  id: 45,
  isTestChain: true,
  key: 'darwinia-pangoro',
  name: 'Pangoro',
  parachainId: 2105,
  ws: 'wss://pangoro-rpc.darwinia.network',
});

export const equilibrium = new SubstrateChain({
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0x89d3ec46d2fb43ef5a9713833373d5ea666b092fa8fd68fbc34596036571b907',
  key: 'equilibrium',
  name: 'Equilibrium',
  parachainId: 2011,
  ss58Format: 68,
  ws: 'wss://node.pol.equilibrium.io',
});

export const equilibriumAlphanet = new SubstrateChain({
  ecosystem: Ecosystem.AlphanetRelay,
  genesisHash:
    '0x0ba4508078664cfd04f00bf17892dd1a0764ce61d90857f76c6a2ea61f008247',
  isTestChain: true,
  key: 'equilibrium-alphanet',
  name: 'EquilibriumAlphanet',
  parachainId: 2011,
  ss58Format: 68,
  ws: 'wss://devnet.equilab.io/alphanet/collator/api/wss',
});

export const interlay = new SubstrateChain({
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0xbf88efe70e9e0e916416e8bed61f2b45717f517d7f3523e33c7b001e5ffcbc72',
  key: 'interlay',
  name: 'Interlay',
  parachainId: 2032,
  ss58Format: 2032,
  ws: 'wss://interlay.api.onfinality.io/public-ws',
});

export const integritee = new SubstrateChain({
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0xcdedc8eadbfa209d3f207bba541e57c3c58a667b05a2e1d1e86353c9000758da',
  key: 'integritee',
  name: 'Integritee',
  parachainId: 2015,
  ss58Format: 13,
  ws: 'wss://integritee-kusama.api.onfinality.io/public-ws',
});

export const karura = new SubstrateChain({
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0xbaf5aabe40646d11f0ee8abbdc64f4a4b7674925cba08e4a05ff9ebed6e2126b',
  key: 'karura',
  name: 'Karura',
  parachainId: 2000,
  ss58Format: 8,
  ws: 'wss://karura-rpc-0.aca-api.network',
});

export const khala = new SubstrateChain({
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0xd43540ba6d3eb4897c28a77d48cb5b729fea37603cbbfc7a86a73b72adb3be8d',
  key: 'khala',
  name: 'Khala',
  parachainId: 2004,
  ss58Format: 30,
  ws: 'wss://khala.api.onfinality.io/public-ws',
});

export const kinitsugi = new SubstrateChain({
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0x9af9a64e6e4da8e3073901c3ff0cc4c3aad9563786d89daf6ad820b6e14a0b8b',
  key: 'kintsugi',
  name: 'Kintsugi',
  parachainId: 2092,
  ss58Format: 2092,
  ws: 'wss://api-kusama.interlay.io/parachain',
});

export const kusama = new SubstrateChain({
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
  key: 'kusama',
  name: 'Kusama',
  parachainId: 0,
  ss58Format: 2,
  ws: 'wss://kusama-rpc.polkadot.io',
});

export const litentryAlphanet = new SubstrateChain({
  ecosystem: Ecosystem.AlphanetRelay,
  genesisHash:
    '0x4decfd421755d9008781d00ce40ea4cf47ec24a3717a34ca995126fc4a78c4f8',
  isTestChain: true,
  key: 'litentry-alphanet',
  name: 'Litentry Alphanet',
  parachainId: 2106,
  ss58Format: 131,
  ws: 'wss://moonbase-parachain-sg-0.litentry.io',
});

export const litmus = new SubstrateChain({
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0xda5831fbc8570e3c6336d0d72b8c08f8738beefec812df21ef2afc2982ede09c',
  key: 'litmus',
  name: 'Litmus',
  parachainId: 2106,
  ss58Format: 131,
  ws: 'wss://rpc.litmus-parachain.litentry.io',
});

export const moonbaseAlpha = new EthereumChain({
  ecosystem: Ecosystem.AlphanetRelay,
  id: 1287,
  isTestChain: true,
  key: 'moonbase-alpha',
  name: 'Moonbase Alpha',
  parachainId: 1000,
  ws: 'wss://wss.api.moonbase.moonbeam.network',
});

export const moonbaseBeta = new EthereumChain({
  ecosystem: Ecosystem.AlphanetRelay,
  id: 1287,
  isTestChain: true,
  key: 'moonbase-beta',
  name: 'Moonbase Beta',
  parachainId: 888,
  ws: 'wss://frag-moonbase-beta-rpc-ws.g.moonbase.moonbeam.network',
});

export const moonbeam = new EthereumChain({
  ecosystem: Ecosystem.Polkadot,
  id: 1284,
  key: 'moonbeam',
  name: 'Moonbeam',
  parachainId: 2004,
  ws: 'wss://wss.api.moonbeam.network',
});

export const moonriver = new EthereumChain({
  ecosystem: Ecosystem.Kusama,
  id: 1285,
  key: 'moonriver',
  name: 'Moonriver',
  parachainId: 2023,
  ws: 'wss://wss.api.moonriver.moonbeam.network',
});

export const parallel = new SubstrateChain({
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0xe61a41c53f5dcd0beb09df93b34402aada44cb05117b71059cce40a2723a4e97',
  key: 'parallel',
  name: 'Parallel',
  parachainId: 2012,
  ss58Format: 172,
  ws: 'wss://rpc.parallel.fi',
});

export const parallelHeiko = new SubstrateChain({
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0x64a1c658a48b2e70a7fb1ad4c39eea35022568c20fc44a6e2e3d0a57aee6053b',
  key: 'parallel-heiko',
  name: 'Parallel Heiko',
  parachainId: 2085,
  ss58Format: 110,
  ws: 'wss://heiko-rpc.parallel.fi',
});

export const phala = new SubstrateChain({
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0x1bb969d85965e4bb5a651abbedf21a54b6b31a21f66b5401cc3f1e286268d736',
  key: 'phala',
  name: 'Phala',
  parachainId: 2035,
  ss58Format: 30,
  ws: 'wss://api.phala.network/ws',
});

export const polkadot = new SubstrateChain({
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
  key: 'polkadot',
  name: 'Polkadot',
  parachainId: 0,
  ss58Format: 42,
  ws: 'wss://rpc.polkadot.io',
});

export const robonomics = new SubstrateChain({
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0x631ccc82a078481584041656af292834e1ae6daab61d2875b4dd0c14bb9b17bc',
  key: 'robonomics',
  name: 'Robonomics',
  parachainId: 2048,
  ss58Format: 32,
  ws: 'wss://robonomics.api.onfinality.io/public-ws',
});

export const shiden = new SubstrateChain({
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0xf1cf9022c7ebb34b162d5b5e34e705a5a740b2d0ecc1009fb89023e62a488108',
  key: 'shiden',
  name: 'Shiden',
  parachainId: 2007,
  ss58Format: 5,
  ws: 'wss://shiden.api.onfinality.io/public-ws',
});

export const statemine = new SubstrateChain({
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0x48239ef607d7928874027a43a67689209727dfb3d3dc5e5b03a39bdc2eda771a',
  key: 'statemine',
  name: 'Statemine',
  parachainId: 1000,
  ss58Format: 2,
  ws: 'wss://statemine-rpc.polkadot.io',
});

export const statemineAlphanet = new SubstrateChain({
  ecosystem: Ecosystem.AlphanetRelay,
  genesisHash:
    '0x2c63baa36880c9cf820d5ccfc4e49841bfd714e93ede2bebc4abc4531dd4e8a0',
  isTestChain: true,
  key: 'statemine-alphanet',
  name: 'Statemine Alphanet',
  parachainId: 1001,
  ss58Format: 42,
  ws: 'wss://frag-moonbase-sm-rpc-ws.g.moonbase.moonbeam.network/',
});

export const statemint = new SubstrateChain({
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f',
  key: 'statemint',
  name: 'Statemint',
  parachainId: 1000,
  ss58Format: 42,
  ws: 'wss://statemint-rpc.polkadot.io',
});

export const uniqueAlpha = new SubstrateChain({
  ecosystem: Ecosystem.AlphanetRelay,
  genesisHash:
    '0xbdf55f33d9f0b390f56413ec803c693af348edae64a659760248974b48b9a99e',
  isTestChain: true,
  key: 'unique-alphanet',
  name: 'Unique Alphanet',
  parachainId: 2095,
  ss58Format: 255,
  ws: 'wss://unique-alpha.unique.network',
});

export const chainsList: (EthereumChain | SubstrateChain)[] = [
  acala,
  alphanetRelay,
  astar,
  bifrostKusama,
  bifrostPolkadot,
  bitCountryPioneer,
  calamari,
  crustShadow,
  darwinia,
  darwiniaCrab,
  darwiniaPangoro,
  equilibrium,
  equilibriumAlphanet,
  integritee,
  interlay,
  karura,
  khala,
  kinitsugi,
  kusama,
  litentryAlphanet,
  litmus,
  moonbaseAlpha,
  moonbaseBeta,
  moonbeam,
  moonriver,
  parallel,
  parallelHeiko,
  phala,
  polkadot,
  robonomics,
  shiden,
  statemine,
  statemineAlphanet,
  statemint,
  uniqueAlpha,
];

export const chainsMap = new Map<string, EthereumChain | SubstrateChain>(
  chainsList.map((chain) => [chain.key, chain]),
);
