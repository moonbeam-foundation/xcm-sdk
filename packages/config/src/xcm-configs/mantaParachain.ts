import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { glmr, manta } from '../assets';
import { mantaParachain, moonbeam } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const mantaParachainRoutes = new ChainRoutes({
  chain: mantaParachain,
  routes: [
    {
      asset: manta,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: manta,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      asset: glmr,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: manta,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
      },
      destination: {
        chain: moonbeam,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.01,
          asset: glmr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
