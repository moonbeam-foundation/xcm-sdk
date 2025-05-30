import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { aca, aseed, glmr, ldot } from '../assets';
import { acala, moonbeam } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const acalaRoutes = new ChainRoutes({
  chain: acala,
  routes: [
    {
      source: {
        asset: aca,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: aca,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: aca,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: aca,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      source: {
        asset: aseed,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: aca,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assetRegistry().assetMetadatas(),
        destinationFee: {
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      destination: {
        asset: aseed,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: aseed,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: aca,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assetRegistry().assetMetadatas(),
        destinationFee: {
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      destination: {
        asset: glmr,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromPalletInstance({ isAssetReserveChain: true }),
          asset: glmr,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      source: {
        asset: ldot,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: aca,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assetRegistry().assetMetadatas(),
        destinationFee: {
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
      },
      destination: {
        asset: ldot,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: ldot,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
