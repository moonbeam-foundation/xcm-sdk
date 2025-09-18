import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { ksm, rmrk, usdtksm } from '../assets';
import { kusamaAssetHub, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

const extra = 0.0015;

const monitoringToMoonriver = MonitoringBuilder()
  .monitorEvent()
  .polkadotXcm()
  .messageQueue();

export const kusamaAssetHubRoutes = new ChainRoutes({
  chain: kusamaAssetHub,
  routes: [
    {
      source: {
        asset: rmrk,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: ksm,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: rmrk,
        chain: moonriver,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: rmrk,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsUsingTypeAndThen()
        .X2(1),
      monitoring: monitoringToMoonriver,
    },
    {
      source: {
        asset: usdtksm,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: ksm,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: usdtksm,
        chain: moonriver,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: usdtksm,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsUsingTypeAndThen()
        .X2(1),
      monitoring: monitoringToMoonriver,
    },
  ],
});
