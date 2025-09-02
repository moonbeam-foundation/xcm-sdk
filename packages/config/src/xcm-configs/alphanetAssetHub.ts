import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { tt1, unit } from '../assets';
import { alphanetAssetHub, moonbaseAlpha } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

const extra = 0.036;

export const alphanetAssetHubRoutes = new ChainRoutes({
  chain: alphanetAssetHub,
  routes: [
    {
      source: {
        asset: unit,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: unit,
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: unit,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromHere({ isAssetReserveChain: false }),
          asset: unit,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsUsingTypeAndThen()
        .here(1),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: tt1,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: unit,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: tt1,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: unit,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsUsingTypeAndThen()
        .X2(1),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
  ],
});
