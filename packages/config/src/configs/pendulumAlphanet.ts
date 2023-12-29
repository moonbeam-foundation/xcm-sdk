import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { ampe, dev } from '../assets';
import { moonbaseAlpha, pendulumAlphanet } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const pendulumAlphanetConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: ampe,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: ampe,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: dev,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: 0.01,
        asset: dev,
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: ampe,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
  ],
  chain: pendulumAlphanet,
});
