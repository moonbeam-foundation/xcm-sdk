import { BalanceBuilder, MrlBuilder } from '@moonbeam-network/xcm-builder';
import {
  dai,
  glmr,
  peaq,
  usdc,
  usdcwh,
  usdt,
  usdtwh,
  wbtc,
  weth,
} from '../assets';
import { ethereum, hydration, moonbeam, peaqChain } from '../chains';
import { MrlChainRoutes } from '../types/MrlChainRoutes';

export const moonbeamRoutes = new MrlChainRoutes({
  chain: moonbeam,
  routes: [
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
          amount: 0.004,
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
            amount: 0.15,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
  ],
});
