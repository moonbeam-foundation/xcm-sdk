import { BalanceBuilder, MrlBuilder } from '@moonbeam-network/xcm-builder';
import {
  dai,
  eth,
  glmr,
  usdc,
  usdcwh,
  usdt,
  usdtwh,
  wbtc,
  weth,
} from '../assets';
import { ethereum, hydration, moonbeam } from '../chains';
import { MrlChainRoutes } from '../types/MrlChainRoutes';

export const ethereumRoutes = new MrlChainRoutes({
  chain: ethereum,
  routes: [
    /**
     * Destination Hydration
     */
    {
      source: {
        asset: eth,
        balance: BalanceBuilder().evm().native(),
        destinationFee: {
          asset: eth,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: weth,
        chain: hydration,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: weth,
          amount: 0.000002,
        },
      },
      mrl: {
        isAutomaticPossible: false,
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChain: {
          asset: weth,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0.15,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
    {
      source: {
        asset: usdc,
        balance: BalanceBuilder().evm().erc20(),
        destinationFee: {
          asset: usdc,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdcwh,
        chain: hydration,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: usdcwh,
          amount: 0.004,
        },
      },
      mrl: {
        isAutomaticPossible: false,
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChain: {
          asset: usdcwh,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0.15,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
    {
      source: {
        asset: usdt,
        balance: BalanceBuilder().evm().erc20(),
        destinationFee: {
          asset: usdt,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdtwh,
        chain: hydration,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: usdtwh,
          amount: 0.004,
        },
      },
      mrl: {
        isAutomaticPossible: false,
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChain: {
          asset: usdtwh,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0.15,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
    {
      source: {
        asset: dai,
        balance: BalanceBuilder().evm().erc20(),
        destinationFee: {
          asset: dai,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: dai,
        chain: hydration,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: dai,
          amount: 0.004,
        },
      },
      mrl: {
        isAutomaticPossible: false,
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChain: {
          asset: dai,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0.15,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
    {
      source: {
        asset: wbtc,
        balance: BalanceBuilder().evm().erc20(),
        destinationFee: {
          asset: wbtc,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: wbtc,
        chain: hydration,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: wbtc,
          amount: 0.0000001,
        },
      },
      mrl: {
        isAutomaticPossible: false,
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChain: {
          asset: wbtc,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0.15,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
    /**
     * Destination Moonbeam
     */
    {
      source: {
        asset: eth,
        balance: BalanceBuilder().evm().native(),
        destinationFee: {
          asset: eth,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: weth,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: weth,
          amount: 0,
        },
      },
      mrl: {
        isAutomaticPossible: true,
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChain: {
          asset: weth,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0.15,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
    {
      source: {
        asset: usdc,
        balance: BalanceBuilder().evm().erc20(),
        destinationFee: {
          asset: usdc,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdcwh,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: usdcwh,
          amount: 0,
        },
      },
      mrl: {
        isAutomaticPossible: true,
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChain: {
          asset: usdcwh,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0.15,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
    {
      source: {
        asset: usdt,
        balance: BalanceBuilder().evm().erc20(),
        destinationFee: {
          asset: usdt,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdtwh,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: usdtwh,
          amount: 0,
        },
      },
      mrl: {
        isAutomaticPossible: true,
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChain: {
          asset: usdtwh,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0.15,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
    {
      source: {
        asset: dai,
        balance: BalanceBuilder().evm().erc20(),
        destinationFee: {
          asset: dai,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: dai,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: dai,
          amount: 0,
        },
      },
      mrl: {
        isAutomaticPossible: true,
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChain: {
          asset: dai,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0.15,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
    {
      source: {
        asset: wbtc,
        balance: BalanceBuilder().evm().erc20(),
        destinationFee: {
          asset: wbtc,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: wbtc,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: wbtc,
          amount: 0,
        },
      },
      mrl: {
        isAutomaticPossible: true,
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChain: {
          asset: wbtc,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0.15,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
    {
      source: {
        asset: glmr,
        balance: BalanceBuilder().evm().erc20(),
        destinationFee: {
          asset: glmr,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: glmr,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: glmr,
          amount: 0,
        },
      },
      mrl: {
        isAutomaticPossible: true,
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChain: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
          fee: {
            asset: glmr,
            amount: 0.15,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
  ],
});
