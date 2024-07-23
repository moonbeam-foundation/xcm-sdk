import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { apillon, ded, dot, pink, stink, usdc, usdt } from '../assets';
import { moonbeam, polkadotAssetHub } from '../chains';
import { AssetRoute } from '../types/AssetRoute';
import { ChainRoutes } from '../types/ChainRoutes';

const extra = 0.036;

export const polkadotAssetHubRoutes = new ChainRoutes({
  chain: polkadotAssetHub,
  routes: [
    new AssetRoute({
      asset: usdt,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: usdt,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        extra,
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetRoute({
      asset: usdc,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.03,
        asset: usdc,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        extra,
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetRoute({
      asset: pink,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.03,
        asset: usdt,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        extra,
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetRoute({
      asset: ded,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.03,
        asset: usdt,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        extra,
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetRoute({
      asset: stink,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.03,
        asset: usdt,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        extra,
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    new AssetRoute({
      asset: apillon,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.03,
        asset: usdt,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        extra,
      },
      min: AssetMinBuilder().assets().asset(),
    }),
  ],
});
