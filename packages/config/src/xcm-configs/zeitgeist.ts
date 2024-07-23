import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { glmr, usdcwh, ztg } from '../assets';
import { moonbeam, zeitgeist } from '../chains';
import { AssetRoute } from '../types/AssetRoute';
import { ChainRoutes } from '../types/ChainRoutes';

export const zeitgeistRoutes = new ChainRoutes({
  chain: zeitgeist,
  routes: [
    new AssetRoute({
      asset: ztg,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: ztg,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetRoute({
      asset: usdcwh,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.04,
        asset: glmr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: ztg,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetRoute({
      asset: glmr,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.01,
        asset: glmr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
  ],
});
