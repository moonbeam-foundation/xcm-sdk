import {
  BalanceBuilder,
  ExtrinsicBuilder,
} from '@moonbeam-network/xcm-builder';
import { laos } from '../assets';
import { laosMainnet, moonbeam } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const laosRoutes = new ChainRoutes({
  chain: laosMainnet,
  routes: [
    {
      source: {
        asset: laos,
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        asset: laos,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          // TODO current configuration for xcmPaymentApi is not compatible
          // using fixed fee until future refactoring of xcmPaymentApi for generic chains
          amount: 0.1,
          // amount: FeeBuilder()
          //   .xcmPaymentApi()
          //   .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: laos,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsUsingTypeAndThen()
        .here(),
    },
  ],
});
