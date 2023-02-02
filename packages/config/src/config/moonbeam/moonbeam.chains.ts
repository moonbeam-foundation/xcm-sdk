import { ChainKey } from '../../constants';
import { ChainsMap } from '../config.interfaces';
import { MoonbeamChains } from './moonbeam.interfaces';

export const MOONBEAM_CHAINS = <const>[
  ChainKey.Acala,
  ChainKey.Astar,
  ChainKey.BifrostPolkadot,
  ChainKey.Darwinia,
  ChainKey.Interlay,
  ChainKey.Parallel,
  ChainKey.Phala,
  ChainKey.Polkadot,
  ChainKey.Statemint,
];

export const MOONBEAM_CHAINS_MAP: ChainsMap<MoonbeamChains> = {
  [ChainKey.Acala]: {
    key: ChainKey.Acala,
    name: 'Acala',
    ws: 'wss://acala-rpc-0.aca-api.network',
    weight: 1_000_000_000,
    parachainId: 2000,
    moonAssetId: 0,
    ss58Format: 10,
    genesisHash:
      '0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c',
  },
  [ChainKey.Astar]: {
    key: ChainKey.Astar,
    name: 'Astar',
    ws: 'wss://rpc.astar.network',
    weight: 1_000_000_000,
    parachainId: 2006,
    moonAssetId: 18446744073709551619n,
    palletInstance: 10,
    ss58Format: 5,
    genesisHash:
      '0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6',
  },
  [ChainKey.BifrostPolkadot]: {
    key: ChainKey.BifrostPolkadot,
    name: 'Bifrost',
    ws: 'wss://hk.p.bifrost-rpc.liebi.com/ws',
    weight: 1_000_000_000,
    parachainId: 2030,
    moonAssetId: 1,
    ss58Format: 6,
    genesisHash:
      '0x262e1b2ad728475fd6fe88e62d34c200abe6fd693931ddad144059b1eb884e5b',
  },
  [ChainKey.Darwinia]: {
    key: ChainKey.Darwinia,
    name: 'Darwinia',
    ws: 'wss://parachain-rpc.darwinia.network',
    weight: 1_000_000_000,
    parachainId: 2046,
    ss58Format: 18,
    genesisHash:
      '0xe71578b37a7c799b0ab4ee87ffa6f059a6b98f71f06fb8c84a8d88013a548ad6',
  },
  [ChainKey.Interlay]: {
    key: ChainKey.Interlay,
    name: 'Interlay',
    ws: 'wss://interlay.api.onfinality.io/public-ws',
    weight: 1_000_000_000,
    parachainId: 2032,
    ss58Format: 2032,
    genesisHash:
      '0xbf88efe70e9e0e916416e8bed61f2b45717f517d7f3523e33c7b001e5ffcbc72',
  },
  [ChainKey.Parallel]: {
    key: ChainKey.Parallel,
    name: 'Parallel',
    ws: 'wss://rpc.parallel.fi',
    weight: 1_000_000_000,
    parachainId: 2012,
    moonAssetId: 114,
    ss58Format: 172,
    genesisHash:
      '0xe61a41c53f5dcd0beb09df93b34402aada44cb05117b71059cce40a2723a4e97',
  },
  [ChainKey.Phala]: {
    key: ChainKey.Phala,
    name: 'Phala',
    ws: 'wss://api.phala.network/ws',
    weight: 1_000_000_000,
    parachainId: 2035,
    moonAssetId: 1,
    ss58Format: 30,
    genesisHash:
      '0x1bb969d85965e4bb5a651abbedf21a54b6b31a21f66b5401cc3f1e286268d736',
  },
  [ChainKey.Polkadot]: {
    key: ChainKey.Polkadot,
    name: 'Polkadot',
    ws: 'wss://rpc.polkadot.io',
    weight: 1_000_000_000,
    parachainId: 0,
    ss58Format: 42,
    genesisHash:
      '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
  },
  [ChainKey.Statemint]: {
    key: ChainKey.Statemint,
    name: 'Statemint',
    ws: 'wss://statemint-rpc.polkadot.io',
    weight: 1_000_000_000,
    parachainId: 1000,
    palletInstance: 50,
    ss58Format: 42,
    genesisHash:
      '0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f',
  },
};
