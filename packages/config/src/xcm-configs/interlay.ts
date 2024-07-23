import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { glmr, ibtc, intr } from '../assets';
import { interlay, moonbeam } from '../chains';
import { AssetRoute } from '../types/AssetRoute';
import { ChainRoutes } from '../types/ChainRoutes';

export const interlayRoutes = new ChainRoutes({
  chain: interlay,
  routes: [
    new AssetRoute({
      asset: intr,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: intr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetRoute({
      asset: ibtc,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: intr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: intr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
    }),
    new AssetRoute({
      asset: glmr,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.001,
        asset: glmr,
        balance: BalanceBuilder().substrate().tokens().accounts(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
  ],
});
