import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { kbtc, kint } from '../assets';
import { kintsugi, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const kintsugiRoutes = new ChainRoutes({
  chain: kintsugi,
  routes: [
    {
      source: {
        asset: kint,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        destinationFee: {
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      destination: {
        asset: kint,
        chain: moonriver,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: kint,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      source: {
        asset: kbtc,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: kint,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      destination: {
        asset: kbtc,
        chain: moonriver,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().xcmPaymentFee({
            isAssetReserveChain: false,
            shouldTransferAssetPrecedeFeeAsset: true,
          }),
          asset: kint,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
  ],
});
