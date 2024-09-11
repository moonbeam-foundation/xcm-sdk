import {
  BalanceBuilder,
  FeeBuilder,
  MrlBuilder,
} from '@moonbeam-network/xcm-builder';
import { ftmwh, hdx } from '../assets';
import { fantomTestnet, hydrationAlphanet } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const hydrationAlphanetRoutes = new ChainRoutes({
  chain: hydrationAlphanet,
  routes: [
    {
      asset: ftmwh,
      source: {
        balance: BalanceBuilder().substrate().system().account(), // TODO:
      },
      destination: {
        chain: fantomTestnet,
        balance: BalanceBuilder().substrate().system().account(), // TODO:
        fee: {
          // TODO:
          amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
          asset: hdx,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      mrl: {
        isAutomatic: true,
        transfer: MrlBuilder().wormhole().extrinsic().polkadotXcm().send(), // TODO:
      },
    },
  ],
});