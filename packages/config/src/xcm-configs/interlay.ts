import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { glmr, ibtc, intr } from '../assets';
import { interlay, moonbeam } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const interlayRoutes = new ChainRoutes({
  chain: interlay,
  routes: [
    {
      source: {
        asset: intr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: intr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      destination: {
        asset: intr,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: intr,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      monitoring: MonitoringBuilder().monitorEvent().xTokens().ethereumXcm(),
    },
    {
      source: {
        asset: ibtc,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: intr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      destination: {
        asset: ibtc,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().fromAssetIdQuery({
            isAssetReserveChain: false,
            shouldTransferAssetPrecedeFeeAsset: true,
          }),
          asset: intr,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      monitoring: MonitoringBuilder().monitorEvent().xTokens().messageQueue(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: intr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
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
      monitoring: MonitoringBuilder().monitorEvent().xTokens().messageQueue(),
    },
  ],
});
