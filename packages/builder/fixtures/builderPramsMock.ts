import {
  Ecosystem,
  EthereumChain,
  SubstrateChain,
} from '@moonbeam-network/xcm-types';
import { ExtrinsicConfigBuilderPrams } from '../src/extrinsic';

export const statemintAlphanetMock = new SubstrateChain({
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

export const moonbaseAlphaMock = new EthereumChain({
  ecosystem: Ecosystem.AlphanetRelay,
  id: 1287,
  isTestChain: true,
  key: 'moonbase-alpha',
  name: 'Moonbase Alpha',
  parachainId: 1000,
  ws: 'wss://wss.api.moonbase.moonbeam.network',
});

export const buildParamsMock: ExtrinsicConfigBuilderPrams = {
  address: '0xeF46c7649270C912704fB09B75097f6E32208b85',
  amount: 99_000_000_000n,
  asset: 'USDT',
  destination: moonbaseAlphaMock,
  fee: 5_000_000_000n,
  feeAsset: 'RMRK',
  origin: moonbaseAlphaMock,
  palletInstance: 10,
  source: statemintAlphanetMock,
};
