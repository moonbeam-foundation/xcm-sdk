import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { csm, movr } from '../assets';
import { crustShadow, moonriver } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const crustShadowRoutes = new ChainRoutes({
  chain: crustShadow,
  routes: [
    {
      asset: csm,
      source: {
        balance: BalanceBuilder().substrate().system().account(),
      },
      destination: {
        chain: moonriver,
        fee: {
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: csm,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      transfer: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .here(),
    },
    {
      asset: movr,
      source: {
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: csm,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        chain: moonriver,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: 0.0001,
          asset: movr,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      transfer: ExtrinsicBuilder().xTokens().transfer(),
    },
  ],
});
