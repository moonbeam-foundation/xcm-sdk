import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { movr, sdn } from '../assets';
import { moonriver, shiden } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const shidenRoutes = new ChainRoutes({
  chain: shiden,
  routes: [
    {
      source: {
        asset: sdn,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: sdn,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: sdn,
        chain: moonriver,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: sdn,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .xTokens()
        .transferMultiAsset(shiden.parachainId)
        .here(),
    },
    {
      source: {
        asset: movr,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: sdn,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: movr,
        chain: moonriver,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromPalletInstance({ isAssetReserveChain: true }),
          asset: movr,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
