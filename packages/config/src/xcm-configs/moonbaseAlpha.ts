import { BalanceBuilder, ContractBuilder } from '@moonbeam-network/xcm-builder';
import {
  agng,
  alan,
  ampe,
  atom,
  dev,
  ftmwh,
  hdx,
  otp,
  pica,
  tt1,
  tur,
  unit,
  usdcwh,
} from '../assets';
import {
  alphanetAssetHub,
  alphanetRelay,
  hydrationAlphanet,
  moonbaseAlpha,
  moonbaseBeta,
  originTrailAlphanet,
  peaqAlphanet,
  peaqEvmAlphanet,
  pendulumAlphanet,
  picassoAlphanet,
  turingAlphanet,
} from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonbaseAlphaRoutes = new ChainRoutes({
  chain: moonbaseAlpha,
  routes: [
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: turingAlphanet,
        fee: {
          amount: 0.00001,
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: moonbaseBeta,
        fee: {
          amount: 0.0002,
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: pendulumAlphanet,
        fee: {
          amount: 0.0000001,
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: picassoAlphanet,
        fee: {
          amount: 0.00000001,
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
    {
      asset: alan,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: {
        chain: moonbaseBeta,
        fee: {
          amount: 0.0002,
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
    // NOTE: Disabling because ws endpoint is not working
    // new AssetConfig({
    //   asset: auq,
    //   balance: BalanceBuilder().substrate().assets().account(),
    //   contract: ContractBuilder().Xtokens().transfer(),
    //   destination: {
    //   chain: uniqueAlpha,
    //   fee:{
    //     amount: 0,
    //     asset: auq,
    //   }
    //   },
    //   fee: {
    //     asset: dev,
    //     balance: BalanceBuilder().substrate().system().account(),
    //   },
    // }),
    {
      asset: ampe,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: pendulumAlphanet,
        fee: {
          amount: 0.001,
          asset: ampe,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: otp,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: originTrailAlphanet,
        fee: {
          amount: 0.004,
          asset: otp,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: atom,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: picassoAlphanet,
        fee: {
          amount: 0.0001,
          asset: atom,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: pica,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: picassoAlphanet,
        fee: {
          amount: 0.01,
          asset: pica,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: tt1,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: alphanetAssetHub,
        fee: {
          amount: 5,
          asset: tt1,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: tur,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: turingAlphanet,
        fee: {
          amount: 0.2,
          asset: tur,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: unit,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: alphanetRelay,
        fee: {
          amount: 0.0506,
          asset: unit,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: usdcwh,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: hydrationAlphanet,
        fee: {
          amount: 0.1,
          asset: usdcwh,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
    },
    {
      asset: ftmwh,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: hydrationAlphanet,
        fee: {
          amount: 0.01,
          asset: ftmwh,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
    },
    {
      asset: ftmwh,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: peaqAlphanet,
        fee: {
          amount: 0.01,
          asset: ftmwh,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
    },
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: hydrationAlphanet,
        fee: {
          amount: 0.0002,
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
    {
      asset: hdx,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: hydrationAlphanet,
        fee: {
          amount: 0.5,
          asset: hdx,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: peaqAlphanet,
        fee: {
          amount: 0.00000001,
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
    {
      asset: ftmwh,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: peaqAlphanet,
        fee: {
          amount: 0.01,
          asset: ftmwh,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
    },
    {
      asset: agng,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: peaqAlphanet,
        fee: {
          amount: 0.01,
          asset: agng,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      transfer: ContractBuilder().Xtokens().transferWithEvmTo32(),
      destination: {
        chain: peaqEvmAlphanet,
        fee: {
          amount: 0.00000001,
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
    {
      asset: ftmwh,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transferWithEvmTo32(),
      destination: {
        chain: peaqEvmAlphanet,
        fee: {
          amount: 0.01,
          asset: ftmwh,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
    },
  ],
});
