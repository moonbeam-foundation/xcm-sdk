import { BalanceBuilder, MrlBuilder } from '@moonbeam-network/xcm-builder';
import { agng, dev, ftm, ftmwh } from '../assets';
import {
  fantomTestnet,
  moonbaseAlpha,
  moonbaseBeta,
  peaqAlphanet,
  peaqEvmAlphanet,
} from '../chains';
import { MrlChainRoutes } from '../types/MrlChainRoutes';

export const fantomTestnetRoutes = new MrlChainRoutes({
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
        isAutomaticPossible: false,
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
        asset: ftm,
        balance: BalanceBuilder().evm().native(),
        destinationFee: {
          asset: ftm,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: ftmwh,
        chain: peaqEvmAlphanet,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: ftmwh,
          amount: 0.01,
        },
      },
      mrl: {
        isAutomaticPossible: false,
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
        asset: agng,
        balance: BalanceBuilder().evm().erc20(),
        destinationFee: {
          asset: agng,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: agng,
        chain: peaqAlphanet,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: agng,
          amount: 1,
        },
      },
      mrl: {
        isAutomaticPossible: false,
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChain: {
          asset: agng,
          balance: BalanceBuilder().substrate().assets().account(),

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
        chain: moonbaseBeta,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: ftmwh,
          amount: 0.06,
        },
      },
      mrl: {
        isAutomaticPossible: false,
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
        balance: BalanceBuilder().evm().erc20(),
        destinationFee: {
          asset: dev,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: dev,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().substrate().system().account(),
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
          balance: BalanceBuilder().substrate().system().account(),
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
