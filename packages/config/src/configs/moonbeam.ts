import { BalanceBuilder, ContractBuilder } from '@moonbeam-network/xcm-builder';
import {
  aca,
  astr,
  ausd,
  bnc,
  dot,
  eq,
  eqd,
  glmr,
  ibtc,
  intr,
  para,
  pha,
  ring,
  usdt,
} from '../assets';
import {
  acala,
  astar,
  bifrostPolkadot,
  darwinia,
  equilibrium,
  interlay,
  moonbeam,
  parallel,
  phala,
  polkadot,
  statemint,
} from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const moonbeamConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: acala,
      destinationFee: {
        amount: 0,
        asset: glmr,
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: astar,
      destinationFee: {
        amount: 0,
        asset: glmr,
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: bifrostPolkadot,
      destinationFee: {
        amount: 0,
        asset: glmr,
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: equilibrium,
      destinationFee: {
        amount: 0,
        asset: glmr,
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: parallel,
      destinationFee: {
        amount: 0,
        asset: glmr,
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: phala,
      destinationFee: {
        amount: 0,
        asset: glmr,
      },
    }),
    new AssetConfig({
      asset: aca,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: acala,
      destinationFee: {
        amount: 0,
        asset: aca,
      },
    }),
    new AssetConfig({
      asset: astr,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: astar,
      destinationFee: {
        amount: 0,
        asset: astr,
      },
    }),
    new AssetConfig({
      asset: ausd,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: acala,
      destinationFee: {
        amount: 0,
        asset: ausd,
      },
    }),
    new AssetConfig({
      asset: bnc,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: bifrostPolkadot,
      destinationFee: {
        amount: 0,
        asset: bnc,
      },
    }),
    new AssetConfig({
      asset: dot,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: polkadot,
      destinationFee: {
        amount: 0,
        asset: dot,
      },
    }),
    new AssetConfig({
      asset: eq,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: equilibrium,
      destinationFee: {
        amount: 0,
        asset: eq,
      },
    }),
    new AssetConfig({
      asset: eqd,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: equilibrium,
      destinationFee: {
        amount: 0,
        asset: eqd,
      },
    }),
    new AssetConfig({
      asset: ibtc,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: interlay,
      destinationFee: {
        amount: 0,
        asset: ibtc,
      },
    }),
    new AssetConfig({
      asset: intr,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: interlay,
      destinationFee: {
        amount: 0,
        asset: intr,
      },
    }),
    new AssetConfig({
      asset: para,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: parallel,
      destinationFee: {
        amount: 0,
        asset: para,
      },
    }),
    new AssetConfig({
      asset: pha,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: phala,
      destinationFee: {
        amount: 0,
        asset: pha,
      },
    }),
    new AssetConfig({
      asset: ring,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: darwinia,
      destinationFee: {
        amount: 0,
        asset: ring,
      },
    }),
    new AssetConfig({
      asset: usdt,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: statemint,
      destinationFee: {
        amount: 0,
        asset: usdt,
      },
    }),
  ],
  chain: moonbeam,
});
