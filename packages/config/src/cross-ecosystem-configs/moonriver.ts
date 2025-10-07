import {
  BalanceBuilder,
  ContractBuilder,
  FeeBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { glmr, movr, usdc, usdcwh, usdt } from '../assets';
import { moonbeam, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonriverRoutes = new ChainRoutes({
  chain: moonriver,
  routes: [
    {
      source: {
        asset: movr,
        balance: BalanceBuilder().evm().native(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: movr,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: movr,
          amount: FeeBuilder().xcmPaymentApi().fromAssetIdQuery({
            isAssetReserveChain: false,
            isEcosystemBridge: true,
          }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder()
        .XcmPrecompile()
        .transferAssetsLocation()
        .nativeAsset(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: glmr,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: glmr,
          amount: FeeBuilder().xcmPaymentApi().fromPalletInstance({
            isAssetReserveChain: true,
            isEcosystemBridge: true,
          }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder()
        .XcmPrecompile()
        .transferAssetsLocation()
        .foreignAsset(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: usdc,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().evm().erc20(),
        },
        destinationFee: {
          asset: glmr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdc,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromPalletInstanceAndAccountKey20({
              isAssetReserveChain: true,
              isEcosystemBridge: true,
            }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder()
        .XcmPrecompile()
        .transferAssetsLocation()
        .foreignErc20(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: usdcwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().evm().erc20(),
        },
        destinationFee: {
          asset: glmr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdcwh,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromPalletInstanceAndAccountKey20({
              isAssetReserveChain: true,
              isEcosystemBridge: true,
            }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder()
        .XcmPrecompile()
        .transferAssetsLocation()
        .foreignErc20(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: usdt,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().evm().erc20(),
        },
        destinationFee: {
          asset: glmr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdt,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromPalletInstanceAndAccountKey20({
              isAssetReserveChain: true,
              isEcosystemBridge: true,
            }),
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder()
        .XcmPrecompile()
        .transferAssetsLocation()
        .foreignErc20(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
  ],
});
