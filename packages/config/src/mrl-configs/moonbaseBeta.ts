import { BalanceBuilder, MrlBuilder } from '@moonbeam-network/xcm-builder';
import { betaDEV, dev, ftm, ftmwh } from '../assets';
import { fantomTestnet, moonbaseBeta } from '../chains';
import { MrlChainRoutes } from '../types/MrlChainRoutes';

export const moonbaseBetaRoutes = new MrlChainRoutes({
  chain: moonbaseBeta,
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
          asset: betaDEV,
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
