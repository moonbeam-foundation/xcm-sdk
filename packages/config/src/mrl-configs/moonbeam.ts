import { BalanceBuilder, MrlBuilder } from '@moonbeam-network/xcm-builder';
import {
  dai,
  eth,
  glmr,
  peaq,
  usdc,
  usdcwh,
  usdt,
  usdtwh,
  wbtc,
  weth,
} from '../assets';
import { ethereum, moonbeam } from '../chains';
import { MrlChainRoutes } from '../types/MrlChainRoutes';

export const moonbeamRoutes = new MrlChainRoutes({
  chain: moonbeam,
  routes: [
    {
      source: {
        asset: weth,
        balance: BalanceBuilder().evm().erc20(),
        destinationFee: {
          asset: weth,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: eth,
        chain: ethereum,
        balance: BalanceBuilder().evm().native(),
        fee: {
          asset: eth,
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
            amount: 0,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
    {
      source: {
        asset: peaq,
        balance: BalanceBuilder().evm().erc20(),
        destinationFee: {
          asset: peaq,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: peaq,
        chain: ethereum,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: peaq,
          amount: 0,
        },
      },
      mrl: {
        isAutomaticPossible: false,
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChain: {
          asset: peaq,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
    {
      source: {
        asset: usdcwh,
        balance: BalanceBuilder().evm().erc20(),
        destinationFee: {
          asset: usdcwh,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdc,
        chain: ethereum,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: usdc,
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
            amount: 0,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
    {
      source: {
        asset: usdtwh,
        balance: BalanceBuilder().evm().erc20(),
        destinationFee: {
          asset: usdtwh,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdt,
        chain: ethereum,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: usdt,
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
            amount: 0,
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
        chain: ethereum,
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
            amount: 0,
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
        chain: ethereum,
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
            amount: 0,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
  ],
});
