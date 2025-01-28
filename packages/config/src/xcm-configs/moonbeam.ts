import {
  AssetMinBuilder,
  BalanceBuilder,
  ContractBuilder,
} from '@moonbeam-network/xcm-builder';
import {
  aca,
  apillon,
  aseed,
  astr,
  axlusdc,
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
  wbtce,
  weth,
  wethe,
  wifd,
  wstethe,
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
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: glmr,
        chain: acala,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.01,
          asset: glmr,
        },
        min: AssetMinBuilder().assetRegistry().assetMetadatas(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: glmr,
        chain: astar,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.0002,
          asset: glmr,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: glmr,
        chain: bifrostPolkadot,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.000001,
          asset: glmr,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: glmr,
        chain: hydration,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.05,
          asset: glmr,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: glmr,
        chain: interlay,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.05,
          asset: glmr,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: glmr,
        chain: mantaParachain,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.1,
          asset: glmr,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: glmr,
        chain: pendulum,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.2,
          asset: glmr,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: glmr,
        chain: zeitgeist,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.3,
          asset: glmr,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: aca,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: aca,
        chain: acala,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.032,
          asset: aca,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: astr,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: astr,
        chain: astar,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.1,
          asset: astr,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: aseed,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: aseed,
        chain: acala,
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
        asset: bnc,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: bnc,
        chain: bifrostPolkadot,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.256,
          asset: bnc,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: cfg,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: cfg,
        chain: centrifuge,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: cfg,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: dot,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: dot,
        chain: polkadot,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: dot,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: dot,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: dot,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: dot,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: ibtc,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: ibtc,
        chain: interlay,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.00000064,
          asset: ibtc,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: intr,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: intr,
        chain: interlay,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.748,
          asset: intr,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: ldot,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: ldot,
        chain: acala,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.001,
          asset: ldot,
        },
        min: AssetMinBuilder().assetRegistry().assetMetadatas(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: manta,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: manta,
        chain: mantaParachain,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.000001,
          asset: manta,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: neuro,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: neuro,
        chain: neuroweb,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.004,
          asset: neuro,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: pen,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: pen,
        chain: pendulum,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 1.01,
          asset: pen,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: pha,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: pha,
        chain: phala,
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
        asset: ring,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: ring,
        chain: darwinia,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.1,
          asset: ring,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: usdt,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: usdt,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.02,
          asset: usdt,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: usdc,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: usdc,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.02,
          asset: usdc,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: pink,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: pink,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.01,
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(false),
    },
    {
      source: {
        asset: ded,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: ded,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.01,
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(false),
    },
    {
      source: {
        asset: stink,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: stink,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.01,
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(false),
    },
    {
      source: {
        asset: apillon,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: apillon,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.01,
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(false),
    },
    {
      source: {
        asset: hdx,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: hdx,
        chain: hydration,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.6,
          asset: hdx,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: dai,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: dai,
        chain: hydration,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.004,
          asset: dai,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: usdcwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdcwh,
        chain: hydration,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.004,
          asset: usdcwh,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: usdcwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdcwh,
        chain: zeitgeist,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.101,
          asset: usdcwh,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: usdtwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdtwh,
        chain: hydration,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.004,
          asset: usdtwh,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: vastr,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: vastr,
        chain: bifrostPolkadot,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.7,
          asset: vastr,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: vdot,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: vdot,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        chain: bifrostPolkadot,
        fee: {
          amount: 0.05,
          asset: vdot,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: vfil,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: vfil,
        chain: bifrostPolkadot,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.1,
          asset: vfil,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: vglmr,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: vglmr,
        chain: bifrostPolkadot,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.2,
          asset: vglmr,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: vmanta,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: vmanta,
        chain: bifrostPolkadot,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.05,
          asset: vmanta,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: wbtc,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: wbtc,
        chain: hydration,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0000001,
          asset: wbtc,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: weth,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: weth,
        chain: hydration,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.000002,
          asset: weth,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: fil,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: fil,
        chain: bifrostPolkadot,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.01,
          asset: fil,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: ztg,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: ztg,
        chain: zeitgeist,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: ztg,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: sub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: sub,
        chain: subsocial,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 1,
          asset: sub,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: bncs,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: bncs,
        chain: bifrostPolkadot,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0001,
          asset: bncs,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: glmr,
        chain: peaqChain,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.00000001,
          asset: glmr,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: usdcwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdcwh,
        chain: peaqChain,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.00001,
          asset: usdcwh,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: usdtwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdtwh,
        chain: peaqChain,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.00001,
          asset: usdtwh,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: dai,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: dai,
        chain: peaqChain,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.00001,
          asset: dai,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: weth,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: weth,
        chain: peaqChain,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.000001,
          asset: weth,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: wbtc,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: wbtc,
        chain: peaqChain,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.000001,
          asset: wbtc,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: peaq,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: peaq,
        chain: peaqChain,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.1,
          asset: peaq,
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: glmr,
        chain: peaqEvm,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.00000001,
          asset: glmr,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transferWithEvmTo32(),
    },
    {
      source: {
        asset: usdcwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdcwh,
        chain: peaqEvm,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.00001,
          asset: usdcwh,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transferWithEvmTo32(),
    },
    {
      source: {
        asset: usdtwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdtwh,
        chain: peaqEvm,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.00001,
          asset: usdtwh,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transferWithEvmTo32(),
    },
    {
      source: {
        asset: dai,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: dai,
        chain: peaqEvm,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.00001,
          asset: dai,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transferWithEvmTo32(),
    },
    {
      source: {
        asset: weth,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: weth,
        chain: peaqEvm,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.000001,
          asset: weth,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transferWithEvmTo32(),
    },
    {
      source: {
        asset: wbtc,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: wbtc,
        chain: peaqEvm,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.000001,
          asset: wbtc,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transferWithEvmTo32(),
    },
    {
      source: {
        asset: wifd,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: wifd,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.01,
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(false),
    },
    {
      source: {
        asset: axlusdc,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: axlusdc,
        chain: pendulum,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.02,
          asset: axlusdc,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: wbtce,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: wbtce,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().foreignAssets().account(),
        fee: {
          amount: 0.0000004,
          asset: wbtce,
          balance: BalanceBuilder().substrate().foreignAssets().account(),
        },
        min: AssetMinBuilder().foreignAssets().asset(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: wethe,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: wethe,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().foreignAssets().account(),
        fee: {
          amount: 0.00001,
          asset: wethe,
          balance: BalanceBuilder().substrate().foreignAssets().account(),
        },
        min: AssetMinBuilder().foreignAssets().asset(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
    {
      source: {
        asset: wstethe,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: wstethe,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().foreignAssets().account(),
        fee: {
          amount: 0.000006,
          asset: wstethe,
          balance: BalanceBuilder().substrate().foreignAssets().account(),
        },
        min: AssetMinBuilder().foreignAssets().asset(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
  ],
});
