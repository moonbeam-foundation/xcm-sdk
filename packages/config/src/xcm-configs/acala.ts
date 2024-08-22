import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { aca, aseed, glmr, ldot } from '../assets';
import { acala, moonbeam } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const acalaRoutes = new ChainRoutes({
  chain: acala,
  routes: [
    {
      asset: aca,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: aca,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: aseed,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: aca,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: aseed,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
      min: AssetMinBuilder().assetRegistry().assetMetadatas(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: aca,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.01,
          asset: glmr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
      min: AssetMinBuilder().assetRegistry().assetMetadatas(),
    },
    {
      asset: ldot,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: aca,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.005,
          asset: ldot,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
      min: AssetMinBuilder().assetRegistry().assetMetadatas(),
    },
  ],
});
