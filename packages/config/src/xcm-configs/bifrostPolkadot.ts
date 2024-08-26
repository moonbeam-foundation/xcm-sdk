import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import {
  bnc,
  bncs,
  fil,
  glmr,
  vastr,
  vdot,
  vfil,
  vglmr,
  vmanta,
} from '../assets';
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
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: fil,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      destination: {
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      destination: {
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.01,
          asset: glmr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: vastr,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      destination: {
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.2,
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
    {
      asset: vdot,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      destination: {
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.01,
          asset: vdot,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: vfil,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      destination: {
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.2,
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
    {
      asset: vglmr,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      destination: {
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.2,
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
    {
      asset: vmanta,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      destination: {
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.2,
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
    {
      asset: bncs,
      source: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      destination: {
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.05,
          asset: bnc,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
  ],
});
