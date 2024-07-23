import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { aseed, kar, movr } from '../assets';
import { karura, moonriver } from '../chains';
import { AssetRoute } from '../types/AssetRoute';
import { ChainRoutes } from '../types/ChainRoutes';

export const karuraRoutes = new ChainRoutes({
  chain: karura,
  routes: [
    new AssetRoute({
      asset: kar,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: kar,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetRoute({
      asset: aseed,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: aseed,
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: kar,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assetRegistry().assetMetadatas(),
    }),
    new AssetRoute({
      asset: movr,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonriver,
      destinationFee: {
        amount: 0.0001,
        asset: movr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: kar,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assetRegistry().assetMetadatas(),
    }),
  ],
});
