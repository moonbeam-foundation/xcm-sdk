import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
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
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
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
