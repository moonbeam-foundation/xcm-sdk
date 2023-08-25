import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { Ecosystem, Parachain } from '@moonbeam-network/xcm-types';
import { dev, hdx, wftm } from '../assets';
import { moonbaseAlpha } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const hydraDXAlphanet = new Parachain({
  assetsData: [
    {
      asset: wftm,
      id: 1000002,
    },
    {
      asset: dev,
      id: 1,
    },
    {
      asset: hdx,
      id: 0,
    },
  ],
  ecosystem: Ecosystem.AlphanetRelay,
  genesisHash:
    '0x025980095be141a99f983631c49271af15cab61c4ce0d73db73192443932669a',
  isTestChain: true,
  key: 'hydra-dx-alphanet',
  name: 'HydraDX Alphanet',
  parachainId: 2034,
  ss58Format: 63,
  ws: 'wss://hydradx-moonbase-rpc.play.hydration.cloud',
});

export const hydraDxAlphanetConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: wftm,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: 2, // TODO mjm
        asset: wftm,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
  ],
  chain: hydraDXAlphanet,
});
