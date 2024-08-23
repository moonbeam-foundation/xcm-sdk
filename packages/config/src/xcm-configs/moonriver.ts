import { BalanceBuilder, ContractBuilder } from '@moonbeam-network/xcm-builder';
import {
  aseed,
  bnc,
  crab,
  csm,
  kar,
  kbtc,
  kint,
  kma,
  ksm,
  lit,
  mgx,
  movr,
  pha,
  pica,
  rmrk,
  sdn,
  teer,
  tnkr,
  tur,
  usdt,
  vbnc,
  vksm,
  vmovr,
  xrt,
} from '../assets';
import {
  bifrostKusama,
  calamari,
  crustShadow,
  darwiniaCrab,
  integritee,
  karura,
  khala,
  kintsugi,
  kusama,
  kusamaAssetHub,
  litmus,
  mangataKusama,
  moonriver,
  picasso,
  robonomics,
  shiden,
  tinkernet,
  turing,
} from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonriverRoutes = new ChainRoutes({
  chain: moonriver,
  routes: [
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: bifrostKusama,
        fee: {
          amount: 0.0008544,
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: calamari,
        fee: {
          amount: 0.001,
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: crustShadow,
        fee: {
          amount: 0.0002,
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: karura,
        fee: {
          amount: 0.001,
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: khala,
        fee: {
          amount: 0.0002,
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: mangataKusama,
        fee: {
          amount: 0.002,
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: shiden,
        fee: {
          amount: 0.0002,
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: turing,
        fee: {
          amount: 0.004,
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: picasso,
        fee: {
          amount: 0.001,
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
    {
      asset: aseed,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: karura,
        fee: {
          amount: 0.256,
          asset: aseed,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: bnc,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: bifrostKusama,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.0256,
          asset: bnc,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: crab,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: darwiniaCrab,
        fee: {
          amount: 4,
          asset: crab,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: csm,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: crustShadow,
        fee: {
          amount: 0.004,
          asset: csm,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: kar,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: karura,
        fee: {
          amount: 0.032,
          asset: kar,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: kbtc,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: kintsugi,
        fee: {
          amount: 0.0000011,
          asset: kbtc,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: kint,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: kintsugi,
        fee: {
          amount: 0.00084,
          asset: kint,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: kma,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: calamari,
        fee: {
          amount: 0.000004,
          asset: kma,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: ksm,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: kusama,
        fee: {
          amount: 0.00168,
          asset: ksm,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: lit,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: litmus,
        fee: {
          amount: 0.0032,
          asset: lit,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: mgx,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: mangataKusama,
        fee: {
          amount: 5.5,
          asset: mgx,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: pha,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: khala,
        fee: {
          amount: 0.32,
          asset: pha,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: pica,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: picasso,
        fee: {
          amount: 0.001,
          asset: pica,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: rmrk,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: kusamaAssetHub,
        fee: {
          amount: 0.0000504,
          asset: rmrk,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: sdn,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: shiden,
        fee: {
          amount: 0.032,
          asset: sdn,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: teer,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: integritee,
        fee: {
          amount: 0.004,
          asset: teer,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: tnkr,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: tinkernet,
        fee: {
          amount: 0.4,
          asset: tnkr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: tur,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: turing,
        fee: {
          amount: 0.2,
          asset: tur,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: usdt,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: kusamaAssetHub,
        fee: {
          amount: 0.00504,
          asset: usdt,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: xrt,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: robonomics,
        fee: {
          amount: 0.000032,
          asset: xrt,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
    },
    {
      asset: vbnc,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: bifrostKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0001,
          asset: vbnc,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
    },
    {
      asset: vksm,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: bifrostKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0001,
          asset: vksm,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
    },
    {
      asset: vmovr,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ContractBuilder().Xtokens().transfer(),
      destination: {
        chain: bifrostKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.00000001,
          asset: vmovr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
    },
  ],
});
