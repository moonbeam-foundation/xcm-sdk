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
      destination: {
        chain: turingAlphanet,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.00001,
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonbaseBeta,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.0002,
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: pendulumAlphanet,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0000001,
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: picassoAlphanet,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.00000001,
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: moonbaseBeta,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.0002,
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
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
      destination: {
        chain: pendulumAlphanet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.001,
          asset: ampe,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: originTrailAlphanet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.004,
          asset: otp,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: picassoAlphanet,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0001,
          asset: atom,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: picassoAlphanet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: pica,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: alphanetAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 5,
          asset: tt1,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: turingAlphanet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.2,
          asset: tur,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: alphanetRelay,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.0506,
          asset: unit,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: hydrationAlphanet,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.1,
          asset: usdcwh,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: hydrationAlphanet,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.01,
          asset: ftmwh,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: peaqAlphanet,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.01,
          asset: ftmwh,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: hydrationAlphanet,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0002,
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: hydrationAlphanet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.5,
          asset: hdx,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: peaqAlphanet,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.00000001,
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: peaqAlphanet,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.01,
          asset: ftmwh,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: peaqAlphanet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: agng,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: dev,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: peaqEvmAlphanet,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.00000001,
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transferWithEvmTo32(),
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
      destination: {
        chain: peaqEvmAlphanet,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.01,
          asset: ftmwh,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transferWithEvmTo32(),
    },
  ],
});
