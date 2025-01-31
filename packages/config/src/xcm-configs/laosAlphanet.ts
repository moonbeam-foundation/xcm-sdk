import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { maos } from '../assets';
import { laosAlphanet, moonbaseAlpha } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const laosAlphanetRoutes = new ChainRoutes({
  chain: laosAlphanet,
  routes: [
    {
      source: {
        asset: maos,
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        asset: maos,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          // TODO current configuration for xcmPaymentApi is not compatible with how the MAOS asset version Id works in Moonbase
          // using fixed fee until future refactoring of xcmPaymentApi for generic chains
          amount: 0.1,
          // amount: FeeBuilder()
          //   .xcmPaymentApi()
          //   .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: maos,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsUsingTypeAndThen()
        .here(),
    },
  ],
});
