import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { laos } from '../assets';
import { laosMainnet, moonbeam } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const laosRoutes = new ChainRoutes({
  chain: laosMainnet,
  routes: [
    {
      source: {
        asset: laos,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: laos,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: laos,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: laos,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .transferAssetsUsingTypeAndThen()
        .here(),
      monitoring: MonitoringBuilder()
        .monitorEvent()
        .polkadotXcm()
        .messageQueue(),
    },
  ],
});
