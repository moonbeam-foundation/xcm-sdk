import { BalanceBuilder, MrlBuilder } from '@moonbeam-network/xcm-builder';
import {
  dai,
  eth,
  glmr,
  hdx,
  usdc,
  usdcwh,
  usdt,
  usdtwh,
  wbtc,
  weth,
} from '../assets';
import { ethereum, hydration } from '../chains';
import { MrlChainRoutes } from '../types/MrlChainRoutes';

export const hydrationRoutes = new MrlChainRoutes({
  chain: hydration,
  routes: [
    {
      source: {
        asset: weth,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        destinationFee: {
          asset: weth,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        moonChainFee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        fee: {
          asset: hdx,
          balance: BalanceBuilder().substrate().system().account(),
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
        transfer: MrlBuilder().wormhole().extrinsic().polkadotXcm().send(),
        moonChain: {
          asset: weth,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0.1,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
    {
      source: {
        asset: usdcwh,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        destinationFee: {
          asset: usdcwh,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        moonChainFee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        fee: {
          asset: hdx,
          balance: BalanceBuilder().substrate().system().account(),
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
        transfer: MrlBuilder().wormhole().extrinsic().polkadotXcm().send(),
        moonChain: {
          asset: usdcwh,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0.1,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
    {
      source: {
        asset: usdtwh,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        destinationFee: {
          asset: usdtwh,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        moonChainFee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        fee: {
          asset: hdx,
          balance: BalanceBuilder().substrate().system().account(),
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
        transfer: MrlBuilder().wormhole().extrinsic().polkadotXcm().send(),
        moonChain: {
          asset: usdtwh,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0.1,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
    {
      source: {
        asset: dai,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        destinationFee: {
          asset: dai,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        moonChainFee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        fee: {
          asset: hdx,
          balance: BalanceBuilder().substrate().system().account(),
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
        transfer: MrlBuilder().wormhole().extrinsic().polkadotXcm().send(),
        moonChain: {
          asset: dai,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0.1,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
    {
      source: {
        asset: wbtc,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        destinationFee: {
          asset: wbtc,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        moonChainFee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        fee: {
          asset: hdx,
          balance: BalanceBuilder().substrate().system().account(),
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
        transfer: MrlBuilder().wormhole().extrinsic().polkadotXcm().send(),
        moonChain: {
          asset: wbtc,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0.1,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
  ],
});
