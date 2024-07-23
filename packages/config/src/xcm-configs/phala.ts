import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { glmr, pha } from '../assets';
import { moonbeam, phala } from '../chains';
import { AssetRoute } from '../types/AssetRoute';
import { ChainRoutes } from '../types/ChainRoutes';

export const phalaRoutes = new ChainRoutes({
  chain: phala,
  routes: [
    new AssetRoute({
      asset: pha,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: pha,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTransfer().transfer().here(),
    }),
    new AssetRoute({
      asset: glmr,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.01,
        asset: glmr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTransfer().transfer().X2(),
      fee: {
        asset: pha,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
  ],
});
