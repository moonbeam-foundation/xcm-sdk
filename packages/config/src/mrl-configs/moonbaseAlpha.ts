import { BalanceBuilder, MrlBuilder } from '@moonbeam-network/xcm-builder';
import { dev, ftm, ftmwh } from '../assets';
import { fantomTestnet, moonbaseAlpha } from '../chains';
import { MrlChainRoutes } from '../types/MrlChainRoutes';

export const moonbaseAlphaRoutes = new MrlChainRoutes({
  chain: moonbaseAlpha,
  routes: [
    {
      source: {
        asset: ftmwh,
        balance: BalanceBuilder().evm().erc20(),
        destinationFee: {
          asset: ftmwh,
          balance: BalanceBuilder().evm().erc20(),
        },
        fee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: ftm,
        chain: fantomTestnet,
        balance: BalanceBuilder().evm().native(),
        fee: {
          asset: ftm,
          amount: 0,
        },
      },
      mrl: {
        isAutomaticPossible: true,
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChain: {
          asset: ftmwh,
          balance: BalanceBuilder().evm().erc20(),
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
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          asset: dev,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: dev,
        chain: fantomTestnet,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dev,
          amount: 0,
        },
      },
      mrl: {
        isAutomaticPossible: true,
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChain: {
          asset: dev,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: dev,
            amount: 0,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
  ],
});
