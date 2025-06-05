import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { devBeta, devStage } from '../assets';
import { moonbaseBeta, moonbaseStage } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonbaseBetaRoutes = new ChainRoutes({
  chain: moonbaseBeta,
  routes: [
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
          amount: FeeBuilder().xcmPaymentApi().fromAssetIdQuery({
            isAssetReserveChain: false,
          }),
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
          amount: FeeBuilder().xcmPaymentApi().fromPalletInstance({
            isAssetReserveChain: true,
          }),
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
