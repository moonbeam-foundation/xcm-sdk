import {
  AssetMinBuilder,
  BalanceBuilder,
  ContractBuilder,
} from '@moonbeam-network/xcm-builder';
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
      source: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: dev,
        chain: turingAlphanet,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.00001,
          asset: dev,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: dev,
        chain: moonbaseBeta,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.0002,
          asset: dev,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: dev,
        chain: pendulumAlphanet,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0000001,
          asset: dev,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: dev,
        chain: picassoAlphanet,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.00000001,
          asset: dev,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: alan,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: alan,
        chain: moonbaseBeta,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.0002,
          asset: dev,
        },
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
    },
    {
      source: {
        asset: ampe,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: ampe,
        chain: pendulumAlphanet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.001,
          asset: ampe,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: otp,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: otp,
        chain: originTrailAlphanet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.004,
          asset: otp,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: atom,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: atom,
        chain: picassoAlphanet,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0001,
          asset: atom,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: pica,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: pica,
        chain: picassoAlphanet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: pica,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: tt1,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: tt1,
        chain: alphanetAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 5,
          asset: tt1,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: tur,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: tur,
        chain: turingAlphanet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.2,
          asset: tur,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: unit,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: unit,
        chain: alphanetRelay,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.0506,
          asset: unit,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: usdcwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdcwh,
        chain: hydrationAlphanet,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.1,
          asset: usdcwh,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: ftmwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: ftmwh,
        chain: hydrationAlphanet,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.01,
          asset: ftmwh,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: ftmwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: ftmwh,
        chain: peaqAlphanet,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.01,
          asset: ftmwh,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: dev,
        chain: hydrationAlphanet,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0002,
          asset: dev,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: hdx,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: hdx,
        chain: hydrationAlphanet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.5,
          asset: hdx,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: dev,
        chain: peaqAlphanet,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.00000001,
          asset: dev,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: ftmwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: ftmwh,
        chain: peaqAlphanet,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.01,
          asset: ftmwh,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: agng,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: agng,
        chain: peaqAlphanet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: agng,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: dev,
        chain: peaqEvmAlphanet,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.00000001,
          asset: dev,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transferWithEvmTo32(),
    },
    {
      source: {
        asset: ftmwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: ftmwh,
        chain: peaqEvmAlphanet,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.01,
          asset: ftmwh,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transferWithEvmTo32(),
    },
  ],
});
