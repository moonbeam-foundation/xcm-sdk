import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { lama } from '../assets';
import { moonlama, moonsama } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonlamaRoutes = new ChainRoutes({
  chain: moonlama,
  routes: [
    {
      source: {
        asset: lama,
        balance: BalanceBuilder().evm().native(),
        fee: {
          asset: lama,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: lama,
        chain: moonsama,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: lama,
          amount: FeeBuilder().xcmPaymentApi().fromAssetIdQuery({
            isAssetReserveChain: false,
            isEcosystemBridge: true,
          }),
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem()
        .X1(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    // {
    //   source: {
    //     asset: devStage,
    //     balance: BalanceBuilder().evm().erc20(),
    //     fee: {
    //       asset: devBeta,
    //       balance: BalanceBuilder().evm().native(),
    //     },
    //   },
    //   destination: {
    //     asset: devStage,
    //     chain: moonbaseStage,
    //     balance: BalanceBuilder().substrate().system().account(),
    //     fee: {
    //       asset: devStage,
    //       amount: FeeBuilder().xcmPaymentApi().fromPalletInstance({
    //         isAssetReserveChain: true,
    //         isEcosystemBridge: true,
    //       }),
    //       balance: BalanceBuilder().substrate().system().account(),
    //     },
    //   },
    //   extrinsic: ExtrinsicBuilder()
    //     .polkadotXcm()
    //     .transferAssetsToEcosystem()
    //     .X3(),
    //   monitoring: MonitoringBuilder()
    //     .monitorEvent()
    //     .polkadotXcm()
    //     .messageQueue(),
    // },
  ],
});
