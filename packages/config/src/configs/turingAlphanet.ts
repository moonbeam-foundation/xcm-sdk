import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { dev, tur } from '../assets';
import { moonbaseAlpha, turingAlphanet } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const turingAlphanetConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: tur,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: FeeBuilder()
          .xcmPaymentApi()
          .xcmPaymentFee({ isAssetReserveChain: false }),
        asset: tur,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .xTokens()
        .transferMultiAsset(turingAlphanet.parachainId)
        .X1(),
    }),
    new AssetConfig({
      asset: dev,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: FeeBuilder()
          .xcmPaymentApi()
          .xcmPaymentFee({ isAssetReserveChain: true }),
        asset: dev,
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: tur,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
  ],
  chain: turingAlphanet,
});
