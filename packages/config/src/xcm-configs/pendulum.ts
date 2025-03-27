import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { axlusdc, eurc, glmr, pen } from '../assets';
import { moonbeam, pendulum } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const pendulumRoutes = new ChainRoutes({
  chain: pendulum,
  routes: [
    {
      source: {
        asset: pen,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: pen,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: pen,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: pen,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      destination: {
        asset: glmr,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: true }),
          asset: glmr,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      source: {
        asset: axlusdc,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: pen,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      destination: {
        asset: axlusdc,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: true }),
          asset: glmr,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
    {
      source: {
        asset: eurc,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: eurc,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        min: AssetMinBuilder().assetRegistry().metadata(),
      },
      destination: {
        asset: eurc,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          // TODO add after merging XCM Payment API rework
          amount: 0.005,
          asset: eurc,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
