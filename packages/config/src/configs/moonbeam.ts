import { BalanceBuilder, ContractBuilder } from '@moonbeam-network/xcm-builder';
import {
  aca,
  aseed,
  astr,
  bnc,
  cfg,
  dai,
  dot,
  eq,
  eqd,
  glmr,
  hdx,
  ibtc,
  intr,
  nodl,
  para,
  pha,
  ring,
  usdc,
  usdt,
  vDOT,
  vfil,
  vglmr,
  wbtc,
  weth,
} from '../assets';
import {
  acala,
  astar,
  bifrostPolkadot,
  centrifuge,
  darwinia,
  equilibrium,
  hydraDX,
  interlay,
  moonbeam,
  nodle,
  parallel,
  phala,
  polkadot,
  polkadotAssetHub,
} from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const moonbeamConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: acala,
      destinationFee: {
        amount: 0.01,
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: astar,
      destinationFee: {
        amount: 0.0002,
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: bifrostPolkadot,
      destinationFee: {
        amount: 0.000001,
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: equilibrium,
      destinationFee: {
        amount: 0.5,
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: hydraDX,
      destinationFee: {
        amount: 0.05,
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: parallel,
      destinationFee: {
        amount: 0.000000032,
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: phala,
      destinationFee: {
        amount: 0.0002,
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: aca,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: acala,
      destinationFee: {
        amount: 0.032,
        asset: aca,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: astr,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: astar,
      destinationFee: {
        amount: 0.032,
        asset: astr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: aseed,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: acala,
      destinationFee: {
        amount: 0.256,
        asset: aseed,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: bnc,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: bifrostPolkadot,
      destinationFee: {
        amount: 0.256,
        asset: bnc,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: cfg,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: centrifuge,
      destinationFee: {
        amount: 0.01,
        asset: cfg,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: dot,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: polkadot,
      destinationFee: {
        amount: 0.052,
        asset: dot,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: eq,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: equilibrium,
      destinationFee: {
        amount: 400,
        asset: eq,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: eqd,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: equilibrium,
      destinationFee: {
        amount: 0.15,
        asset: eqd,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: ibtc,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: interlay,
      destinationFee: {
        amount: 0.0002476,
        asset: ibtc,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: intr,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: interlay,
      destinationFee: {
        amount: 0.748,
        asset: intr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: nodl,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: nodle,
      destinationFee: {
        amount: 0.02,
        asset: nodl,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: para,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: parallel,
      destinationFee: {
        amount: 0.064,
        asset: para,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: pha,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: phala,
      destinationFee: {
        amount: 0.32,
        asset: pha,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: ring,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: darwinia,
      destinationFee: {
        amount: 4,
        asset: ring,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: usdt,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: polkadotAssetHub,
      destinationFee: {
        amount: 0.7,
        asset: usdt,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: hdx,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: hydraDX,
      destinationFee: {
        amount: 0.6,
        asset: hdx,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: dai,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: hydraDX,
      destinationFee: {
        amount: 0.004,
        asset: dai,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: usdc,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: hydraDX,
      destinationFee: {
        amount: 0.004,
        asset: usdc,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: vDOT,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: bifrostPolkadot,
      destinationFee: {
        amount: 0.0000001,
        asset: vDOT,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: vfil,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: bifrostPolkadot,
      destinationFee: {
        amount: 0.00000001,
        asset: vfil,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: vglmr,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: bifrostPolkadot,
      destinationFee: {
        amount: 0.00000001,
        asset: vglmr,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: wbtc,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: hydraDX,
      destinationFee: {
        amount: 0.0000001,
        asset: wbtc,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: weth,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: hydraDX,
      destinationFee: {
        amount: 0.000002,
        asset: weth,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
  ],
  chain: moonbeam,
});
