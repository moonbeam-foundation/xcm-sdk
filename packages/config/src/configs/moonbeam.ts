import { BalanceBuilder, ContractBuilder } from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
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

export const moonbeamConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: acala,
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: astar,
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: bifrostPolkadot,
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: equilibrium,
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: parallel,
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: phala,
    }),
    new AssetConfig({
      asset: aca,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: acala,
    }),
    new AssetConfig({
      asset: astr,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: astar,
    }),
    new AssetConfig({
      asset: ausd,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: acala,
    }),
    new AssetConfig({
      asset: bnc,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: bifrostPolkadot,
    }),
    new AssetConfig({
      asset: dot,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: polkadot,
    }),
    new AssetConfig({
      asset: eq,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: equilibrium,
    }),
    new AssetConfig({
      asset: eqd,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: equilibrium,
    }),
    new AssetConfig({
      asset: ibtc,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: interlay,
    }),
    new AssetConfig({
      asset: intr,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: interlay,
    }),
    new AssetConfig({
      asset: para,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: parallel,
    }),
    new AssetConfig({
      asset: pha,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: phala,
    }),
    new AssetConfig({
      asset: ring,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: darwinia,
    }),
    new AssetConfig({
      asset: usdt,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: statemint,
    }),
  ],
  chain: moonbeam,
});
