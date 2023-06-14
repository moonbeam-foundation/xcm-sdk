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
  hdx,
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
  hydraDX,
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
        amount: 0.01,
        asset: glmr,
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: astar,
      destinationFee: {
        amount: 0.0002,
        asset: glmr,
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: bifrostPolkadot,
      destinationFee: {
        amount: 0.000001,
        asset: glmr,
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: equilibrium,
      destinationFee: {
        amount: 0.5,
        asset: glmr,
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: hydraDX,
      destinationFee: {
        amount: 0.05,
        asset: glmr,
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: parallel,
      destinationFee: {
        amount: 0.000000032,
        asset: glmr,
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: phala,
      destinationFee: {
        amount: 0.0002,
        asset: glmr,
      },
    }),
    new AssetConfig({
      asset: aca,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: acala,
      destinationFee: {
        amount: 0.032,
        asset: aca,
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: astr,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: astar,
      destinationFee: {
        amount: 0.032,
        asset: astr,
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: ausd,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: acala,
      destinationFee: {
        amount: 0.256,
        asset: ausd,
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: bnc,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: bifrostPolkadot,
      destinationFee: {
        amount: 0.256,
        asset: bnc,
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: dot,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: polkadot,
      destinationFee: {
        amount: 0.052,
        asset: dot,
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: eq,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: equilibrium,
      destinationFee: {
        amount: 400,
        asset: eq,
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: eqd,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: equilibrium,
      destinationFee: {
        amount: 0.15,
        asset: eqd,
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: ibtc,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: interlay,
      destinationFee: {
        amount: 0.0002476,
        asset: ibtc,
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: intr,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: interlay,
      destinationFee: {
        amount: 0.748,
        asset: intr,
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: para,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: parallel,
      destinationFee: {
        amount: 0.064,
        asset: para,
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: pha,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: phala,
      destinationFee: {
        amount: 0.32,
        asset: pha,
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: ring,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: darwinia,
      destinationFee: {
        amount: 4,
        asset: ring,
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: usdt,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: statemint,
      destinationFee: {
        amount: 0.7,
        asset: usdt,
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: hdx,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: hydraDX,
      destinationFee: {
        amount: 0.6,
        asset: hdx,
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().system().account(),
      },
    }),
  ],
  chain: moonbeam,
});
