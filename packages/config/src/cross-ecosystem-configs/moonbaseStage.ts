import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { devBeta, devStage, pizza } from '../assets';
import { moonbaseBeta, moonbaseStage } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonbaseStageRoutes = new ChainRoutes({
  chain: moonbaseStage,
  routes: [
    {
      source: {
        asset: devStage,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: devStage,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: devStage,
        chain: moonbaseBeta,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().fromAssetIdQuery({
            isAssetReserveChain: false,
            isEcosystemBridge: true,
          }),
          asset: devStage,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem()
        .X1(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .bridgeMessages()
        .bridgeMessages(),
    },
    {
      source: {
        asset: devBeta,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: devStage,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: devBeta,
        chain: moonbaseBeta,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: devBeta,
          amount: FeeBuilder().xcmPaymentApi().fromPalletInstance({
            isAssetReserveChain: true,
            isEcosystemBridge: true,
          }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem()
        .X3(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .bridgeMessages()
        .bridgeMessages(),
    },
    {
      source: {
        asset: pizza,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: devStage,
          balance: BalanceBuilder().evm().erc20(),
        },
        destinationFee: {
          asset: devBeta,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: pizza,
        chain: moonbaseBeta,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: devBeta,
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromPalletInstanceAndAccountKey20({
              isAssetReserveChain: true,
              isEcosystemBridge: true,
            }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem()
        .X4(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
  ],
});
