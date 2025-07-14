import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { astr, glmr } from '../assets';
import { astar, moonbeam } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const astarRoutes = new ChainRoutes({
  chain: astar,
  routes: [
    {
      source: {
        asset: astr,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: astr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: astr,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: astr,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .xTokens()
        .transferMultiAsset(astar.parachainId)
        .here(),
      monitoring: MonitoringBuilder().monitorEvent().xTokens().messageQueue(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: astr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
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
