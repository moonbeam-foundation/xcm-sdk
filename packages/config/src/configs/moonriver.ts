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
  movr,
  pha,
  rmrk,
  sdn,
  teer,
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
  kinitsugi,
  kusama,
  litmus,
  moonriver,
  parallel,
  robonomics,
  shiden,
  statemine,
} from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const moonriverConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: bifrostKusama,
      destinationFee: {
        amount: 0,
        asset: movr,
      },
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: calamari,
      destinationFee: {
        amount: 0,
        asset: movr,
      },
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: crustShadow,
      destinationFee: {
        amount: 0,
        asset: movr,
      },
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: karura,
      destinationFee: {
        amount: 0,
        asset: movr,
      },
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: khala,
      destinationFee: {
        amount: 0,
        asset: movr,
      },
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: parallel,
      destinationFee: {
        amount: 0,
        asset: movr,
      },
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: shiden,
      destinationFee: {
        amount: 0,
        asset: movr,
      },
    }),
    new AssetConfig({
      asset: ausd,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: karura,
      destinationFee: {
        amount: 0,
        asset: ausd,
      },
    }),
    new AssetConfig({
      asset: bnc,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: bifrostKusama,
      destinationFee: {
        amount: 0,
        asset: bnc,
      },
    }),
    new AssetConfig({
      asset: crab,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: darwiniaCrab,
      destinationFee: {
        amount: 0,
        asset: crab,
      },
    }),
    new AssetConfig({
      asset: csm,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: crustShadow,
      destinationFee: {
        amount: 0,
        asset: csm,
      },
    }),
    new AssetConfig({
      asset: hko,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: parallel,
      destinationFee: {
        amount: 0,
        asset: hko,
      },
    }),
    new AssetConfig({
      asset: kar,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: karura,
      destinationFee: {
        amount: 0,
        asset: kar,
      },
    }),
    new AssetConfig({
      asset: kbtc,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: kinitsugi,
      destinationFee: {
        amount: 0,
        asset: kbtc,
      },
    }),
    new AssetConfig({
      asset: kint,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: kinitsugi,
      destinationFee: {
        amount: 0,
        asset: kint,
      },
    }),
    new AssetConfig({
      asset: kma,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: calamari,
      destinationFee: {
        amount: 0,
        asset: kma,
      },
    }),
    new AssetConfig({
      asset: ksm,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: kusama,
      destinationFee: {
        amount: 0,
        asset: ksm,
      },
    }),
    new AssetConfig({
      asset: lit,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: litmus,
      destinationFee: {
        amount: 0,
        asset: lit,
      },
    }),
    new AssetConfig({
      asset: pha,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: khala,
      destinationFee: {
        amount: 0,
        asset: pha,
      },
    }),
    new AssetConfig({
      asset: rmrk,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: statemine,
      destinationFee: {
        amount: 0,
        asset: rmrk,
      },
    }),
    new AssetConfig({
      asset: rmrk,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: statemine,
      destinationFee: {
        amount: 0,
        asset: rmrk,
      },
    }),
    new AssetConfig({
      asset: sdn,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: shiden,
      destinationFee: {
        amount: 0,
        asset: sdn,
      },
    }),
    new AssetConfig({
      asset: teer,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: integritee,
      destinationFee: {
        amount: 0,
        asset: teer,
      },
    }),
    new AssetConfig({
      asset: usdt,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: statemine,
      destinationFee: {
        amount: 0,
        asset: usdt,
      },
    }),
    new AssetConfig({
      asset: xrt,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: robonomics,
      destinationFee: {
        amount: 0,
        asset: xrt,
      },
    }),
  ],
  chain: moonriver,
});
