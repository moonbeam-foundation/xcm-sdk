import { BalanceBuilder, ContractBuilder } from '@moonbeam-network/xcm-builder';
import {
  ausd,
  bnc,
  crab,
  csm,
  hko,
  kar,
  kbtc,
  kint,
  kma,
  ksm,
  lit,
  mgx,
  movr,
  pha,
  rmrk,
  sdn,
  teer,
  tur,
  usdt,
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
  parallelHeiko,
  robonomics,
  shiden,
  turing,
} from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const moonriverConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: bifrostKusama,
      destinationFee: {
        amount: 0.0008544,
        asset: movr,
      },
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: calamari,
      destinationFee: {
        amount: 0.001,
        asset: movr,
      },
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: crustShadow,
      destinationFee: {
        amount: 0.0002,
        asset: movr,
      },
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: karura,
      destinationFee: {
        amount: 0.001,
        asset: movr,
      },
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: khala,
      destinationFee: {
        amount: 0.0002,
        asset: movr,
      },
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: mangataKusama,
      destinationFee: {
        amount: 0.002,
        asset: movr,
      },
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: parallelHeiko,
      destinationFee: {
        amount: 0.00000000192,
        asset: movr,
      },
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: shiden,
      destinationFee: {
        amount: 0.0002,
        asset: movr,
      },
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: turing,
      destinationFee: {
        amount: 0.004,
        asset: movr,
      },
    }),
    new AssetConfig({
      asset: ausd,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: karura,
      destinationFee: {
        amount: 0.256,
        asset: ausd,
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: bnc,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: bifrostKusama,
      destinationFee: {
        amount: 0.0256,
        asset: bnc,
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: crab,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: darwiniaCrab,
      destinationFee: {
        amount: 4,
        asset: crab,
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: csm,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: crustShadow,
      destinationFee: {
        amount: 0.004,
        asset: csm,
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: hko,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: parallelHeiko,
      destinationFee: {
        amount: 0.0192,
        asset: hko,
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: kar,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: karura,
      destinationFee: {
        amount: 0.032,
        asset: kar,
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: kbtc,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: kintsugi,
      destinationFee: {
        amount: 0.00000428,
        asset: kbtc,
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: kint,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: kintsugi,
      destinationFee: {
        amount: 0.00084,
        asset: kint,
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: kma,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: calamari,
      destinationFee: {
        amount: 0.000004,
        asset: kma,
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: ksm,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: kusama,
      destinationFee: {
        amount: 0.00168,
        asset: ksm,
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: lit,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: litmus,
      destinationFee: {
        amount: 0.0032,
        asset: lit,
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: mgx,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: mangataKusama,
      destinationFee: {
        amount: 5.5,
        asset: mgx,
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: pha,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: khala,
      destinationFee: {
        amount: 0.32,
        asset: pha,
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: rmrk,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: kusamaAssetHub,
      destinationFee: {
        amount: 0.0000504,
        asset: rmrk,
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: sdn,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: shiden,
      destinationFee: {
        amount: 0.032,
        asset: sdn,
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: teer,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: integritee,
      destinationFee: {
        amount: 0.004,
        asset: teer,
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: tur,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: turing,
      destinationFee: {
        amount: 0.2,
        asset: tur,
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: usdt,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: kusamaAssetHub,
      destinationFee: {
        amount: 0.00504,
        asset: usdt,
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: xrt,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: robonomics,
      destinationFee: {
        amount: 0.000032,
        asset: xrt,
      },
      fee: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
  ],
  chain: moonriver,
});
