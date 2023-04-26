import {
  Ecosystem,
  EthereumChain,
  SubstrateChain,
} from '@moonbeam-network/xcm-types';
import { ExtrinsicConfigBuilderPrams } from '../src/extrinsic';

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

export const moonbaseAlpha = new EthereumChain({
  ecosystem: Ecosystem.AlphanetRelay,
  id: 1287,
  isTestChain: true,
  key: 'moonbase-alpha',
  name: 'Moonbase Alpha',
  parachainId: 1000,
  ws: 'wss://wss.api.moonbase.moonbeam.network',
});

export const extrinsicConfigBuilderPrams: ExtrinsicConfigBuilderPrams = {
  address: '0xeF46c7649270C912704fB09B75097f6E32208b85',
  amount: 99_000_000_000n,
  asset: 25_969,
  destination: moonbaseAlpha,
  fee: 5_000_000_000n,
  feeAsset: 25_000,
  origin: moonbaseAlpha,
  palletInstance: 10,
  source: equilibriumAlphanet,
};
