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
      destination: {
        chain: bifrostKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0008544,
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: calamari,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.001,
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: crustShadow,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.0002,
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: karura,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.001,
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: khala,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.0002,
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: mangataKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.002,
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: shiden,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.0002,
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: turing,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.004,
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: picasso,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.001,
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: karura,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.256,
          asset: aseed,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: bifrostKusama,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.0256,
          asset: bnc,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: darwiniaCrab,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 4,
          asset: crab,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: crustShadow,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.004,
          asset: csm,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: karura,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.032,
          asset: kar,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: kintsugi,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0000011,
          asset: kbtc,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: kintsugi,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.00084,
          asset: kint,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: calamari,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.000004,
          asset: kma,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: kusama,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.00168,
          asset: ksm,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: litmus,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.0032,
          asset: lit,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: mangataKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 5.5,
          asset: mgx,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: khala,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.32,
          asset: pha,
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
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: picasso,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.001,
          asset: pica,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: kusamaAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.0000504,
          asset: rmrk,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: shiden,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.032,
          asset: sdn,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: integritee,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.004,
          asset: teer,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: tinkernet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.4,
          asset: tnkr,
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
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: turing,
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
      asset: usdt,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: kusamaAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.00504,
          asset: usdt,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: robonomics,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.000032,
          asset: xrt,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: bifrostKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0001,
          asset: vbnc,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: bifrostKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0001,
          asset: vksm,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
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
      destination: {
        chain: bifrostKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.00000001,
          asset: vmovr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
  ],
});
