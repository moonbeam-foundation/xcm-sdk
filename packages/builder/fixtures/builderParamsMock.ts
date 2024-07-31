/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Asset,
  Ecosystem,
  EvmParachain,
  Parachain,
} from '@moonbeam-network/xcm-types';
import { ExtrinsicConfigBuilderPrams } from '../src/extrinsic';

const test = new Asset({ key: 'test', originSymbol: 'TEST' });

export const interlayTestnetMock = new Parachain({
  assets: [],
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
  assets: [],
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
  assets: [],
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
  ws: ['wss://wss.api.moonbase.moonbeam.network'],
});

export const buildParamsMock: ExtrinsicConfigBuilderPrams = {
  api: {} as any,
  address: '0xeF46c7649270C912704fB09B75097f6E32208b85',
  amount: 99_000_000_000n,
  asset: 'USDT',
  destination: moonbaseAlphaMock,
  fee: 5_000_000_000n,
  feeAsset: 'RMRK',
  palletInstance: 10,
  source: alphanetAssetHubMock,
};

export const buildParamsSameAssetMock: ExtrinsicConfigBuilderPrams = {
  api: {} as any,
  address: '0xeF46c7649270C912704fB09B75097f6E32208b85',
  amount: 99_000_000_000n,
  asset: 'USDT',
  destination: moonbaseAlphaMock,
  fee: 5_000_000_000n,
  feeAsset: 'USDT',
  palletInstance: 10,
  source: alphanetAssetHubMock,
};

export const buildParachainParamsMock: ExtrinsicConfigBuilderPrams = {
  api: {} as any,
  address: 'wd84XqsQ4LVzhmTBVd4s5ApGt9sBnnk8K7Q5PhBwwhxwqgm1u',
  amount: 99_000_000_000n,
  asset: 'USDT',
  destination: interlayTestnetMock,
  fee: 5_000_000_000n,
  feeAsset: 'RMRK',
  palletInstance: 10,
  source: alphanetAssetHubMock,
};
