import {
  type AnyChain,
  ChainAsset,
  Ecosystem,
  EvmChain,
  EvmParachain,
  Parachain,
} from '@moonbeam-network/xcm-types';
import { getPolkadotAppsUrl } from '@moonbeam-network/xcm-utils';
import {
  aca,
  agng,
  alan,
  ampe,
  apillon,
  aseed,
  astr,
  atom,
  auq,
  axlusdc,
  betaDEV,
  bnc,
  bncs,
  cfg,
  crab,
  csm,
  dai,
  ded,
  dev,
  dot,
  eq,
  eqd,
  eth,
  fil,
  ftm,
  ftmwh,
  glmr,
  hdx,
  ibtc,
  intr,
  kar,
  kbtc,
  kint,
  kma,
  ksm,
  ldot,
  lit,
  manta,
  mgx,
  movr,
  neuro,
  nodl,
  otp,
  paring,
  peaq,
  pen,
  pha,
  pica,
  pink,
  ring,
  rmrk,
  sdn,
  stink,
  sub,
  teer,
  tnkr,
  tt1,
  tur,
  unit,
  usdc,
  usdcwh,
  usdt,
  usdtwh,
  vastr,
  vbnc,
  vdot,
  vfil,
  vglmr,
  vksm,
  vmanta,
  vmovr,
  wbtc,
  wbtce,
  weth,
  wethe,
  wifd,
  wstethe,
  xrt,
  ztg,
} from './assets';

export const acala = new Parachain({
  assets: [
    ChainAsset.fromAsset(aca, {
      decimals: 12,
      ids: {
        id: { Token: aca.originSymbol },
      },
    }),
    ChainAsset.fromAsset(aseed, {
      decimals: 12,
      ids: {
        id: { Token: 'AUSD' },
        minId: { NativeAssetId: { Token: 'AUSD' } },
      },
    }),
    ChainAsset.fromAsset(glmr, {
      decimals: 18,
      ids: {
        id: { ForeignAsset: 0 },
        minId: { ForeignAssetId: 0 },
      },
    }),
    ChainAsset.fromAsset(ldot, {
      decimals: 10,
      ids: {
        id: { Token: ldot.originSymbol },
        minId: { NativeAssetId: { Token: ldot.originSymbol } },
      },
    }),
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c',
  key: 'acala',
  name: 'Acala',
  nativeAsset: aca,
  parachainId: 2000,
  ss58Format: 10,
  ws: [
    'wss://acala-rpc.aca-api.network',
    'wss://acala-rpc.dwellir.com',
    'wss://acala-polkadot.api.onfinality.io/public-ws',
  ],
});

export const alphanetAssetHub = new Parachain({
  assets: [
    ChainAsset.fromAsset(tt1, {
      decimals: 18,
      ids: {
        id: 2,
        palletInstance: 50,
      },
    }),
    ChainAsset.fromAsset(unit, {
      decimals: 12,
    }),
  ],
  ecosystem: Ecosystem.AlphanetRelay,
  genesisHash:
    '0x2c63baa36880c9cf820d5ccfc4e49841bfd714e93ede2bebc4abc4531dd4e8a0',
  isTestChain: true,
  key: 'alphanet-asset-hub',
  name: 'Alphanet Asset Hub',
  nativeAsset: unit,
  parachainId: 1001,
  ss58Format: 42,
  ws: ['wss://frag-moonbase-sm-rpc-ws.g.moonbase.moonbeam.network/'],
});

export const alphanetRelay = new Parachain({
  assets: [
    ChainAsset.fromAsset(unit, {
      decimals: 12,
    }),
  ],
  ecosystem: Ecosystem.AlphanetRelay,
  genesisHash:
    '0xe1ea3ab1d46ba8f4898b6b4b9c54ffc05282d299f89e84bd0fd08067758c9443',
  isRelay: true,
  isTestChain: true,
  key: 'alphanet-relay',
  name: 'Alphanet Relay',
  nativeAsset: unit,
  parachainId: 0,
  ss58Format: 42,
  ws: [
    'wss://relay.api.moonbase.moonbeam.network',
    'wss://fro-moon-rpc-1-moonbase-relay-rpc-1.moonbase.ol-infra.network',
  ],
});

export const astar = new Parachain({
  assets: [
    ChainAsset.fromAsset(glmr, {
      decimals: 18,
      ids: {
        id: 18446744073709551619n,
      },
    }),
    ChainAsset.fromAsset(astr, {
      decimals: 18,
    }),
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6',
  key: 'astar',
  name: 'Astar',
  nativeAsset: astr,
  parachainId: 2006,
  ss58Format: 5,
  ws: [
    'wss://rpc.astar.network',
    'wss://astar-rpc.dwellir.com',
    'wss://astar.api.onfinality.io/public-ws',
  ],
});

export const bifrostKusama = new Parachain({
  assets: [
    ChainAsset.fromAsset(movr, {
      decimals: 18,
      ids: {
        id: { Token: movr.originSymbol },
      },
    }),
    ChainAsset.fromAsset(bnc, {
      decimals: 12,
      ids: {
        id: { Native: bnc.originSymbol },
      },
    }),
    ChainAsset.fromAsset(vbnc, {
      decimals: 12,
      ids: {
        id: { VToken: bnc.originSymbol },
      },
    }),
    ChainAsset.fromAsset(vksm, {
      decimals: 12,
      ids: {
        id: { VToken: ksm.originSymbol },
      },
    }),
    ChainAsset.fromAsset(vmovr, {
      decimals: 18,
      ids: {
        id: { VToken: movr.originSymbol },
      },
    }),
  ],
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0x9f28c6a68e0fc9646eff64935684f6eeeece527e37bbe1f213d22caa1d9d6bed',
  key: 'bifrost-kusama',
  name: 'Bifrost',
  nativeAsset: bnc,
  parachainId: 2001,
  ss58Format: 6,
  ws: [
    'wss://bifrost-rpc.dwellir.com',
    'wss://us.bifrost-rpc.liebi.com/ws',
    'wss://bifrost-rpc.liebi.com/ws',
    'wss://bifrost-parachain.api.onfinality.io/public-ws',
  ],
});

export const bifrostPolkadot = new Parachain({
  assets: [
    ChainAsset.fromAsset(glmr, {
      decimals: 18,
      ids: {
        id: { Token2: 1 },
      },
    }),
    ChainAsset.fromAsset(bnc, {
      decimals: 12,
      ids: {
        id: { Native: bnc.originSymbol },
      },
    }),
    ChainAsset.fromAsset(bncs, {
      decimals: 12,
      ids: {
        id: { Token2: 9 },
      },
    }),
    ChainAsset.fromAsset(fil, {
      decimals: 18,
      ids: {
        id: { Token2: 4 },
      },
    }),
    ChainAsset.fromAsset(vastr, {
      decimals: 18,
      ids: {
        id: { VToken2: 3 },
      },
    }),
    ChainAsset.fromAsset(vdot, {
      decimals: 10,
      ids: {
        id: { VToken2: 0 },
      },
    }),
    ChainAsset.fromAsset(vfil, {
      decimals: 18,
      ids: {
        id: { VToken2: 4 },
      },
    }),
    ChainAsset.fromAsset(vglmr, {
      decimals: 18,
      ids: {
        id: { VToken2: 1 },
      },
    }),
    ChainAsset.fromAsset(vmanta, {
      decimals: 18,
      ids: {
        id: { VToken2: 8 },
      },
    }),
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0x262e1b2ad728475fd6fe88e62d34c200abe6fd693931ddad144059b1eb884e5b',
  key: 'bifrost-polkadot',
  name: 'Bifrost',
  nativeAsset: bnc,
  parachainId: 2030,
  ss58Format: 6,
  ws: [
    'wss://bifrost-polkadot-rpc.dwellir.com',
    'wss://eu.bifrost-polkadot-rpc.liebi.com/ws',
    'wss://hk.p.bifrost-rpc.liebi.com/ws',
    'wss://bifrost-polkadot.api.onfinality.io/public-ws',
  ],
});

export const calamari = new Parachain({
  assets: [
    ChainAsset.fromAsset(movr, {
      decimals: 18,
      ids: {
        balanceId: 11,
        id: { MantaCurrency: 11 },
      },
    }),
    ChainAsset.fromAsset(kma, {
      decimals: 12,
      ids: {
        id: { MantaCurrency: 1 },
      },
    }),
  ],
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0x4ac80c99289841dd946ef92765bf659a307d39189b3ce374a92b5f0415ee17a1',
  key: 'calamari',
  name: 'Calamari',
  nativeAsset: kma,
  parachainId: 2084,
  ss58Format: 78,
  ws: [
    'wss://calamari.systems',
    // "wss://calamari-rpc.dwellir.com"
  ],
});

export const centrifuge = new Parachain({
  assets: [
    ChainAsset.fromAsset(cfg, {
      decimals: 18,
      ids: {
        id: 'Native',
      },
    }),
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0xb3db41421702df9a7fcac62b53ffeac85f7853cc4e689e0b93aeb3db18c09d82',
  key: 'centrifuge',
  name: 'Centrifuge',
  nativeAsset: cfg,
  parachainId: 2031,
  ss58Format: 36,
  ws: [
    'wss://fullnode.centrifuge.io',
    'wss://centrifuge-rpc.dwellir.com',
    'wss://centrifuge-parachain.api.onfinality.io/public-ws',
  ],
});

export const crustShadow = new Parachain({
  assets: [
    ChainAsset.fromAsset(movr, {
      decimals: 18,
      ids: {
        balanceId: 232263652204149413431520870009560565298n,
        id: { OtherReserve: 232263652204149413431520870009560565298n },
      },
    }),
    ChainAsset.fromAsset(csm, {
      decimals: 12,
    }),
  ],
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0xd4c0c08ca49dc7c680c3dac71a7c0703e5b222f4b6c03fe4c5219bb8f22c18dc',
  key: 'crust-shadow',
  name: 'Crust Shadow',
  nativeAsset: csm,
  parachainId: 2012,
  ss58Format: 66,
  ws: [
    'wss://rpc2-shadow.crust.network',
    'wss://rpc-shadow.crust.network/',
    'wss://rpc-shadow.crustnetwork.app',
  ],
});

export const darwinia = new EvmParachain({
  assets: [
    ChainAsset.fromAsset(ring, {
      decimals: 18,
      ids: {
        palletInstance: 5,
      },
    }),
    ChainAsset.fromAsset(glmr, {
      decimals: 18,
    }),
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0xf0b8924b12e8108550d28870bc03f7b45a947e1b2b9abf81bfb0b89ecb60570e',
  id: 46,
  key: 'darwinia',
  name: 'Darwinia',
  nativeAsset: ring,
  parachainId: 2046,
  rpc: 'https://rpc.darwinia.network',
  ss58Format: 18,
  ws: ['wss://rpc.darwinia.network', 'wss://darwinia-rpc.dwellir.com'],
});

export const darwiniaCrab = new EvmParachain({
  assets: [
    ChainAsset.fromAsset(crab, {
      decimals: 18,
      ids: {
        palletInstance: 5,
      },
    }),
    ChainAsset.fromAsset(movr, {
      decimals: 18,
    }),
  ],
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0x86e49c195aeae7c5c4a86ced251f1a28c67b3c35d8289c387ede1776cdd88b24',
  id: 44,
  key: 'darwinia-crab',
  name: 'Darwinia Crab',
  nativeAsset: crab,
  parachainId: 2105,
  rpc: 'https://crab-rpc.darwinia.network',
  ss58Format: 18,
  ws: ['wss://darwiniacrab-rpc.dwellir.com', 'wss://crab-rpc.darwinia.network'],
});

export const ethereum = new EvmChain({
  assets: [
    ChainAsset.fromAsset(eth, {
      decimals: 18,
    }),
    ChainAsset.fromAsset(usdc, {
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      decimals: 6,
    }),
    ChainAsset.fromAsset(usdt, {
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      decimals: 6,
    }),
    ChainAsset.fromAsset(dai, {
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      decimals: 18,
    }),
    ChainAsset.fromAsset(wbtc, {
      address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      decimals: 8,
    }),
    ChainAsset.fromAsset(glmr, {
      address: '0x93d3696A9F879b331f40CB5059e37015423A3Bd0',
      decimals: 18,
    }),
    ChainAsset.fromAsset(peaq, {
      address: '0x6e642b4dfe787b8f101d1fb66c2ef56e2b4c6c52',
      decimals: 18,
    }),
  ],
  ecosystem: Ecosystem.Polkadot,
  explorer: 'https://etherscan.io',
  id: 1,
  key: 'ethereum',
  name: 'Ethereum',
  nativeAsset: eth,
  rpc: 'https://ethereum-rpc.publicnode.com',
  wh: {
    name: 'Ethereum',
  },
});

export const fantomTestnet = new EvmChain({
  assets: [
    ChainAsset.fromAsset(ftm, {
      decimals: 18,
    }),
    ChainAsset.fromAsset(dev, {
      address: '0x41E3CFDFC255A4bF3C8D3560Bc8D3D9b5080338e',
      decimals: 18,
    }),
    ChainAsset.fromAsset(agng, {
      address: '0xBb4D53C75654D28f69470546414401A2b31b586c',
      decimals: 18,
    }),
  ],
  ecosystem: Ecosystem.AlphanetRelay,
  explorer: 'https://testnet.ftmscan.com',
  id: 4_002,
  isTestChain: true,
  key: 'fantom-testnet',
  name: 'Fantom Testnet',
  nativeAsset: ftm,
  rpc: 'https://fantom-testnet-rpc.publicnode.com',
  wh: {
    name: 'Fantom',
  },
});

export const hydration = new Parachain({
  assets: [
    ChainAsset.fromAsset(hdx, {
      decimals: 12,
      ids: {
        id: 0,
      },
    }),
    ChainAsset.fromAsset(glmr, {
      decimals: 18,
      ids: {
        id: 16,
      },
    }),
    ChainAsset.fromAsset(dai, {
      decimals: 18,
      ids: {
        id: 18,
      },
    }),
    ChainAsset.fromAsset(usdcwh, {
      decimals: 6,
      ids: {
        id: 21,
      },
    }),
    ChainAsset.fromAsset(usdtwh, {
      decimals: 6,
      ids: {
        id: 23,
      },
    }),
    ChainAsset.fromAsset(wbtc, {
      decimals: 8,
      ids: {
        id: 19,
      },
    }),
    ChainAsset.fromAsset(weth, {
      decimals: 18,
      ids: {
        id: 20,
      },
    }),
  ],
  ecosystem: Ecosystem.Polkadot,
  explorer: 'https://hydradx.subscan.io',
  genesisHash:
    '0xafdc188f45c71dacbaa0b62e16a91f726c7b8699a9748cdf715459de6b7f366d',
  key: 'hydration',
  name: 'Hydration',
  nativeAsset: hdx,
  parachainId: 2034,
  ss58Format: 63,
  ws: [
    'wss://rpc.hydradx.cloud',
    'wss://rpc.helikon.io/hydradx',
    'wss://hydradx.paras.dotters.network',
    'wss://hydradx-rpc.dwellir.com',
  ],
});

export const hydrationAlphanet = new Parachain({
  assets: [
    ChainAsset.fromAsset(hdx, {
      decimals: 12,
      ids: {
        id: 0,
      },
    }),
    ChainAsset.fromAsset(usdcwh, {
      decimals: 6,
      ids: {
        id: 1000001,
      },
    }),
    ChainAsset.fromAsset(ftmwh, {
      decimals: 18,
      ids: {
        id: 1000002,
      },
    }),
    ChainAsset.fromAsset(usdtwh, {
      decimals: 6,
      ids: {
        id: 2,
      },
    }),
    ChainAsset.fromAsset(dev, {
      decimals: 18,
      ids: {
        id: 1,
      },
    }),
  ],
  ecosystem: Ecosystem.AlphanetRelay,
  explorer: getPolkadotAppsUrl(
    'wss://hydradx-moonbase-rpc.play.hydration.cloud',
  ),
  genesisHash:
    '0x025980095be141a99f983631c49271af15cab61c4ce0d73db73192443932669a',
  isTestChain: true,
  key: 'hydration-Alphanet',
  name: 'Hydration Alphanet',
  nativeAsset: hdx,
  parachainId: 2034,
  ss58Format: 63,
  ws: ['wss://hydradx-moonbase-rpc.play.hydration.cloud'],
});

export const integritee = new Parachain({
  assets: [
    ChainAsset.fromAsset(teer, {
      decimals: 12,
      ids: {
        id: teer.originSymbol,
      },
    }),
  ],
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0xcdedc8eadbfa209d3f207bba541e57c3c58a667b05a2e1d1e86353c9000758da',
  key: 'integritee',
  name: 'Integritee',
  nativeAsset: teer,
  parachainId: 2015,
  ss58Format: 13,
  ws: [
    'wss://kusama.api.integritee.network',
    'wss://integritee-kusama.api.onfinality.io/public-ws',
  ],
});

export const interlay = new Parachain({
  assets: [
    ChainAsset.fromAsset(glmr, {
      decimals: 18,
      ids: {
        id: { ForeignAsset: 10 },
      },
    }),
    ChainAsset.fromAsset(intr, {
      decimals: 10,
      ids: {
        id: { Token: intr.originSymbol },
      },
    }),
    ChainAsset.fromAsset(ibtc, {
      decimals: 8,
      ids: {
        id: { Token: ibtc.originSymbol },
      },
    }),
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0xbf88efe70e9e0e916416e8bed61f2b45717f517d7f3523e33c7b001e5ffcbc72',
  key: 'interlay',
  name: 'Interlay',
  nativeAsset: intr,
  parachainId: 2032,
  ss58Format: 2032,
  ws: ['wss://api.interlay.io/parachain', 'wss://interlay-rpc.dwellir.com'],
});

export const karura = new Parachain({
  assets: [
    ChainAsset.fromAsset(movr, {
      decimals: 18,
      ids: {
        id: { ForeignAsset: 3 },
        minId: { ForeignAssetId: 3 },
      },
    }),
    ChainAsset.fromAsset(kar, {
      decimals: 12,
      ids: {
        id: { Token: kar.originSymbol },
      },
    }),
    ChainAsset.fromAsset(aseed, {
      decimals: 12,
      ids: {
        id: { Token: 'KUSD' },
        minId: { NativeAssetId: { Token: 'KUSD' } },
      },
    }),
  ],
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0xbaf5aabe40646d11f0ee8abbdc64f4a4b7674925cba08e4a05ff9ebed6e2126b',
  key: 'karura',
  name: 'Karura',
  nativeAsset: kar,
  parachainId: 2000,
  ss58Format: 8,
  ws: [
    'wss://karura-rpc-0.aca-api.network',
    'wss://karura-rpc.dwellir.com',
    'wss://karura.api.onfinality.io/public-ws',
  ],
});

export const khala = new Parachain({
  assets: [
    ChainAsset.fromAsset(movr, {
      decimals: 18,
      ids: {
        id: 6,
        palletInstance: 10,
      },
    }),
    ChainAsset.fromAsset(pha, {
      decimals: 12,
    }),
  ],
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0xd43540ba6d3eb4897c28a77d48cb5b729fea37603cbbfc7a86a73b72adb3be8d',
  key: 'khala',
  name: 'Khala',
  nativeAsset: pha,
  parachainId: 2004,
  ss58Format: 30,
  ws: [
    'wss://khala-rpc.dwellir.com',
    'wss://khala-api.phala.network/ws',
    'wss://khala.api.onfinality.io/public-ws',
  ],
});

export const kintsugi = new Parachain({
  assets: [
    ChainAsset.fromAsset(kint, {
      decimals: 12,
      ids: {
        id: { Token: kint.originSymbol },
      },
    }),
    ChainAsset.fromAsset(kbtc, {
      decimals: 8,
      ids: {
        id: { Token: kbtc.originSymbol },
      },
    }),
  ],
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0x9af9a64e6e4da8e3073901c3ff0cc4c3aad9563786d89daf6ad820b6e14a0b8b',
  key: 'kintsugi',
  name: 'Kintsugi',
  nativeAsset: kint,
  parachainId: 2092,
  ss58Format: 2092,
  ws: [
    'wss://api-kusama.interlay.io/parachain',
    'wss://kintsugi-rpc.dwellir.com',
    'wss://kintsugi.api.onfinality.io/public-ws',
  ],
});

export const kusama = new Parachain({
  assets: [ChainAsset.fromAsset(ksm, { decimals: 12 })],
  checkSovereignAccountBalances: true,
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
  isRelay: true,
  key: 'kusama',
  name: 'Kusama',
  nativeAsset: ksm,
  parachainId: 0,
  ss58Format: 2,
  ws: [
    'wss://kusama-rpc.dwellir.com',
    'wss://kusama.api.onfinality.io/public-ws',
    'wss://kusama-rpc.polkadot.io',
  ],
});

export const kusamaAssetHub = new Parachain({
  assets: [
    ChainAsset.fromAsset(usdt, {
      decimals: 6,
      ids: {
        id: 1984,
        palletInstance: 50,
      },
    }),
    ChainAsset.fromAsset(rmrk, {
      decimals: 10,
      ids: {
        id: 8,
        palletInstance: 50,
      },
    }),
    ChainAsset.fromAsset(ksm, {
      decimals: 12,
    }),
  ],
  checkSovereignAccountBalances: true,
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0x48239ef607d7928874027a43a67689209727dfb3d3dc5e5b03a39bdc2eda771a',
  key: 'kusama-asset-hub',
  name: 'Kusama Asset Hub',
  nativeAsset: ksm,
  parachainId: 1000,
  ss58Format: 2,
  ws: [
    'wss://asset-hub-kusama-rpc.dwellir.com',
    'wss://kusama-asset-hub-rpc.polkadot.io',
  ],
});

export const mangataKusama = new Parachain({
  assets: [
    ChainAsset.fromAsset(mgx, {
      decimals: 18,
      ids: {
        id: 0,
      },
    }),
    ChainAsset.fromAsset(movr, {
      decimals: 18,
      ids: {
        id: 39,
      },
    }),
  ],
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0xd611f22d291c5b7b69f1e105cca03352984c344c4421977efaa4cbdd1834e2aa',
  key: 'mangata-kusama',
  name: 'Mangata',
  nativeAsset: mgx,
  parachainId: 2110,
  ss58Format: 42,
  ws: [
    'wss://kusama-archive.mangata.online',
    'wss://kusama-rpc.mangata.online',
  ],
});

export const mantaParachain = new Parachain({
  assets: [
    ChainAsset.fromAsset(manta, {
      decimals: 18,
      ids: {
        id: { MantaCurrency: 1 },
      },
    }),
    ChainAsset.fromAsset(glmr, {
      decimals: 18,
      ids: {
        id: { MantaCurrency: 10 },
      },
    }),
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0xf3c7ad88f6a80f366c4be216691411ef0622e8b809b1046ea297ef106058d4eb',
  key: 'manta',
  name: 'Manta',
  nativeAsset: manta,
  parachainId: 2104,
  ss58Format: 77,
  ws: ['wss://ws.manta.systems'],
});

export const moonbaseAlpha = new EvmParachain({
  assets: [
    ChainAsset.fromAsset(alan, {
      address: '0x9133c5a22024118804089f1fB752b7B2ce2a6351',
      decimals: 18,
    }),
    ChainAsset.fromAsset(ampe, {
      address: '0xfFfFfffF7fee8415e1c2AC3A15C48D3546B95e16',
      decimals: 12,
      ids: {
        id: '170050401128744171791743427490841452054',
      },
    }),
    ChainAsset.fromAsset(atom, {
      address: '0xffffffffb7cdb201c395c238350568f17cfbd3b5', // Picasso Cosmos Hub
      decimals: 6,
      ids: {
        id: '244316754493307480955066032215622931381',
      },
    }),
    ChainAsset.fromAsset(dev, {
      address: '0x0000000000000000000000000000000000000802',
      decimals: 18,
      min: 0.01,
      ids: {
        palletInstance: 3,
      },
    }),
    ChainAsset.fromAsset(lit, {
      address: '0xfffFFfFF31103d490325BB0a8E40eF62e2F614C0',
      decimals: 12,
      ids: {
        id: '65216491554813189869575508812319036608',
      },
    }),
    ChainAsset.fromAsset(otp, {
      address: '0xFfffffFfB3229c8E7657eABEA704d5e75246e544',
      decimals: 12,
      ids: {
        id: '238111524681612888331172110363070489924',
      },
    }),
    ChainAsset.fromAsset(paring, {
      address: '0xFFFffFfF8283448b3cB519Ca4732F2ddDC6A6165',
      decimals: 18,
      ids: {
        id: '173481220575862801646329923366065693029',
      },
    }),
    ChainAsset.fromAsset(pica, {
      address: '0xFFFfFFFF10DD5Fd142163a40Ce0dae8c56e2801f',
      decimals: 6,
      ids: {
        id: '22417088946346045371238623691600461855',
      },
    }),
    ChainAsset.fromAsset(tt1, {
      address: '0xfFffFfFf75976211C786fe4d73d2477e222786Ac',
      decimals: 18,
      ids: {
        id: '156305701417244550631956600137082963628',
      },
    }),
    ChainAsset.fromAsset(tur, {
      address: '0xfFffffFf6448d0746f2a66342B67ef9CAf89478E',
      decimals: 10,
      ids: {
        id: '133300872918374599700079037156071917454',
      },
    }),
    ChainAsset.fromAsset(unit, {
      address: '0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080',
      decimals: 12,
      ids: {
        id: '42259045809535163221576417993425387648',
      },
    }),
    ChainAsset.fromAsset(ftmwh, {
      address: '0x566c1cebc6A4AFa1C122E039C4BEBe77043148Ee',
      decimals: 18,
      ids: {
        palletInstance: 48,
      },
    }),
    ChainAsset.fromAsset(hdx, {
      address: '0xFFFfFfff345Dc44DDAE98Df024Eb494321E73FcC',
      decimals: 12,
      ids: {
        id: '69606720909260275826784788104880799692',
      },
    }),
    ChainAsset.fromAsset(usdcwh, {
      address: '0xE5dE10C4b744bac6b783fAF8d9B9fDFF14Acc3c9',
      decimals: 6,
      ids: {
        palletInstance: 48,
      },
    }),
    ChainAsset.fromAsset(agng, {
      address: '0xFFfFFFFF38794F8c53fC7325ea07463dc6965e20',
      decimals: 18,
      ids: {
        id: '75066649112131892397889252914026143264',
      },
    }),
  ],
  ecosystem: Ecosystem.AlphanetRelay,
  explorer: 'https://moonbase.moonscan.io',
  genesisHash:
    '0x91bc6e169807aaa54802737e1c504b2577d4fafedd5a02c10293b1cd60e39527',
  id: 1287,
  isEvmSigner: true,
  isTestChain: true,
  key: 'moonbase-alpha',
  name: 'Moonbase Alpha',
  nativeAsset: dev,
  parachainId: 1000,
  rpc: 'https://rpc.api.moonbase.moonbeam.network',
  ss58Format: 1287,
  ws: ['wss://wss.api.moonbase.moonbeam.network'],
  wh: {
    name: 'Moonbeam',
  },
});

export const moonbaseBeta = new EvmParachain({
  assets: [
    ChainAsset.fromAsset(betaDEV, {
      decimals: 18,
    }),
    ChainAsset.fromAsset(dev, {
      decimals: 18,
      ids: {
        balanceId: '222902676330054289648817870329963141953',
        id: { ForeignAsset: '222902676330054289648817870329963141953' },
      },
    }),
    ChainAsset.fromAsset(alan, {
      decimals: 18,
      ids: {
        balanceId: '85534404031760856987006367174489651085',
        id: { ForeignAsset: '85534404031760856987006367174489651085' },
      },
    }),
    ChainAsset.fromAsset(usdcwh, {
      decimals: 6,
      ids: {
        balanceId: '319794858556516669238969276945382613133',
        id: { ForeignAsset: '319794858556516669238969276945382613133' },
      },
    }),
    ChainAsset.fromAsset(ftmwh, {
      decimals: 18,
      ids: {
        balanceId: '198801030527939140930753142903035039136',
        id: { ForeignAsset: '198801030527939140930753142903035039136' },
      },
    }),
  ],
  ecosystem: Ecosystem.AlphanetRelay,
  explorer: getPolkadotAppsUrl(
    'wss://moonbase-beta.api.moonbase.moonbeam.network',
  ),
  genesisHash:
    '0xeebb5d05763801e54d6a7a60a4b7998ac125c4d050dcec418dd07ea959a54464',
  id: 1282,
  isTestChain: true,
  key: 'moonbase-beta',
  name: 'Moonbase Beta',
  nativeAsset: betaDEV,
  parachainId: 888,
  rpc: 'https://frag-moonbase-beta-rpc.g.moonbase.moonbeam.network',
  ss58Format: 1287,
  ws: [
    'wss://moonbase-beta.api.moonbase.moonbeam.network',
    'wss://deo-moon-rpc-1-moonbase-beta-rpc-1.moonbase.ol-infra.network',
  ],
});

export const moonbeam = new EvmParachain({
  assets: [
    ChainAsset.fromAsset(aca, {
      address: '0xffffFFffa922Fef94566104a6e5A35a4fCDDAA9f',
      decimals: 12,
      ids: {
        id: '224821240862170613278369189818311486111',
      },
    }),
    ChainAsset.fromAsset(astr, {
      address: '0xFfFFFfffA893AD19e540E172C10d78D4d479B5Cf',
      decimals: 18,
      ids: {
        id: '224077081838586484055667086558292981199',
      },
    }),
    ChainAsset.fromAsset(aseed, {
      address: '0xfFfFFFFF52C56A9257bB97f4B2b6F7B2D624ecda',
      decimals: 12,
      ids: {
        id: '110021739665376159354538090254163045594',
      },
    }),
    ChainAsset.fromAsset(axlusdc, {
      address: '0xCa01a1D0993565291051daFF390892518ACfAD3A',
      decimals: 6,
      ids: {
        palletInstance: 110,
      },
    }),
    ChainAsset.fromAsset(bnc, {
      address: '0xFFffffFf7cC06abdF7201b350A1265c62C8601d2',
      decimals: 12,
      ids: {
        id: '165823357460190568952172802245839421906',
      },
    }),
    ChainAsset.fromAsset(bncs, {
      address: '0xfFfffffF6aF229AE7f0F4e0188157e189a487D59',
      decimals: 12,
      ids: {
        id: '142155548796783636521833385094843759961',
      },
    }),
    ChainAsset.fromAsset(cfg, {
      address: '0xFFfFfFff44bD9D2FFEE20B25D1Cf9E78Edb6Eae3',
      decimals: 18,
      ids: {
        id: '91372035960551235635465443179559840483',
      },
    }),
    ChainAsset.fromAsset(dai, {
      address: '0x06e605775296e851FF43b4dAa541Bb0984E9D6fD',
      decimals: 18,
      ids: {
        palletInstance: 110,
      },
    }),
    ChainAsset.fromAsset(ded, {
      address: '0xfFffFFFf5da2d7214D268375cf8fb1715705FdC6',
      decimals: 10,
      ids: {
        id: '124463719055550872076363892993240202694',
      },
    }),
    ChainAsset.fromAsset(dot, {
      address: '0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080',
      decimals: 10,
      ids: {
        id: '42259045809535163221576417993425387648',
      },
    }),
    ChainAsset.fromAsset(eq, {
      address: '0xFffFFfFf8f6267e040D8a0638C576dfBa4F0F6D6',
      decimals: 9,
      ids: {
        id: '190590555344745888270686124937537713878',
      },
    }),
    ChainAsset.fromAsset(eqd, {
      address: '0xFFffFfFF8cdA1707bAF23834d211B08726B1E499',
      decimals: 9,
      ids: {
        id: '187224307232923873519830480073807488153',
      },
    }),
    ChainAsset.fromAsset(fil, {
      address: '0xfFFfFFFF6C57e17D210DF507c82807149fFd70B2',
      decimals: 18,
      ids: {
        id: '144012926827374458669278577633504620722',
      },
    }),
    ChainAsset.fromAsset(glmr, {
      address: '0x0000000000000000000000000000000000000802',
      decimals: 18,
      min: 0.1,
      ids: {
        palletInstance: 10,
      },
    }),
    ChainAsset.fromAsset(hdx, {
      address: '0xFFFfFfff345Dc44DDAE98Df024Eb494321E73FcC',
      decimals: 12,
      ids: {
        id: '69606720909260275826784788104880799692',
      },
    }),
    ChainAsset.fromAsset(ibtc, {
      address: '0xFFFFFfFf5AC1f9A51A93F5C527385edF7Fe98A52',
      decimals: 8,
      ids: {
        id: '120637696315203257380661607956669368914',
      },
    }),
    ChainAsset.fromAsset(intr, {
      address: '0xFffFFFFF4C1cbCd97597339702436d4F18a375Ab',
      decimals: 10,
      ids: {
        id: '101170542313601871197860408087030232491',
      },
    }),
    ChainAsset.fromAsset(ldot, {
      address: '0xFFfFfFffA9cfFfa9834235Fe53f4733F1b8B28d4',
      decimals: 10,
      ids: {
        id: '225719522181998468294117309041779353812',
      },
    }),
    ChainAsset.fromAsset(manta, {
      address: '0xfFFffFFf7D3875460d4509eb8d0362c611B4E841',
      decimals: 18,
      ids: {
        id: '166446646689194205559791995948102903873',
      },
    }),
    ChainAsset.fromAsset(nodl, {
      address: '0xfffffffFe896ba7Cb118b9Fa571c6dC0a99dEfF1',
      decimals: 11,
      ids: {
        id: '309163521958167876851250718453738106865',
      },
    }),
    ChainAsset.fromAsset(neuro, {
      address: '0xFfffffFfB3229c8E7657eABEA704d5e75246e544',
      decimals: 12,
      ids: {
        id: '238111524681612888331172110363070489924',
      },
    }),
    ChainAsset.fromAsset(peaq, {
      address: '0xFffFFFFFEC4908b74688a01374f789B48E9a3eab',
      decimals: 18,
      ids: {
        id: '314077021455772878282433861213184736939',
      },
    }),
    ChainAsset.fromAsset(pha, {
      address: '0xFFFfFfFf63d24eCc8eB8a7b5D0803e900F7b6cED',
      decimals: 12,
      ids: {
        id: '132685552157663328694213725410064821485',
      },
    }),
    ChainAsset.fromAsset(pen, {
      address: '0xffFFfFFf2257622F345E1ACDe0D4f46D7d1D77D0',
      decimals: 12,
      ids: {
        id: '45647473099451451833602657905356404688',
      },
    }),
    ChainAsset.fromAsset(ring, {
      address: '0xFfffFfff5e90e365eDcA87fB4c8306Df1E91464f',
      decimals: 18,
      ids: {
        id: '125699734534028342599692732320197985871',
      },
    }),
    ChainAsset.fromAsset(sub, {
      address: '0xfFfFffFf43B4560Bc0C451a3386E082bff50aC90',
      decimals: 10,
      ids: {
        id: '89994634370519791027168048838578580624',
      },
    }),
    ChainAsset.fromAsset(usdc, {
      address: '0xFFfffffF7D2B0B761Af01Ca8e25242976ac0aD7D',
      decimals: 6,
      ids: {
        id: '166377000701797186346254371275954761085', // registered XC20 id for ERC20 tokens
      },
    }),
    ChainAsset.fromAsset(usdcwh, {
      address: '0x931715FEE2d06333043d11F658C8CE934aC61D0c',
      decimals: 6,
      ids: {
        palletInstance: 110,
      },
    }),
    ChainAsset.fromAsset(usdtwh, {
      address: '0xc30E9cA94CF52f3Bf5692aaCF81353a27052c46f',
      decimals: 6,
      ids: {
        palletInstance: 110,
      },
    }),
    ChainAsset.fromAsset(usdt, {
      address: '0xFFFFFFfFea09FB06d082fd1275CD48b191cbCD1d',
      decimals: 6,
      ids: {
        id: '311091173110107856861649819128533077277',
      },
    }),
    ChainAsset.fromAsset(vastr, {
      address: '0xFffFffff55C732C47639231a4C4373245763d26E',
      decimals: 18,
      ids: {
        id: '114018676402354620972806895487280206446', // registered XC20 id for ERC20 tokens
      },
    }),
    ChainAsset.fromAsset(vdot, {
      address: '0xFFFfffFf15e1b7E3dF971DD813Bc394deB899aBf',
      decimals: 10,
      ids: {
        id: '29085784439601774464560083082574142143', // registered XC20 id for ERC20 tokens
      },
    }),
    ChainAsset.fromAsset(vfil, {
      address: '0xFffffFffCd0aD0EA6576B7b285295c85E94cf4c1',
      decimals: 18,
      ids: {
        id: '272547899416482196831721420898811311297', // registered XC20 id for ERC20 tokens
      },
    }),
    ChainAsset.fromAsset(vglmr, {
      address: '0xFfFfFFff99dABE1a8De0EA22bAa6FD48fdE96F6c',
      decimals: 18,
      ids: {
        id: '204507659831918931608354793288110796652', // registered XC20 id for ERC20 tokens
      },
    }),
    ChainAsset.fromAsset(vmanta, {
      address: '0xFFfFFfFfdA2a05FB50e7ae99275F4341AEd43379',
      decimals: 18,
      ids: {
        id: '289989900872525819559124583375550296953', // registered XC20 id for ERC20 tokens
      },
    }),
    ChainAsset.fromAsset(wbtc, {
      address: '0xE57eBd2d67B462E9926e04a8e33f01cD0D64346D',
      decimals: 8,
      ids: {
        palletInstance: 110,
      },
    }),
    ChainAsset.fromAsset(weth, {
      address: '0xab3f0245B83feB11d15AAffeFD7AD465a59817eD',
      decimals: 18,
      ids: {
        palletInstance: 110,
      },
    }),
    ChainAsset.fromAsset(ztg, {
      address: '0xFFFFfffF71815ab6142E0E20c7259126C6B40612',
      decimals: 10,
      ids: {
        id: '150874409661081770150564009349448205842',
      },
    }),
    ChainAsset.fromAsset(pink, {
      address: '0xfFfFFfFf30478fAFBE935e466da114E14fB3563d',
      decimals: 10,
      ids: {
        id: '64174511183114006009298114091987195453',
      },
    }),
    ChainAsset.fromAsset(stink, {
      address: '0xffffffff54c556bd1d0f64ec6c78f1b477525e56',
      decimals: 10,
      ids: {
        id: '112679793397406599376365943185137098326',
      },
    }),
    ChainAsset.fromAsset(apillon, {
      address: '0xffffffff8a9736b44ebf188972725bed67bf694e',
      decimals: 18,
      ids: {
        id: '184218609779515850660274730699350567246',
      },
    }),
    ChainAsset.fromAsset(wifd, {
      address: '0xffffffff2e1d1ac9ea1686255befe995b31abc96',
      decimals: 10,
      ids: {
        id: '61295607754960722617854661686514597014',
      },
    }),
    ChainAsset.fromAsset(wbtce, {
      address: '0xffffffff1b4bb1ac5749f73d866ffc91a3432c47',
      decimals: 8,
      ids: {
        id: '36282181791341254438422467838694599751',
      },
    }),
    ChainAsset.fromAsset(wethe, {
      address: '0xffffffff86829afe1521ad2296719df3ace8ded7',
      decimals: 18,
      ids: {
        id: '178794693648360392906933130845919698647',
      },
    }),
    ChainAsset.fromAsset(wstethe, {
      address: '0xffffffff5d5deb44bf7278dee5381beb24cb6573',
      decimals: 18,
      ids: {
        id: '124105859028862849477017063633156007283',
      },
    }),
  ],
  ecosystem: Ecosystem.Polkadot,
  explorer: 'https://moonbeam.moonscan.io',
  genesisHash:
    '0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d',
  id: 1284,
  isEvmSigner: true,
  key: 'moonbeam',
  name: 'Moonbeam',
  nativeAsset: glmr,
  parachainId: 2004,
  rpc: 'https://rpc.api.moonbeam.network',
  ss58Format: 1284,
  ws: ['wss://wss.api.moonbeam.network'],
  wh: {
    name: 'Moonbeam',
  },
});

export const moonriver = new EvmParachain({
  assets: [
    ChainAsset.fromAsset(aseed, {
      address: '0xFfFffFFfa1B026a00FbAA67c86D5d1d5BF8D8228',
      decimals: 12,
      ids: {
        id: '214920334981412447805621250067209749032',
      },
    }),
    ChainAsset.fromAsset(bnc, {
      address: '0xFFfFFfFFF075423be54811EcB478e911F22dDe7D',
      decimals: 12,
      ids: {
        id: '319623561105283008236062145480775032445',
      },
    }),
    ChainAsset.fromAsset(crab, {
      address: '0xFFFffFfF8283448b3cB519Ca4732F2ddDC6A6165',
      decimals: 18,
      ids: {
        id: '173481220575862801646329923366065693029',
      },
    }),
    ChainAsset.fromAsset(csm, {
      address: '0xffFfFFFf519811215E05eFA24830Eebe9c43aCD7',
      decimals: 12,
      ids: {
        id: '108457044225666871745333730479173774551',
      },
    }),
    ChainAsset.fromAsset(kar, {
      address: '0xFfFFFFfF08220AD2E6e157f26eD8bD22A336A0A5',
      decimals: 12,
      ids: {
        id: '10810581592933651521121702237638664357',
      },
    }),
    ChainAsset.fromAsset(kbtc, {
      address: '0xFFFfFfFfF6E528AD57184579beeE00c5d5e646F0',
      decimals: 8,
      ids: {
        id: '328179947973504579459046439826496046832',
      },
    }),
    ChainAsset.fromAsset(kint, {
      address: '0xfffFFFFF83F4f317d3cbF6EC6250AeC3697b3fF2',
      decimals: 12,
      ids: {
        id: '175400718394635817552109270754364440562',
      },
    }),
    ChainAsset.fromAsset(kma, {
      address: '0xFFffFffFA083189f870640b141ae1E882c2b5bad',
      decimals: 12,
      ids: {
        id: '213357169630950964874127107356898319277',
      },
    }),
    ChainAsset.fromAsset(ksm, {
      address: '0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080',
      decimals: 12,
      ids: {
        id: '42259045809535163221576417993425387648',
      },
    }),
    ChainAsset.fromAsset(lit, {
      address: '0xfffFFfFF31103d490325BB0a8E40eF62e2F614C0',
      decimals: 12,
      ids: {
        id: '65216491554813189869575508812319036608',
      },
    }),
    ChainAsset.fromAsset(mgx, {
      address: '0xffFfFffF58d867EEa1Ce5126A4769542116324e9',
      decimals: 18,
      ids: {
        id: '118095707745084482624853002839493125353',
      },
    }),
    ChainAsset.fromAsset(movr, {
      address: '0x0000000000000000000000000000000000000802',
      decimals: 18,
      min: 0.01,
      ids: {
        palletInstance: 10,
      },
    }),
    ChainAsset.fromAsset(pha, {
      address: '0xffFfFFff8E6b63d9e447B6d4C45BDA8AF9dc9603',
      decimals: 12,
      ids: {
        id: '189307976387032586987344677431204943363',
      },
    }),
    ChainAsset.fromAsset(pica, {
      address: '0xFffFfFFf7dD9B9C60ac83e49D7E3E1f7A1370aD2',
      decimals: 12,
      ids: {
        id: '167283995827706324502761431814209211090',
      },
    }),
    ChainAsset.fromAsset(rmrk, {
      address: '0xffffffFF893264794d9d57E1E0E21E0042aF5A0A',
      decimals: 10,
      ids: {
        id: '182365888117048807484804376330534607370',
      },
    }),
    ChainAsset.fromAsset(sdn, {
      address: '0xFFFfffFF0Ca324C842330521525E7De111F38972',
      decimals: 18,
      ids: {
        id: '16797826370226091782818345603793389938',
      },
    }),
    ChainAsset.fromAsset(teer, {
      address: '0xFfFfffFf4F0CD46769550E5938F6beE2F5d4ef1e',
      decimals: 12,
      ids: {
        id: '105075627293246237499203909093923548958',
      },
    }),
    ChainAsset.fromAsset(tnkr, {
      address: '0xfFFfFffF683474B842852111cc31d470bD8f5081',
      decimals: 12,
      ids: {
        id: '138512078356357941985706694377215053953',
      },
    }),
    ChainAsset.fromAsset(tur, {
      address: '0xfFffffFf6448d0746f2a66342B67ef9CAf89478E',
      decimals: 10,
      ids: {
        id: '133300872918374599700079037156071917454',
      },
    }),
    ChainAsset.fromAsset(usdt, {
      address: '0xFFFFFFfFea09FB06d082fd1275CD48b191cbCD1d',
      decimals: 6,
      ids: {
        id: '311091173110107856861649819128533077277',
      },
    }),
    ChainAsset.fromAsset(xrt, {
      address: '0xFffFFffF51470Dca3dbe535bD2880a9CcDBc6Bd9',
      decimals: 9,
      ids: {
        id: '108036400430056508975016746969135344601',
      },
    }),
    ChainAsset.fromAsset(vbnc, {
      address: '0xFFffffff3646A00f78caDf8883c5A2791BfCDdc4',
      decimals: 12,
      ids: {
        id: '72145018963825376852137222787619937732',
      },
    }),
    ChainAsset.fromAsset(vksm, {
      address: '0xFFffffFFC6DEec7Fc8B11A2C8ddE9a59F8c62EFe',
      decimals: 12,
      ids: {
        id: '264344629840762281112027368930249420542',
      },
    }),
    ChainAsset.fromAsset(vmovr, {
      address: '0xfFfffFfF98e37bF6a393504b5aDC5B53B4D0ba11',
      decimals: 18,
      ids: {
        id: '203223821023327994093278529517083736593',
      },
    }),
  ],
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0x401a1f9dca3da46f5c4091016c8a2f26dcea05865116b286f60f668207d1474b',
  id: 1285,
  isEvmSigner: true,
  key: 'moonriver',
  name: 'Moonriver',
  nativeAsset: movr,
  parachainId: 2023,
  rpc: 'https://rpc.api.moonriver.moonbeam.network',
  ss58Format: 1285,
  ws: ['wss://wss.api.moonriver.moonbeam.network'],
});

export const neuroweb = new Parachain({
  assets: [
    ChainAsset.fromAsset(neuro, {
      decimals: 12,
      ids: {
        palletInstance: 10,
      },
    }),
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0xe7e0962324a3b86c83404dbea483f25fb5dab4c224791c81b756cfc948006174',
  key: 'neuroweb',
  name: 'NeuroWeb',
  nativeAsset: neuro,
  parachainId: 2043,
  ss58Format: 101,
  ws: [
    'wss://neuroweb-rpc.dwellir.com',
    'wss://parachain-rpc.origin-trail.network',
  ],
});

export const originTrailAlphanet = new Parachain({
  assets: [
    ChainAsset.fromAsset(otp, {
      decimals: 12,
      ids: {
        palletInstance: 10,
      },
    }),
  ],
  ecosystem: Ecosystem.AlphanetRelay,
  genesisHash:
    '0xe23ee00b26d1cdc7939d83dfe829c4f970cd26071f90d237cb2aded2b23214bf',
  isTestChain: true,
  key: 'origin-trail-alphanet',
  name: 'OriginTrail Alphanet',
  nativeAsset: otp,
  parachainId: 2043,
  ss58Format: 101,
  /* cspell:disable-next-line */
  ws: ['wss://otp-lunaris-alpha-node-02.origin-trail.network'],
});

export const peaqAlphanet = new Parachain({
  assets: [
    ChainAsset.fromAsset(agng, {
      decimals: 18,
      ids: {
        id: 0,
      },
    }),
    ChainAsset.fromAsset(dev, {
      decimals: 18,
      ids: {
        id: 1000,
      },
    }),
    ChainAsset.fromAsset(ftmwh, {
      decimals: 18,
      ids: {
        id: 1001,
      },
    }),
  ],
  ecosystem: Ecosystem.AlphanetRelay,
  explorer: getPolkadotAppsUrl('wss://moonbeam.peaq.network'),
  genesisHash:
    '0x2dfcd5c560f6db1667cbc2bc3791dfd337f88f400af6de39b1b8638ee7af6ed4',
  isTestChain: true,
  key: 'peaq-Alphanet',
  name: 'peaq Alphanet',
  nativeAsset: agng,
  parachainId: 3013,
  ss58Format: 42,
  ws: ['wss://moonbeam.peaq.network'],
});

export const peaqChain = new Parachain({
  assets: [
    ChainAsset.fromAsset(peaq, {
      decimals: 18,
      ids: {
        id: 0,
      },
    }),
    ChainAsset.fromAsset(dot, {
      decimals: 10,
      ids: {
        id: 10,
      },
    }),
    ChainAsset.fromAsset(glmr, {
      decimals: 18,
      ids: {
        id: 1000,
      },
    }),
    ChainAsset.fromAsset(usdcwh, {
      decimals: 6,
      ids: {
        id: 1001,
      },
    }),
    ChainAsset.fromAsset(weth, {
      decimals: 18,
      ids: {
        id: 1002,
      },
    }),
    ChainAsset.fromAsset(wbtc, {
      decimals: 8,
      ids: {
        id: 1003,
      },
    }),
    ChainAsset.fromAsset(dai, {
      decimals: 18,
      ids: {
        id: 1004,
      },
    }),
    ChainAsset.fromAsset(usdtwh, {
      decimals: 6,
      ids: {
        id: 1005,
      },
    }),
  ],
  ecosystem: Ecosystem.Polkadot,
  explorer: getPolkadotAppsUrl('wss://peaq.api.onfinality.io/public-ws'),
  genesisHash:
    '0xd2a5d385932d1f650dae03ef8e2748983779ee342c614f80854d32b8cd8fa48c',
  isTestChain: false,
  key: 'peaq',
  name: 'peaq',
  nativeAsset: peaq,
  parachainId: 3338,
  ss58Format: 42,
  ws: ['wss://peaq.api.onfinality.io/public-ws'],
});

export const peaqEvm = new EvmParachain({
  assets: [
    ChainAsset.fromAsset(peaq, {
      decimals: 18,
    }),
    ChainAsset.fromAsset(glmr, {
      address: '0xFfFfFffF000000000000000000000000000003e8',
      decimals: 18,
      ids: {
        id: '0xFfFfFffF000000000000000000000000000003e8',
        minId: 1000,
      },
    }),
    ChainAsset.fromAsset(usdcwh, {
      address: '0xFffFffFF000000000000000000000000000003E9',
      decimals: 6,
      ids: {
        id: '0xFffFffFF000000000000000000000000000003E9',
        minId: 1001,
      },
    }),
    ChainAsset.fromAsset(weth, {
      address: '0xFFFfFfFf000000000000000000000000000003ea',
      decimals: 18,
      ids: {
        id: '0xFFFfFfFf000000000000000000000000000003ea',
        minId: 1002,
      },
    }),
    ChainAsset.fromAsset(wbtc, {
      address: '0xfffFFFFF000000000000000000000000000003eb',
      decimals: 8,
      ids: {
        id: '0xfffFFFFF000000000000000000000000000003eb',
        minId: 1003,
      },
    }),
    ChainAsset.fromAsset(dai, {
      address: '0xfFffFFFF000000000000000000000000000003Ec',
      decimals: 18,
      ids: {
        id: '0xfFffFFFF000000000000000000000000000003Ec',
        minId: 1004,
      },
    }),
    ChainAsset.fromAsset(usdtwh, {
      address: '0xfFffffFF000000000000000000000000000003Ed',
      decimals: 6,
      ids: {
        id: '0xfFffffFF000000000000000000000000000003Ed',
        minId: 1005,
      },
    }),
  ],
  contracts: {
    Xtokens: '0x0000000000000000000000000000000000000803',
  },
  ecosystem: Ecosystem.Polkadot,
  explorer: 'https://peaq.subscan.io',
  genesisHash:
    '0xd2a5d385932d1f650dae03ef8e2748983779ee342c614f80854d32b8cd8fa48c',
  id: 3338,
  isEvmSigner: true,
  isTestChain: false,
  key: 'peaq-evm',
  name: 'peaq EVM',
  nativeAsset: peaq,
  parachainId: 3338,
  rpc: 'https://peaq.api.onfinality.io/public',
  ss58Format: 42,
  ws: ['wss://peaq.api.onfinality.io/public-ws'],
});

export const peaqEvmAlphanet = new EvmParachain({
  assets: [
    ChainAsset.fromAsset(agng, {
      decimals: 18,
    }),
    ChainAsset.fromAsset(dev, {
      address: '0xFfFfFffF000000000000000000000000000003e8',
      decimals: 18,
      ids: {
        id: '0xFfFfFffF000000000000000000000000000003e8',
        minId: 1000,
      },
    }),
    ChainAsset.fromAsset(ftmwh, {
      address: '0xFffFffFF000000000000000000000000000003E9',
      decimals: 18,
      ids: {
        id: '0xFffFffFF000000000000000000000000000003E9',
        minId: 1001,
      },
    }),
  ],
  contracts: {
    Batch: '0x0000000000000000000000000000000000000805',
    XcmUtils: '0x0000000000000000000000000000000000000804',
    Xtokens: '0x0000000000000000000000000000000000000803',
  },
  ecosystem: Ecosystem.AlphanetRelay,
  explorer: getPolkadotAppsUrl('wss://moonbeam.peaq.network'),
  genesisHash:
    '0x2dfcd5c560f6db1667cbc2bc3791dfd337f88f400af6de39b1b8638ee7af6ed4',
  id: 9990,
  isEvmSigner: true,
  isTestChain: true,
  key: 'peaq-evm-Alphanet',
  name: 'peaq EVM Alphanet',
  nativeAsset: agng,
  parachainId: 3013,
  rpc: 'https://moonbeam.PEAQ.network',
  ss58Format: 42,
  ws: ['wss://moonbeam.peaq.network'],
});

export const pendulum = new Parachain({
  assets: [
    ChainAsset.fromAsset(axlusdc, {
      decimals: 6,
      ids: {
        id: { XCM: 12 },
      },
    }),
    ChainAsset.fromAsset(pen, {
      decimals: 12,
      ids: {
        id: 'Native',
      },
    }),
    ChainAsset.fromAsset(glmr, {
      decimals: 18,
      ids: {
        id: { XCM: 6 },
      },
    }),
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0x5d3c298622d5634ed019bf61ea4b71655030015bde9beb0d6a24743714462c86',
  key: 'pendulum',
  name: 'Pendulum',
  nativeAsset: pen,
  parachainId: 2094,
  ss58Format: 56,
  ws: ['wss://rpc-pendulum.prd.pendulumchain.tech'],
});

export const pendulumAlphanet = new Parachain({
  assets: [
    ChainAsset.fromAsset(ampe, {
      decimals: 12,
      ids: {
        id: 'Native',
      },
    }),
    ChainAsset.fromAsset(dev, {
      decimals: 18,
      ids: {
        id: { XCM: 1 },
      },
    }),
  ],
  ecosystem: Ecosystem.AlphanetRelay,
  genesisHash:
    '0xe83b546ddeccf999d4b7fef4d83271034e82bb5db538e769c242c2731f61e8d6',
  isTestChain: true,
  key: 'pendulum-alphanet',
  name: 'Foucoco',
  nativeAsset: ampe,
  parachainId: 2124,
  ss58Format: 57,
  ws: ['wss://moonbeam-00.pendulumchain.tech:443'],
});

export const phala = new Parachain({
  assets: [
    ChainAsset.fromAsset(glmr, {
      decimals: 18,
      ids: {
        id: 1,
        palletInstance: 10,
      },
    }),
    ChainAsset.fromAsset(pha, {
      decimals: 12,
    }),
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0x1bb969d85965e4bb5a651abbedf21a54b6b31a21f66b5401cc3f1e286268d736',
  key: 'phala',
  name: 'Phala',
  nativeAsset: pha,
  parachainId: 2035,
  ss58Format: 30,
  ws: [
    'wss://phala-rpc.dwellir.com',
    'wss://api.phala.network/ws',
    'wss://phala.api.onfinality.io/public-ws',
    'wss://rpc.helikon.io/phala',
  ],
});

export const picasso = new Parachain({
  assets: [
    ChainAsset.fromAsset(pica, {
      decimals: 12,
      ids: {
        id: 1,
      },
    }),
    ChainAsset.fromAsset(movr, {
      decimals: 18,
      ids: {
        id: 23,
      },
      min: 0.0041,
    }),
  ],
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0x6811a339673c9daa897944dcdac99c6e2939cc88245ed21951a0a3c9a2be75bc',
  key: 'picasso',
  name: 'Picasso',
  nativeAsset: pica,
  parachainId: 2087,
  ss58Format: 49,
  ws: [
    'wss://picasso-rpc.dwellir.com',
    'wss://rpc.composablenodes.tech',
    'wss://picasso-rpc.composable.finance',
  ],
});

export const picassoAlphanet = new Parachain({
  assets: [
    ChainAsset.fromAsset(pica, {
      decimals: 12,
      ids: {
        id: 1,
      },
    }),
    ChainAsset.fromAsset(atom, {
      decimals: 6,
      ids: {
        id: 7,
      },
    }),
    ChainAsset.fromAsset(dev, {
      decimals: 18,
      ids: {
        id: 10,
      },
    }),
  ],
  ecosystem: Ecosystem.AlphanetRelay,
  genesisHash:
    '0x3db2074093ab964732631d842b99d6612a6dc75a379738a660642b05ccad59c8',
  isTestChain: true,
  key: 'picasso-alphanet',
  name: 'Picasso Alphanet',
  nativeAsset: pica,
  parachainId: 2019,
  ss58Format: 49,
  ws: ['wss://boot-01.picasso2270.composablenodes.tech/'],
});

export const polkadot = new Parachain({
  assets: [ChainAsset.fromAsset(dot, { decimals: 10 })],
  checkSovereignAccountBalances: true,
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
  isRelay: true,
  key: 'polkadot',
  name: 'Polkadot',
  nativeAsset: dot,
  parachainId: 0,
  ss58Format: 0,
  ws: [
    'wss://polkadot-rpc.dwellir.com',
    'wss://polkadot.api.onfinality.io/public-ws',
    'wss://rpc.polkadot.io/',
  ],
});

export const polkadotAssetHub = new Parachain({
  assets: [
    ChainAsset.fromAsset(usdt, {
      decimals: 6,
      ids: {
        id: 1984,
        palletInstance: 50,
      },
    }),
    ChainAsset.fromAsset(ded, {
      decimals: 10,
      ids: {
        id: 30,
        palletInstance: 50,
      },
    }),
    ChainAsset.fromAsset(dot, {
      decimals: 10,
    }),
    ChainAsset.fromAsset(usdc, {
      decimals: 6,
      ids: {
        id: 1337,
        palletInstance: 50,
      },
    }),
    ChainAsset.fromAsset(pink, {
      decimals: 10,
      ids: {
        id: 23,
        palletInstance: 50,
      },
    }),
    ChainAsset.fromAsset(stink, {
      decimals: 10,
      ids: {
        id: 42069,
        palletInstance: 50,
      },
    }),
    ChainAsset.fromAsset(apillon, {
      decimals: 18,
      ids: {
        id: 1024,
        palletInstance: 50,
      },
    }),
    ChainAsset.fromAsset(wifd, {
      decimals: 10,
      ids: {
        id: 17,
        palletInstance: 50,
      },
    }),
    ChainAsset.fromAsset(wbtce, {
      address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      decimals: 8,
    }),
    ChainAsset.fromAsset(wethe, {
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      decimals: 18,
    }),
    ChainAsset.fromAsset(wstethe, {
      address: '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
      decimals: 18,
    }),
  ],
  checkSovereignAccountBalances: true,
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f',
  key: 'Polkadot-asset-hub',
  name: 'Polkadot Asset Hub',
  nativeAsset: dot,
  parachainId: 1000,
  ss58Format: 42,
  ws: [
    'wss://asset-hub-polkadot-rpc.dwellir.com',
    'wss://polkadot-asset-hub-rpc.polkadot.io',
    'wss://statemint.api.onfinality.io/public-ws',
  ],
});

export const robonomics = new Parachain({
  assets: [
    ChainAsset.fromAsset(xrt, {
      decimals: 9,
    }),
  ],
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0x631ccc82a078481584041656af292834e1ae6daab61d2875b4dd0c14bb9b17bc',
  key: 'robonomics',
  name: 'Robonomics',
  nativeAsset: xrt,
  parachainId: 2048,
  ss58Format: 32,
  ws: [
    'wss://kusama.rpc.robonomics.network/',
    'wss://robonomics-rpc.dwellir.com',
  ],
});

export const shiden = new Parachain({
  assets: [
    ChainAsset.fromAsset(movr, {
      decimals: 18,
      ids: {
        id: 18446744073709551620n,
      },
    }),
    ChainAsset.fromAsset(sdn, {
      decimals: 18,
    }),
  ],
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0xf1cf9022c7ebb34b162d5b5e34e705a5a740b2d0ecc1009fb89023e62a488108',
  key: 'shiden',
  name: 'Shiden',
  nativeAsset: sdn,
  parachainId: 2007,
  ss58Format: 5,
  ws: [
    'wss://shiden-rpc.dwellir.com',
    'wss://rpc.shiden.astar.network',
    'wss://shiden.api.onfinality.io/public-ws',
  ],
});

export const subsocial = new Parachain({
  assets: [ChainAsset.fromAsset(sub, { decimals: 10 })],
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0x4a12be580bb959937a1c7a61d5cf24428ed67fa571974b4007645d1886e7c89f',
  key: 'subsocial',
  name: 'Subsocial',
  nativeAsset: sub,
  parachainId: 2101,
  ss58Format: 28,
  ws: ['wss://para.subsocial.network', 'wss://subsocial-rpc.dwellir.com'],
});

export const tinkernet = new Parachain({
  assets: [
    ChainAsset.fromAsset(tnkr, {
      decimals: 12,
      ids: {
        id: 0,
      },
    }),
  ],
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0xd42e9606a995dfe433dc7955dc2a70f495f350f373daa200098ae84437816ad2',
  key: 'tinkernet',
  name: 'InvArch Tinkernet',
  nativeAsset: tnkr,
  parachainId: 2125,
  ss58Format: 117,
  ws: ['wss://tinkernet-rpc.dwellir.com'],
});

export const turing = new Parachain({
  assets: [
    ChainAsset.fromAsset(tur, {
      decimals: 10,
    }),
    ChainAsset.fromAsset(movr, {
      decimals: 18,
      ids: {
        id: 9,
      },
    }),
  ],
  ecosystem: Ecosystem.Kusama,
  genesisHash:
    '0x0f62b701fb12d02237a33b84818c11f621653d2b1614c777973babf4652b535d',
  key: 'turing',
  name: 'Turing',
  nativeAsset: tur,
  parachainId: 2114,
  ss58Format: 51,
  ws: ['wss://rpc.turing.oak.tech', 'wss://turing-rpc.dwellir.com'],
});

export const turingAlphanet = new Parachain({
  assets: [
    ChainAsset.fromAsset(tur, {
      decimals: 10,
    }),
    ChainAsset.fromAsset(dev, {
      decimals: 18,
      ids: {
        id: 1,
      },
    }),
  ],
  ecosystem: Ecosystem.AlphanetRelay,
  genesisHash:
    '0x8288e57b61337833eb48e731c498e3c14652d15ead2abe5b86ba8b0fb51e917d',
  isTestChain: true,
  key: 'turing-alphanet',
  name: 'Turing Alphanet',
  nativeAsset: tur,
  parachainId: 2114,
  ss58Format: 51,
  ws: ['wss://turing-moonbase.rpc.oak.tech/'],
});

export const uniqueAlpha = new Parachain({
  assets: [
    ChainAsset.fromAsset(auq, {
      decimals: 0, // TODO: unknown for now
      ids: {
        id: { NativeAssetId: 'Here' },
      },
    }),
  ],
  ecosystem: Ecosystem.AlphanetRelay,
  genesisHash:
    '0xbdf55f33d9f0b390f56413ec803c693af348edae64a659760248974b48b9a99e',
  isTestChain: true,
  key: 'unique-alphanet',
  name: 'Unique Alphanet',
  nativeAsset: auq,
  parachainId: 2095,
  ss58Format: 255,
  ws: ['wss://unique-alpha.unique.network'],
});

export const zeitgeist = new Parachain({
  assets: [
    ChainAsset.fromAsset(ztg, {
      decimals: 10,
    }),
    ChainAsset.fromAsset(usdcwh, {
      decimals: 6,
      ids: {
        id: { ForeignAsset: 1 },
      },
    }),
    ChainAsset.fromAsset(glmr, {
      decimals: 18,
      ids: {
        id: { ForeignAsset: 3 },
      },
    }),
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    '0x1bf2a2ecb4a868de66ea8610f2ce7c8c43706561b6476031315f6640fe38e060',
  key: 'zeitgeist',
  name: 'Zeitgeist',
  nativeAsset: ztg,
  parachainId: 2092,
  ss58Format: 73,
  usesChainDecimals: true,
  ws: [
    'wss://main.rpc.zeitgeist.pm/ws',
    'wss://zeitgeist-rpc.dwellir.com',
    'wss://zeitgeist.api.onfinality.io/public-ws',
  ],
});

export const chainsList: AnyChain[] = [
  acala,
  alphanetAssetHub,
  alphanetRelay,
  astar,
  bifrostKusama,
  bifrostPolkadot,
  calamari,
  centrifuge,
  crustShadow,
  darwinia,
  darwiniaCrab,
  ethereum,
  fantomTestnet,
  hydration,
  hydrationAlphanet,
  integritee,
  interlay,
  karura,
  khala,
  kintsugi,
  kusama,
  kusamaAssetHub,
  mangataKusama,
  mantaParachain,
  moonbaseAlpha,
  moonbaseBeta,
  moonbeam,
  moonriver,
  neuroweb,
  originTrailAlphanet,
  peaqAlphanet,
  peaqChain,
  peaqEvm,
  peaqEvmAlphanet,
  pendulum,
  pendulumAlphanet,
  phala,
  picasso,
  picassoAlphanet,
  polkadot,
  polkadotAssetHub,
  robonomics,
  shiden,
  subsocial,
  tinkernet,
  turing,
  turingAlphanet,
  uniqueAlpha,
  zeitgeist,
];

export const chainsMap = new Map<string, AnyChain>(
  chainsList.map((chain) => [chain.key, chain]),
);
