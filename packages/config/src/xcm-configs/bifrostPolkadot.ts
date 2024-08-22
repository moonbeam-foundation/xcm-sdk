import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { bnc, bncs, glmr, vastr, vdot, vfil, vglmr, vmanta } from '../assets';
import { bifrostPolkadot, moonbeam } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const bifrostPolkadotRoutes = new ChainRoutes({
  chain: bifrostPolkadot,
  routes: [
    {
      asset: bnc,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: fil,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
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
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    },
    {
      asset: vastr,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.2,
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    },
    {
      asset: vdot,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.01,
          asset: vdot,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    },
    {
      asset: vfil,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.2,
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    },
    {
      asset: vglmr,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.2,
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    },
    {
      asset: vmanta,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.2,
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    },
    {
      asset: bncs,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonbeam,
        fee: {
          amount: 0.05,
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    },
  ],
});
