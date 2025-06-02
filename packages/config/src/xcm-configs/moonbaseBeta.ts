import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { alan, dev, devBeta } from '../assets';
import { moonbaseAlpha, moonbaseBeta } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonbaseBetaRoutes = new ChainRoutes({
  chain: moonbaseBeta,
  routes: [
    {
      source: {
        asset: dev,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: devBeta,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: dev,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromPalletInstance({ isAssetReserveChain: true }),
          asset: dev,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      source: {
        asset: alan,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: devBeta,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: alan,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.1, // TODO calculate
          asset: dev,
        },
      },
      extrinsic: ExtrinsicBuilder().polkadotXcm().transferAssets().X1(),
    },
  ],
});
