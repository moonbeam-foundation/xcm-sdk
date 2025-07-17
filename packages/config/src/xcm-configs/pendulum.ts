import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { axlusdc, eurc, glmr, pen } from '../assets';
import { moonbeam, pendulum } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

const monitoringToMoonbeam = MonitoringBuilder()
  .monitorEvent()
  .xTokens()
  .messageQueue();

export const pendulumRoutes = new ChainRoutes({
  chain: pendulum,
  routes: [
    {
      source: {
        asset: pen,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: pen,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: pen,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: pen,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      monitoring: monitoringToMoonbeam,
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
            .fromPalletInstance({ isAssetReserveChain: true }),
          asset: glmr,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      monitoring: monitoringToMoonbeam,
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
            .fromPalletInstanceAndAccountKey20({ isAssetReserveChain: true }),
          asset: glmr,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      monitoring: monitoringToMoonbeam,
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
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: eurc,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      monitoring: monitoringToMoonbeam,
    },
  ],
});
