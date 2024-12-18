import { BalanceBuilder, MrlBuilder } from '@moonbeam-network/xcm-builder';
import { agng, dev, ftm, ftmwh } from '../assets';
import { fantomTestnet, peaqAlphanet } from '../chains';
import { MrlChainRoutes } from '../types/MrlChainRoutes';

export const peaqAlphanetRoutes = new MrlChainRoutes({
  chain: peaqAlphanet,
  routes: [
    {
      source: {
        asset: ftmwh,
        balance: BalanceBuilder().substrate().assets().account(),
        destinationFee: {
          asset: ftmwh,
          balance: BalanceBuilder().substrate().assets().account(),
        },
        moonChainFee: {
          asset: dev,
          balance: BalanceBuilder().substrate().assets().account(),
        },
        fee: {
          asset: agng,
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
        transfer: MrlBuilder().wormhole().extrinsic().polkadotXcm().send(),
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
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          asset: ftmwh,
          balance: BalanceBuilder().substrate().assets().account(),
        },
        moonChainFee: {
          asset: dev,
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: agng,
        chain: fantomTestnet,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: agng,
          amount: 0.2,
        },
      },
      mrl: {
        isAutomaticPossible: true,
        transfer: MrlBuilder().wormhole().extrinsic().polkadotXcm().send(),
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
  ],
});
