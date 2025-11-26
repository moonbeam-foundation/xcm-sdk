import { BalanceBuilder, MrlBuilder } from '@moonbeam-network/xcm-builder';
import { glmr, movr, usdc, usdcwh } from '../assets';
import { ethereum, moonriver } from '../chains';
import { MrlChainRoutes } from '../types/MrlChainRoutes';

export const moonriverRoutes = new MrlChainRoutes({
  chain: moonriver,
  routes: [
    {
      source: {
        asset: usdcwh,
        balance: BalanceBuilder().evm().erc20(),
        destinationFee: {
          asset: usdcwh,
          balance: BalanceBuilder().evm().erc20(),
        },
        moonChainFee: {
          asset: glmr,
          balance: BalanceBuilder().evm().erc20(),
        },
        fee: {
          asset: movr,
          balance: BalanceBuilder().evm().native(),
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
        transfer: MrlBuilder()
          .wormhole()
          .extrinsic()
          .polkadotXcm()
          .send('polkadotXcm'),
        moonChain: {
          asset: usdcwh,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0.1,
            balance: BalanceBuilder().evm().native(),
          },
        },
      },
    },
  ],
});
