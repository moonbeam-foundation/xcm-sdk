import { ChainKey } from '../../constants';
import { ChainsMap } from '../config.interfaces';
import { MoonriverChains } from './moonriver.interfaces';

export const MOONRIVER_CHAINS = <const>[
  ChainKey.Bifrost,
  ChainKey.Calamari,
  ChainKey.CrustShadow,
  ChainKey.Crab,
  ChainKey.Integritee,
  ChainKey.Karura,
  ChainKey.Khala,
  ChainKey.Kintsugi,
  ChainKey.Kusama,
  ChainKey.Litmus,
  ChainKey.Parallel,
  ChainKey.Robonomics,
  ChainKey.Shiden,
  ChainKey.Statemine,
];

export const MOONRIVER_CHAINS_MAP: ChainsMap<MoonriverChains> = {
  [ChainKey.Bifrost]: {
    key: ChainKey.Bifrost,
    name: 'Bifrost',
    ws: 'wss://bifrost-rpc.liebi.com/ws',
    weight: 1_000_000_000,
    parachainId: 2001,
    ss58Format: 6,
    genesisHash:
      '0x9f28c6a68e0fc9646eff64935684f6eeeece527e37bbe1f213d22caa1d9d6bed',
  },
  [ChainKey.Calamari]: {
    key: ChainKey.Calamari,
    name: 'Calamari',
    ws: 'wss://ws.calamari.systems',
    weight: 1_000_000_000,
    parachainId: 2084,
    moonAssetId: 11,
    ss58Format: 78,
    genesisHash:
      '0x4ac80c99289841dd946ef92765bf659a307d39189b3ce374a92b5f0415ee17a1',
  },
  [ChainKey.CrustShadow]: {
    key: ChainKey.CrustShadow,
    name: 'Crust Shadow',
    ws: 'wss://rpc2-shadow.crust.network',
    weight: 1_000_000_000,
    parachainId: 2012,
    moonAssetId: 232263652204149413431520870009560565298n,
    ss58Format: 66,
    genesisHash:
      '0xd4c0c08ca49dc7c680c3dac71a7c0703e5b222f4b6c03fe4c5219bb8f22c18dc',
  },
  [ChainKey.Crab]: {
    key: ChainKey.Crab,
    name: 'Darwinia Crab',
    ws: 'wss://crab-parachain-rpc.darwinia.network',
    weight: 1_000_000_000,
    parachainId: 2105,
    usesEthereumAccounts: true,
    genesisHash:
      '0xeac895d7768b17837a9c3a9f0280c01502c3ef40193df923490a0fa9c60ea076',
  },
  [ChainKey.Integritee]: {
    key: ChainKey.Integritee,
    name: 'Integritee',
    ws: 'wss://integritee-kusama.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2015,
    ss58Format: 13,
    genesisHash:
      '0xcdedc8eadbfa209d3f207bba541e57c3c58a667b05a2e1d1e86353c9000758da',
  },
  [ChainKey.Karura]: {
    key: ChainKey.Karura,
    name: 'Karura',
    ws: 'wss://karura-rpc-0.aca-api.network',
    weight: 1_000_000_000,
    parachainId: 2000,
    moonAssetId: 3,
    ss58Format: 8,
    genesisHash:
      '0xbaf5aabe40646d11f0ee8abbdc64f4a4b7674925cba08e4a05ff9ebed6e2126b',
  },
  [ChainKey.Khala]: {
    key: ChainKey.Khala,
    name: 'Khala',
    ws: 'wss://khala.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2004,
    moonAssetId: 6,
    palletInstance: 10,
    ss58Format: 30,
    genesisHash:
      '0xd43540ba6d3eb4897c28a77d48cb5b729fea37603cbbfc7a86a73b72adb3be8d',
  },
  [ChainKey.Kintsugi]: {
    key: ChainKey.Kintsugi,
    name: 'Kintsugi',
    ws: 'wss://api-kusama.interlay.io/parachain',
    weight: 1_000_000_000,
    parachainId: 2092,
    ss58Format: 2092,
    genesisHash:
      '0x9af9a64e6e4da8e3073901c3ff0cc4c3aad9563786d89daf6ad820b6e14a0b8b',
  },
  [ChainKey.Kusama]: {
    key: ChainKey.Kusama,
    name: 'Kusama',
    ws: 'wss://kusama-rpc.polkadot.io',
    weight: 1_000_000_000,
    parachainId: 0,
    ss58Format: 2,
    genesisHash:
      '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
  },
  [ChainKey.Litmus]: {
    key: ChainKey.Litmus,
    name: 'Litmus',
    ws: 'wss://rpc.litmus-parachain.litentry.io',
    weight: 1_000_000_000,
    parachainId: 2106,
    ss58Format: 131,
    genesisHash:
      '0xda5831fbc8570e3c6336d0d72b8c08f8738beefec812df21ef2afc2982ede09c',
  },
  [ChainKey.Parallel]: {
    key: ChainKey.Parallel,
    name: 'Parallel Heiko',
    ws: 'wss://heiko-rpc.parallel.fi',
    weight: 1_000_000_000,
    parachainId: 2085,
    moonAssetId: 113,
    ss58Format: 110,
    genesisHash:
      '0x64a1c658a48b2e70a7fb1ad4c39eea35022568c20fc44a6e2e3d0a57aee6053b',
  },
  [ChainKey.Robonomics]: {
    key: ChainKey.Robonomics,
    name: 'Robonomics',
    ws: 'wss://robonomics.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2048,
    ss58Format: 32,
    genesisHash:
      '0x631ccc82a078481584041656af292834e1ae6daab61d2875b4dd0c14bb9b17bc',
  },
  [ChainKey.Shiden]: {
    key: ChainKey.Shiden,
    name: 'Shiden',
    ws: 'wss://shiden.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2007,
    moonAssetId: 18446744073709551620n,
    palletInstance: 10,
    ss58Format: 5,
    genesisHash:
      '0xf1cf9022c7ebb34b162d5b5e34e705a5a740b2d0ecc1009fb89023e62a488108',
  },
  [ChainKey.Statemine]: {
    key: ChainKey.Statemine,
    name: 'Statemine',
    ws: 'wss://statemine-rpc.polkadot.io',
    weight: 1_000_000_000,
    parachainId: 1000,
    palletInstance: 50,
    ss58Format: 2,
    genesisHash:
      '0x48239ef607d7928874027a43a67689209727dfb3d3dc5e5b03a39bdc2eda771a',
  },
};
