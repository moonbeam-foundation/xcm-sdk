import { BalanceBuilder, MrlBuilder } from '@moonbeam-network/xcm-builder';
import { dev, ftmwh } from '../assets';
import { fantomTestnet, peaqAlphanet } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const fantomTestnetRoutes = new ChainRoutes({
  chain: fantomTestnet,
  routes: [
    {
      asset: ftmwh,
      source: {
        balance: BalanceBuilder().evm().native(),
        destinationFee: {
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        chain: peaqAlphanet,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: ftmwh,
          amount: 0.01,
        },
      },
      mrl: {
        isAutomatic: true,
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChainFee: {
          asset: dev,
          amount: 0.1,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
    },
  ],
});
