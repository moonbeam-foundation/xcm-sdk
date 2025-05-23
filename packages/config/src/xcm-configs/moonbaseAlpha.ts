import {
  AssetMinBuilder,
  BalanceBuilder,
  ContractBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import {
  agng,
  alan,
  ampe,
  dev,
  ftmwh,
  hdx,
  maos,
  otp,
  tt1,
  tur,
  unit,
  usdcwh,
} from '../assets';
import {
  alphanetAssetHub,
  alphanetRelay,
  hydrationAlphanet,
  laosAlphanet,
  moonbaseAlpha,
  moonbaseBeta,
  originTrailAlphanet,
  peaqAlphanet,
  peaqEvmAlphanet,
  pendulumAlphanet,
  turingAlphanet,
} from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonbaseAlphaRoutes = new ChainRoutes({
  chain: moonbaseAlpha,
  routes: [
    {
      source: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: dev,
        chain: turingAlphanet,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.00001,
          asset: dev,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: dev,
        chain: moonbaseBeta,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.0002,
          asset: dev,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara20(),
    },
    {
      source: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: dev,
        chain: pendulumAlphanet,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0000001,
          asset: dev,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: alan,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: alan,
        chain: moonbaseBeta,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.0002,
          asset: dev,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara20(),
    },
    {
      source: {
        asset: ampe,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: ampe,
        chain: pendulumAlphanet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.001,
          asset: ampe,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: otp,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: otp,
        chain: originTrailAlphanet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.004,
          asset: otp,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: tt1,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: tt1,
        chain: alphanetAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 5,
          asset: tt1,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: tur,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: tur,
        chain: turingAlphanet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.2,
          asset: tur,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: unit,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: unit,
        chain: alphanetRelay,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder().xcmPaymentApi().fromHere({
            isAssetReserveChain: true,
            parents: 0,
          }),
          asset: unit,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToRelay(),
    },
    {
      source: {
        asset: usdcwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdcwh,
        chain: hydrationAlphanet,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.1,
          asset: usdcwh,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: ftmwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: ftmwh,
        chain: hydrationAlphanet,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.01,
          asset: ftmwh,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: ftmwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: ftmwh,
        chain: peaqAlphanet,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.01,
          asset: ftmwh,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: dev,
        chain: hydrationAlphanet,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          amount: 0.0002,
          asset: dev,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: hdx,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: hdx,
        chain: hydrationAlphanet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.5,
          asset: hdx,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: dev,
        chain: peaqAlphanet,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.00000001,
          asset: dev,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: ftmwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: ftmwh,
        chain: peaqAlphanet,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.01,
          asset: ftmwh,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: agng,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: agng,
        chain: peaqAlphanet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: agng,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara32(),
    },
    {
      source: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: dev,
        chain: peaqEvmAlphanet,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.00000001,
          asset: dev,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara20(),
    },
    {
      source: {
        asset: ftmwh,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: ftmwh,
        chain: peaqEvmAlphanet,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: 0.01,
          asset: ftmwh,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara20(),
    },
    {
      source: {
        asset: maos,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: maos,
        chain: laosAlphanet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.1,
          asset: maos,
        },
      },
      contract: ContractBuilder().XcmPrecompile().transferAssetsToPara20(),
    },
  ],
});
