import { BalanceBuilder, MrlBuilder } from '@moonbeam-network/xcm-builder';
import { dev, ftm, ftmwh } from '../assets';
import { fantomTestnet, moonbaseAlpha, peaqAlphanet } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const fantomTestnetRoutes = new ChainRoutes({
  chain: fantomTestnet,
  routes: [
    {
      source: {
        asset: ftm,
        balance: BalanceBuilder().evm().native(),
        destinationFee: {
          asset: ftm,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: ftmwh,
        chain: peaqAlphanet,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: ftmwh,
          amount: 0.01,
        },
      },
      mrl: {
        isAutomatic: false, // TODO should be isAutomaticPossible
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChain: {
          asset: ftmwh,
          fee: {
            asset: dev,
            amount: 0.1,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
    {
      source: {
        asset: ftm,
        balance: BalanceBuilder().evm().native(),
        destinationFee: {
          asset: ftm,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: ftmwh,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: ftmwh,
          amount: 0.01,
        },
      },
      mrl: {
        isAutomatic: false,
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChain: {
          asset: ftmwh,
          fee: {
            asset: dev,
            amount: 0.1,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
  ],
});
