import {
  AssetMinBuilder,
  BalanceBuilder,
  ContractBuilder,
  FeeBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import {
  aca,
  apillon,
  aseed,
  astr,
  axlusdc,
  bnc,
  cfg,
  dai,
  ded,
  dot,
  eurc,
  fil,
  glmr,
  hdx,
  ibtc,
  intr,
  laos,
  ldot,
  manta,
  neuro,
  peaq,
  pen,
  pha,
  pink,
  ring,
  stink,
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
  laosMainnet,
  mantaParachain,
  moonbeam,
  neuroweb,
  peaqChain,
  peaqEvm,
  pendulum,
  phala,
  polkadot,
  polkadotAssetHub,
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
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: glmr,
        chain: astar,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromSourcePalletInstance({ isAssetReserveChain: false }),
          asset: glmr,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: glmr,
        chain: bifrostPolkadot,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().fromSourcePalletInstance({
            isAssetReserveChain: false,
          }),
          asset: glmr,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: glmr,
        chain: hydration,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromSourcePalletInstance({ isAssetReserveChain: false }),
          asset: glmr,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder().monitorEvent().polkadotXcm().mixedQueue(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder().monitorEvent().polkadotXcm().xcmpQueue(),
    },
    {
      source: {
        asset: aca,
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
        asset: aca,
        chain: acala,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.032,
          asset: aca,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: astr,
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
        asset: astr,
        chain: astar,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromHere({ isAssetReserveChain: true, parents: 0 }),
          asset: astr,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: aseed,
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
        asset: aseed,
        chain: acala,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.256,
          asset: aseed,
        },
        min: AssetMinBuilder().assetRegistry().assetMetadatas(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: bnc,
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
        asset: bnc,
        chain: bifrostPolkadot,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().fromCurrencyIdToLocations({
            isAssetReserveChain: true,
          }),
          asset: bnc,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: cfg,
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
        asset: cfg,
        chain: centrifuge,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: cfg,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: dot,
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
        asset: dot,
        chain: polkadot,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromHere({ isAssetReserveChain: true, parents: 0 }),
          asset: dot,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToRelay(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: dot,
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
        asset: dot,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromHere({ isAssetReserveChain: true }),
          asset: dot,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: ibtc,
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
        asset: ibtc,
        chain: interlay,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.00000064,
          asset: ibtc,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: intr,
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
        asset: intr,
        chain: interlay,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.748,
          asset: intr,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: ldot,
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
        asset: ldot,
        chain: acala,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.001,
          asset: ldot,
        },
        min: AssetMinBuilder().assetRegistry().assetMetadatas(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: manta,
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
        asset: manta,
        chain: mantaParachain,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.000001,
          asset: manta,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder().monitorEvent().polkadotXcm().mixedQueue(),
    },
    {
      source: {
        asset: neuro,
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
        asset: neuro,
        chain: neuroweb,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.004,
          asset: neuro,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: pen,
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
        asset: pen,
        chain: pendulum,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 1.01,
          asset: pen,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: pha,
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
        asset: pha,
        chain: phala,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.32,
          asset: pha,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: ring,
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
        asset: ring,
        chain: darwinia,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().fromPalletInstance({
            isAssetReserveChain: true,
          }),
          asset: ring,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara20(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: usdt,
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
        asset: usdt,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromPalletInstanceAndGeneralIndex({
              isAssetReserveChain: true,
            }),
          asset: usdt,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
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
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdc,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromPalletInstanceAndGeneralIndex({
              isAssetReserveChain: true,
            }),
          asset: usdc,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: pink,
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
        asset: pink,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().fromHereAndGeneralIndex({
            isAssetReserveChain: true,
            shouldTransferAssetPrecedeFeeAsset: true,
          }),
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: ded,
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
        asset: ded,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().fromHereAndGeneralIndex({
            isAssetReserveChain: true,
            shouldTransferAssetPrecedeFeeAsset: true,
          }),
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: stink,
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
        asset: stink,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().fromHereAndGeneralIndex({
            isAssetReserveChain: true,
            shouldTransferAssetPrecedeFeeAsset: true,
          }),
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: apillon,
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
        asset: apillon,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().fromHereAndGeneralIndex({
            isAssetReserveChain: true,
            shouldTransferAssetPrecedeFeeAsset: true,
          }),
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: hdx,
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
        asset: hdx,
        chain: hydration,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromGeneralIndex({ isAssetReserveChain: true }),
          asset: hdx,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
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
          amount: FeeBuilder().xcmPaymentApi().fromSourceAccountKey20({
            isAssetReserveChain: false,
          }),
          asset: dai,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
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
          amount: FeeBuilder().xcmPaymentApi().fromSourceAccountKey20({
            isAssetReserveChain: false,
          }),
          asset: usdcwh,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
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
          amount: FeeBuilder().xcmPaymentApi().fromSourceAccountKey20({
            isAssetReserveChain: false,
          }),
          asset: usdtwh,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
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
          amount: FeeBuilder().xcmPaymentApi().fromCurrencyIdToLocations({
            isAssetReserveChain: true,
          }),
          asset: vastr,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
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
          amount: FeeBuilder().xcmPaymentApi().fromCurrencyIdToLocations({
            isAssetReserveChain: true,
          }),
          asset: vdot,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
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
          amount: FeeBuilder().xcmPaymentApi().fromCurrencyIdToLocations({
            isAssetReserveChain: true,
          }),
          asset: vfil,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
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
          amount: FeeBuilder().xcmPaymentApi().fromCurrencyIdToLocations({
            isAssetReserveChain: true,
          }),
          asset: vglmr,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
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
          amount: FeeBuilder().xcmPaymentApi().fromCurrencyIdToLocations({
            isAssetReserveChain: true,
          }),
          asset: vmanta,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
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
          amount: FeeBuilder().xcmPaymentApi().fromSourceAccountKey20({
            isAssetReserveChain: false,
          }),
          asset: wbtc,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
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
          amount: FeeBuilder().xcmPaymentApi().fromSourceAccountKey20({
            isAssetReserveChain: false,
          }),
          asset: weth,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
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
          amount: FeeBuilder().xcmPaymentApi().fromCurrencyIdToLocations({
            isAssetReserveChain: true,
          }),
          asset: fil,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: ztg,
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
        asset: ztg,
        chain: zeitgeist,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: ztg,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder().monitorEvent().polkadotXcm().xcmpQueue(),
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder().monitorEvent().polkadotXcm().xcmpQueue(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: peaq,
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
        asset: peaq,
        chain: peaqChain,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.1,
          asset: peaq,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara20(),
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara20(),
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara20(),
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara20(),
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara20(),
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara20(),
    },
    {
      source: {
        asset: wifd,
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
        asset: wifd,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().fromHereAndGeneralIndex({
            isAssetReserveChain: true,
            shouldTransferAssetPrecedeFeeAsset: true,
          }),
          asset: dot,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: wbtce,
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
        asset: wbtce,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().foreignAssets().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().fromGlobalConsensus({
            isAssetReserveChain: true,
          }),
          asset: wbtce,
          balance: BalanceBuilder().substrate().foreignAssets().account(),
        },
        min: AssetMinBuilder().foreignAssets().asset(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: wethe,
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
        asset: wethe,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().foreignAssets().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().fromGlobalConsensus({
            isAssetReserveChain: true,
          }),
          asset: wethe,
          balance: BalanceBuilder().substrate().foreignAssets().account(),
        },
        min: AssetMinBuilder().foreignAssets().asset(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: wstethe,
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
        asset: wstethe,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().foreignAssets().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().fromGlobalConsensus({
            isAssetReserveChain: true,
          }),
          asset: wstethe,
          balance: BalanceBuilder().substrate().foreignAssets().account(),
        },
        min: AssetMinBuilder().foreignAssets().asset(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: laos,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: laos,
        chain: laosMainnet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().fromHere({
            isAssetReserveChain: true,
            parents: 0,
          }),
          asset: laos,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara20(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
    {
      source: {
        asset: eurc,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: eurc,
        chain: pendulum,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.1,
          asset: eurc,
        },
        min: AssetMinBuilder().assetRegistry().metadata(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
  ],
});
