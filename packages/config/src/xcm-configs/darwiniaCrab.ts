import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { crab } from '../assets';
import { darwiniaCrab, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const darwiniaCrabRoutes = new ChainRoutes({
  chain: darwiniaCrab,
  routes: [
    {
      source: {
        asset: crab,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: crab,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: crab,
        chain: moonriver,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: crab,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X1(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
  ],
});
