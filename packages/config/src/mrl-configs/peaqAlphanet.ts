import { BalanceBuilder, MrlBuilder } from '@moonbeam-network/xcm-builder';
import { agng, dev, ftm, ftmwh } from '../assets';
import { fantomTestnet, peaqAlphanet } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const peaqAlphanetRoutes = new ChainRoutes({
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
        isAutomatic: true,
        transfer: MrlBuilder().wormhole().extrinsic().polkadotXcm().send(),
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
        asset: agng,
        balance: BalanceBuilder().substrate().system().account(),
        destinationFee: {
          asset: ftmwh,
          balance: BalanceBuilder().substrate().assets().account(),
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
        isAutomatic: true,
        transfer: MrlBuilder().wormhole().extrinsic().polkadotXcm().send(),
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
