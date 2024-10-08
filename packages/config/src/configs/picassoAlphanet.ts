import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { atom, dev, pica } from '../assets';
import { moonbaseAlpha, picassoAlphanet } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const picassoAlphanetConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: pica,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: FeeBuilder()
          .xcmPaymentApi()
          .xcmPaymentFee({ isAssetReserveChain: false }),
        asset: pica,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: atom,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonbaseAlpha,
      destinationFee: {
        amount: FeeBuilder()
          .xcmPaymentApi()
          .xcmPaymentFee({ isAssetReserveChain: false }),
        asset: pica,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: pica,
        balance: BalanceBuilder().substrate().system().account(),
      },
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
        asset: pica,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
  ],
  chain: picassoAlphanet,
});
