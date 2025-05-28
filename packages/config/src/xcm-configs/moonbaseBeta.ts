import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { alan, dev, devBeta, devStage } from '../assets';
import { moonbaseAlpha, moonbaseBeta, moonbaseStage } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonbaseBetaRoutes = new ChainRoutes({
  chain: moonbaseBeta,
  routes: [
    {
      source: {
        asset: dev,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: devBeta,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: dev,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromPalletInstance({ isAssetReserveChain: true }),
          asset: dev,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      source: {
        asset: alan,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: devBeta,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: alan,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: true }),
          asset: dev,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
    {
      source: {
        asset: devBeta,
        balance: BalanceBuilder().evm().native(),
        fee: {
          asset: devBeta,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: devBeta,
        chain: moonbaseStage,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: devBeta,
          amount: 0.0001, // TODO mjm calculate?
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem()
        .X1(),
    },
    {
      source: {
        asset: devStage,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: devBeta,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: devStage,
        chain: moonbaseStage,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: devStage,
          amount: 0.1, // TODO
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem()
        .X3(),
    },
  ],
});
