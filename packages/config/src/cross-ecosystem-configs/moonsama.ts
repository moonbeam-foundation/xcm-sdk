import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { lamaGLMR, movrsama } from '../assets';
import { moonlama, moonsama } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonsamaRoutes = new ChainRoutes({
  chain: moonsama,
  routes: [
    {
      source: {
        asset: movrsama,
        balance: BalanceBuilder().evm().native(),
        fee: {
          asset: movrsama,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: lamaGLMR,
        chain: moonlama,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: lamaGLMR,
          amount: FeeBuilder().xcmPaymentApi().fromAssetIdQuery({
            isAssetReserveChain: false,
            isEcosystemBridge: true,
          }),
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsToEcosystem()
        .X1(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
  ],
});
