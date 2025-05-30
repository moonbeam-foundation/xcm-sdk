import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { neuro } from '../assets';
import { moonbeam, neuroweb } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const neurowebRoutes = new ChainRoutes({
  chain: neuroweb,
  routes: [
    {
      source: {
        asset: neuro,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: neuro,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: neuro,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: neuro,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X1(),
    },
  ],
});
