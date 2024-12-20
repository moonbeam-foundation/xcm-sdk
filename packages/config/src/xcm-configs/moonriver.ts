import {
  AssetMinBuilder,
  BalanceBuilder,
  ContractBuilder,
} from '@moonbeam-network/xcm-builder';
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
      source: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: movr,
        chain: bifrostKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0008544,
          asset: movr,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: movr,
        chain: calamari,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.001,
          asset: movr,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: movr,
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
      source: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: movr,
        chain: karura,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.001,
          asset: movr,
        },
        min: AssetMinBuilder().assetRegistry().assetMetadatas(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: movr,
        chain: khala,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.001,
          asset: movr,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: movr,
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
      source: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: movr,
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
      source: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: movr,
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
      source: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: movr,
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
      source: {
        asset: bnc,
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
        asset: bnc,
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
      source: {
        asset: crab,
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
        asset: crab,
        chain: darwiniaCrab,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.1,
          asset: crab,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: csm,
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
        asset: csm,
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
      source: {
        asset: kar,
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
        asset: kar,
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
      source: {
        asset: aseed,
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
        asset: aseed,
        chain: karura,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.256,
          asset: aseed,
        },
        min: AssetMinBuilder().assetRegistry().assetMetadatas(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: kbtc,
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
        asset: kbtc,
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
      source: {
        asset: kint,
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
        asset: kint,
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
      source: {
        asset: kma,
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
        asset: kma,
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
      source: {
        asset: ksm,
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
        asset: ksm,
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
      source: {
        asset: mgx,
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
        asset: mgx,
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
      source: {
        asset: pha,
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
        asset: pha,
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
      source: {
        asset: pica,
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
        asset: pica,
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
      source: {
        asset: rmrk,
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
        asset: rmrk,
        chain: kusamaAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.0000504,
          asset: rmrk,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: sdn,
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
        asset: sdn,
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
      source: {
        asset: teer,
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
        asset: teer,
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
      source: {
        asset: tnkr,
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
        asset: tnkr,
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
      source: {
        asset: tur,
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
        asset: tur,
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
      source: {
        asset: usdt,
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
        asset: usdt,
        chain: kusamaAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.00504,
          asset: usdt,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: xrt,
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
        asset: xrt,
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
      source: {
        asset: vbnc,
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
        asset: vbnc,
        chain: bifrostKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.1,
          asset: vbnc,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: vksm,
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
        asset: vksm,
        chain: bifrostKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.001,
          asset: vksm,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: vmovr,
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
        asset: vmovr,
        chain: bifrostKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.1,
          asset: vmovr,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
  ],
});
