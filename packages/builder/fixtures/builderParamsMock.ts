/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { vi } from 'vitest';
import {
  Asset,
  AssetAmount,
  ChainAsset,
  Ecosystem,
  EvmChain,
  EvmParachain,
  Parachain,
} from '@moonbeam-network/xcm-types';
import {
  ExtrinsicConfigBuilderPrams,
  MrlExtrinsicConfigBuilderPrams,
} from '../src/extrinsic';
import { WormholeConfigBuilderPrams } from '../src/wormhole';

export const apiMock = {
  tx: {
    polkadotXcm: { send: vi.fn(() => 'polkadotXcm.send => RESULT') },
    xTokens: { transfer: vi.fn(() => 'xTokens.transfer => RESULT') },
  },
} as any;

const test = new Asset({ key: 'usdt', originSymbol: 'USDT' });
const testChainAsset = ChainAsset.fromAsset(test, {
  address: '0x98891e5FD24Ef33A488A47101F65D212Ff6E650E',
  decimals: 18,
  ids: { palletInstance: 10 },
});
const testAssetAmount = AssetAmount.fromChainAsset(testChainAsset, {
  amount: 99_000_000_000n,
});

const test2 = new Asset({ key: 'rmrk', originSymbol: 'RMRK' });
const testChainAsset2 = ChainAsset.fromAsset(test2, {
  address: '0x2A1A1e691d79Bf461ac08a20cE3DF6E385b82444',
  decimals: 18,
  ids: { palletInstance: 18 },
});
const testAssetAmount2 = AssetAmount.fromChainAsset(testChainAsset2, {
  amount: 5_000_000_000n,
});

export const interlayTestnetMock = new Parachain({
  assets: [testChainAsset, testChainAsset2],
  ecosystem: Ecosystem.AlphanetRelay,
  genesisHash:
    '0x418ae94c9fce02b1ab3b5bc211cd2f2133426f2861d97482bbdfdac1bbb0fb92',
  isTestChain: true,
  key: 'interlay-testnet',
  name: 'Interlay Testnet',
  nativeAsset: test,
  parachainId: 2032,
  ss58Format: 2032,
  ws: ['wss://interlay-moonbeam-alphanet.interlay.io/'],
});

export const alphanetAssetHubMock = new Parachain({
  assets: [testChainAsset, testChainAsset2],
  ecosystem: Ecosystem.AlphanetRelay,
  genesisHash:
    '0x2c63baa36880c9cf820d5ccfc4e49841bfd714e93ede2bebc4abc4531dd4e8a0',
  isTestChain: true,
  key: 'alphanet-asset-hub',
  name: 'Alphanet Asset Hub',
  nativeAsset: test,
  parachainId: 1001,
  ss58Format: 42,
  ws: ['wss://frag-moonbase-sm-rpc-ws.g.moonbase.moonbeam.network/'],
});

export const moonbaseAlphaMock = new EvmParachain({
  assets: [testChainAsset, testChainAsset2],
  ecosystem: Ecosystem.AlphanetRelay,
  genesisHash:
    '0x91bc6e169807aaa54802737e1c504b2577d4fafedd5a02c10293b1cd60e39527',
  id: 1287,
  isTestChain: true,
  key: 'moonbase-alpha',
  name: 'Moonbase Alpha',
  nativeAsset: test,
  parachainId: 1000,
  rpc: 'https://rpc.api.moonbase.moonbeam.network',
  ss58Format: 1287,
  wh: { name: 'Moonbeam' },
  ws: ['wss://wss.api.moonbase.moonbeam.network'],
});

export const fantomTestnet = new EvmChain({
  assets: [testChainAsset, testChainAsset2],
  ecosystem: Ecosystem.AlphanetRelay,
  explorer: 'https://testnet.ftmscan.com',
  id: 4_002,
  isTestChain: true,
  key: 'fantom-testnet',
  name: 'Fantom Testnet',
  nativeAsset: test,
  rpc: 'https://rpc.testnet.fantom.network',
  wh: {
    name: 'Fantom',
  },
});

export const buildParamsMock: ExtrinsicConfigBuilderPrams = {
  asset: testAssetAmount,
  destination: moonbaseAlphaMock,
  destinationAddress: '0xeF46c7649270C912704fB09B75097f6E32208b85',
  destinationApi: apiMock,
  fee: testAssetAmount2,
  source: alphanetAssetHubMock,
  sourceAddress: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY,',
  sourceApi: apiMock,
};

export const buildParamsSameAssetMock: ExtrinsicConfigBuilderPrams = {
  asset: testAssetAmount,
  destination: moonbaseAlphaMock,
  destinationAddress: '0xeF46c7649270C912704fB09B75097f6E32208b85',
  destinationApi: apiMock,
  fee: testAssetAmount,
  source: alphanetAssetHubMock,
  sourceAddress: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY,',
  sourceApi: apiMock,
};

export const buildParachainParamsMock: ExtrinsicConfigBuilderPrams = {
  asset: testAssetAmount,
  destination: interlayTestnetMock,
  destinationAddress: 'wd84XqsQ4LVzhmTBVd4s5ApGt9sBnnk8K7Q5PhBwwhxwqgm1u',
  destinationApi: apiMock,
  fee: testAssetAmount2,
  source: alphanetAssetHubMock,
  sourceAddress: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY,',
  sourceApi: apiMock,
};

export const mrlBuildParamsMock: MrlExtrinsicConfigBuilderPrams = {
  ...buildParamsMock,
  moonApi: {} as any,
  moonAsset: testAssetAmount,
  moonChain: moonbaseAlphaMock,
  moonGasLimit: 999_999n,
  transact: {
    call: '0x4d79207465787420737472696e67',
    txWeight: {
      refTime: 24_902_375_000n,
      proofSize: 62_193n,
    },
  },
};

export const mrlBuildParamsMock2: MrlExtrinsicConfigBuilderPrams = {
  ...buildParachainParamsMock,
  moonApi: {} as any,
  moonAsset: testAssetAmount,
  moonChain: moonbaseAlphaMock,
  moonGasLimit: 999_999n,
  transact: {
    call: '0x4d79207465787420737472696e67',
    txWeight: {
      refTime: 24_902_375_000n,
      proofSize: 62_193n,
    },
  },
};

export const wormholeConfigBuilderPrams: WormholeConfigBuilderPrams = {
  asset: testAssetAmount,
  destination: alphanetAssetHubMock,
  destinationAddress: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  moonApi: {} as any,
  moonChain: moonbaseAlphaMock,
  source: fantomTestnet,
  sourceAddress: '0xeF46c7649270C912704fB09B75097f6E32208b85',
};

export const wormholeToMoonchainConfigBuilderPrams: WormholeConfigBuilderPrams =
  {
    asset: testAssetAmount,
    destination: moonbaseAlphaMock,
    destinationAddress: '0x98891e5FD24Ef33A488A47101F65D212Ff6E650E',
    moonApi: {} as any,
    moonChain: moonbaseAlphaMock,
    source: fantomTestnet,
    sourceAddress: '0xeF46c7649270C912704fB09B75097f6E32208b85',
  };
