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
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: bifrostKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0008544,
          asset: movr,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: calamari,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.001,
          asset: movr,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: crustShadow,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.0002,
          asset: movr,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: karura,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.001,
          asset: movr,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: khala,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.0002,
          asset: movr,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: mangataKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.002,
          asset: movr,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: shiden,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.0002,
          asset: movr,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: turing,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.004,
          asset: movr,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: picasso,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.001,
          asset: movr,
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
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        chain: karura,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.256,
          asset: aseed,
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
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        chain: bifrostKusama,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.0256,
          asset: bnc,
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
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        chain: darwiniaCrab,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 4,
          asset: crab,
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
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        chain: crustShadow,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.004,
          asset: csm,
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
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        chain: karura,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.032,
          asset: kar,
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
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        chain: kintsugi,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0000011,
          asset: kbtc,
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
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        chain: kintsugi,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.00084,
          asset: kint,
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
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        chain: calamari,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.000004,
          asset: kma,
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
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        chain: kusama,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.00168,
          asset: ksm,
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
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        chain: mangataKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 5.5,
          asset: mgx,
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
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        chain: khala,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.32,
          asset: pha,
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
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        chain: picasso,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.001,
          asset: pica,
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
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        chain: kusamaAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.0000504,
          asset: rmrk,
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
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        chain: shiden,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.032,
          asset: sdn,
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
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        chain: integritee,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.004,
          asset: teer,
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
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        chain: tinkernet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.4,
          asset: tnkr,
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
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        chain: turing,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.2,
          asset: tur,
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
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        chain: kusamaAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.00504,
          asset: usdt,
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
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        chain: robonomics,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.000032,
          asset: xrt,
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
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        chain: bifrostKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0001,
          asset: vbnc,
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
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        chain: bifrostKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0001,
          asset: vksm,
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
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        chain: bifrostKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.00000001,
          asset: vmovr,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
  ],
});
