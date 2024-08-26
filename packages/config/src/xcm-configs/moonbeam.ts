import { BalanceBuilder, ContractBuilder } from '@moonbeam-network/xcm-builder';
import {
  aca,
  apillon,
  aseed,
  astr,
  bnc,
  bncs,
  cfg,
  dai,
  ded,
  dot,
  fil,
  glmr,
  hdx,
  ibtc,
  intr,
  ldot,
  manta,
  neuro,
  nodl,
  para,
  peaq,
  pen,
  pha,
  pink,
  ring,
  stink,
  sub,
  usdc,
  usdcwh,
  usdt,
  usdtwh,
  vastr,
  vdot,
  vfil,
  vglmr,
  vmanta,
  wbtc,
  weth,
  wifd,
  ztg,
} from '../assets';
import {
  acala,
  astar,
  bifrostPolkadot,
  centrifuge,
  darwinia,
  hydration,
  interlay,
  mantaParachain,
  moonbeam,
  neuroweb,
  nodle,
  parallel,
  peaqChain,
  peaqEvm,
  pendulum,
  phala,
  polkadot,
  polkadotAssetHub,
  subsocial,
  zeitgeist,
} from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonbeamRoutes = new ChainRoutes({
  chain: moonbeam,
  routes: [
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: acala,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.01,
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: astar,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.0002,
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: bifrostPolkadot,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.000001,
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: hydration,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.05,
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: interlay,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.05,
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: mantaParachain,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.1,
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: parallel,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.000000032,
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: phala,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.0002,
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: pendulum,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.2,
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: zeitgeist,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.3,
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: aca,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: acala,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.032,
          asset: aca,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: astr,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: astar,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.032,
          asset: astr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: aseed,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: acala,
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
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: bifrostPolkadot,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.256,
          asset: bnc,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: cfg,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: centrifuge,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: cfg,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: dot,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: polkadot,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.052,
          asset: dot,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: ibtc,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: interlay,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.00000064,
          asset: ibtc,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: intr,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: interlay,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.748,
          asset: intr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: ldot,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: acala,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.001,
          asset: ldot,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: manta,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: mantaParachain,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.000001,
          asset: manta,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: nodl,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        balance: BalanceBuilder().substrate().system().account(),
        chain: nodle,
        fee: {
          amount: 0.02,
          asset: nodl,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: neuro,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: neuroweb,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.004,
          asset: neuro,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: para,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: parallel,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.064,
          asset: para,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: pen,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: pendulum,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 1.01,
          asset: pen,
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
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: phala,
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
      asset: ring,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: darwinia,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 4,
          asset: ring,
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
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.2,
          asset: usdt,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: usdc,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.2,
          asset: usdc,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: pink,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.2,
          asset: usdt,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
    },
    {
      asset: ded,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.2,
          asset: usdt,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
    },
    {
      asset: stink,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.2,
          asset: usdt,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
    },
    {
      asset: apillon,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.2,
          asset: usdt,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
    },
    {
      asset: hdx,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: hydration,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.6,
          asset: hdx,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: dai,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: hydration,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.004,
          asset: dai,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: usdcwh,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: hydration,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.004,
          asset: usdcwh,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: usdcwh,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: zeitgeist,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.101,
          asset: usdcwh,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: usdtwh,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: hydration,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.004,
          asset: usdtwh,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: vastr,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: bifrostPolkadot,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.00001,
          asset: vastr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: vdot,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        balance: BalanceBuilder().substrate().tokens().accounts(),
        chain: bifrostPolkadot,
        fee: {
          amount: 0.0000001,
          asset: vdot,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: vfil,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: bifrostPolkadot,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.00000001,
          asset: vfil,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: vglmr,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: bifrostPolkadot,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.00000001,
          asset: vglmr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: vmanta,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: bifrostPolkadot,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.00000001,
          asset: vmanta,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: wbtc,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: hydration,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0000001,
          asset: wbtc,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: weth,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: hydration,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.000002,
          asset: weth,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: fil,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: bifrostPolkadot,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.00000001,
          asset: fil,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: ztg,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: zeitgeist,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: ztg,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: sub,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: subsocial,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.1,
          asset: sub,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: bncs,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: bifrostPolkadot,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0001,
          asset: bncs,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: peaqChain,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.00000001,
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: usdcwh,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: peaqChain,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.00001,
          asset: usdcwh,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: usdtwh,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: peaqChain,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.00001,
          asset: usdtwh,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: dai,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: peaqChain,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.00001,
          asset: dai,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: weth,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: peaqChain,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.000001,
          asset: weth,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: wbtc,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: peaqChain,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.000001,
          asset: wbtc,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: peaq,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: peaqChain,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.1,
          asset: peaq,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: peaqEvm,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.00000001,
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transferWithEvmTo32(),
    },
    {
      asset: usdcwh,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: peaqEvm,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.00001,
          asset: usdcwh,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transferWithEvmTo32(),
    },
    {
      asset: usdtwh,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: peaqEvm,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.00001,
          asset: usdtwh,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transferWithEvmTo32(),
    },
    {
      asset: dai,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: peaqEvm,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.00001,
          asset: dai,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transferWithEvmTo32(),
    },
    {
      asset: weth,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: peaqEvm,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.000001,
          asset: weth,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transferWithEvmTo32(),
    },
    {
      asset: wbtc,
      source: {
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: peaqEvm,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.000001,
          asset: wbtc,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      contract: ContractBuilder().Xtokens().transferWithEvmTo32(),
    },
    {
      asset: wifd,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.2,
          asset: usdt,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
    },
  ],
});
