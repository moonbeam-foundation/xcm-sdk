import {
  AssetMinBuilder,
  BalanceBuilder,
  ContractBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import {
  aseed,
  bnc,
  crab,
  csm,
  kar,
  kbtc,
  kint,
  ksm,
  mgx,
  movr,
  rmrk,
  sdn,
  teer,
  usdt,
  vbnc,
  vksm,
  vmovr,
  xrt,
} from '../assets';
import {
  bifrostKusama,
  crustShadow,
  darwiniaCrab,
  integritee,
  karura,
  kintsugi,
  kusama,
  kusamaAssetHub,
  mangataKusama,
  moonriver,
  robonomics,
  shiden,
  // turing,
} from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonriverRoutes = new ChainRoutes({
  chain: moonriver,
  routes: [
    {
      source: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: movr,
        chain: bifrostKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().fromSourcePalletInstance({
            isAssetReserveChain: false,
          }),
          asset: movr,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
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
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: movr,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: movr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: movr,
        chain: shiden,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().fromSourcePalletInstance({
            isAssetReserveChain: false,
          }),
          asset: movr,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    // {
    //   source: {
    //     asset: movr,
    //     balance: BalanceBuilder().substrate().system().account(),
    //     destinationFee: {
    //       balance: BalanceBuilder().substrate().system().account(),
    //     },
    //   },
    //   destination: {
    //     asset: movr,
    //     chain: turing,
    //     balance: BalanceBuilder().substrate().tokens().accounts(),
    //     fee: {
    //       amount: 0.004,
    //       asset: movr,
    //     },
    //   },
    //   contract: ContractBuilder().Xtokens().transfer(),
    // },
    {
      source: {
        asset: bnc,
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
        asset: bnc,
        chain: bifrostKusama,
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
        asset: crab,
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
        asset: crab,
        chain: darwiniaCrab,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.1,
          asset: crab,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara20(),
    },
    {
      source: {
        asset: csm,
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
        asset: csm,
        chain: crustShadow,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.004,
          asset: csm,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: kar,
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
        asset: kar,
        chain: karura,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.032,
          asset: kar,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: aseed,
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
        asset: aseed,
        chain: karura,
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
        asset: kbtc,
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
        asset: kbtc,
        chain: kintsugi,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0000011,
          asset: kbtc,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: kint,
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
        asset: kint,
        chain: kintsugi,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.00084,
          asset: kint,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: ksm,
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
        asset: ksm,
        chain: kusama,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().fromHere({
            isAssetReserveChain: true,
            parents: 0,
          }),
          asset: ksm,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: mgx,
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
        asset: mgx,
        chain: mangataKusama,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 5.5,
          asset: mgx,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: rmrk,
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
        asset: rmrk,
        chain: kusamaAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          // RMRK is not supported by XCM Payment API in Kusama yet
          // amount: FeeBuilder()
          //   .xcmPaymentApi()
          //   .fromPalletInstanceAndGeneralIndex({
          //     isAssetReserveChain: true,
          //   }),
          amount: 0.0001,
          asset: rmrk,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: sdn,
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
        asset: sdn,
        chain: shiden,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().fromHere({
            isAssetReserveChain: true,
            parents: 0,
          }),
          asset: sdn,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: teer,
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
        asset: teer,
        chain: integritee,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.004,
          asset: teer,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    // {
    //   source: {
    //     asset: tur,
    //     balance: BalanceBuilder().evm().erc20(),
    //     fee: {
    //       asset: movr,
    //       balance: BalanceBuilder().substrate().system().account(),
    //     },
    //     destinationFee: {
    //       balance: BalanceBuilder().evm().erc20(),
    //     },
    //   },
    //   destination: {
    //     asset: tur,
    //     chain: turing,
    //     balance: BalanceBuilder().substrate().system().account(),
    //     fee: {
    //       amount: 0.2,
    //       asset: tur,
    //     },
    //   },
    //   contract: ContractBuilder().Xtokens().transfer(),
    // },
    {
      source: {
        asset: usdt,
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
        asset: usdt,
        chain: kusamaAssetHub,
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
    },
    {
      source: {
        asset: xrt,
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
        asset: xrt,
        chain: robonomics,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.000032,
          asset: xrt,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
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
          amount: FeeBuilder().xcmPaymentApi().fromCurrencyIdToLocations({
            isAssetReserveChain: false,
          }),
          asset: vbnc,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
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
          amount: FeeBuilder().xcmPaymentApi().fromCurrencyIdToLocations({
            isAssetReserveChain: false,
          }),
          asset: vksm,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
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
          amount: FeeBuilder().xcmPaymentApi().fromCurrencyIdToLocations({
            isAssetReserveChain: false,
          }),
          asset: vmovr,
        },
        min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
  ],
});
