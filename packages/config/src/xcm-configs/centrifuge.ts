import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { cfg } from '../assets';
import { centrifuge, moonbeam } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const centrifugeRoutes = new ChainRoutes({
  chain: centrifuge,
  routes: [
    {
      source: {
        asset: cfg,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: cfg,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: cfg,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: cfg,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
