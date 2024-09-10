import {
  BalanceBuilder,
  FeeBuilder,
  MrlBuilder,
} from '@moonbeam-network/xcm-builder';
import { ftmwh, hdx } from '../assets';
import { fantomTestnet, hydrationAlphanet } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const fantomTestnetRoutes = new ChainRoutes({
  chain: fantomTestnet,
  routes: [
    {
      asset: ftmwh,
      source: {
        balance: BalanceBuilder().substrate().system().account(), // TODO:
      },
      destination: {
        chain: hydrationAlphanet,
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
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
      },
    },
  ],
});
