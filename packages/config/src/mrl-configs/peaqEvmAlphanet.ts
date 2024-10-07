import { BalanceBuilder, MrlBuilder } from '@moonbeam-network/xcm-builder';
import { agng, dev, ftm, ftmwh } from '../assets';
import { fantomTestnet, peaqEvmAlphanet } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const peaqEvmAlphanetRoutes = new ChainRoutes({
  chain: peaqEvmAlphanet,
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
          asset: agng,
          balance: BalanceBuilder().substrate().system().accountEvmTo32(),
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
        transfer: MrlBuilder()
          .wormhole()
          .contract()
          .TokenBridge()
          .transferTokens(),
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
