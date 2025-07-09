import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
  MessageQueue,
  MonitoringBuilder,
} from '@moonbeam-network/xcm-builder';
import { tt1, unit } from '../assets';
import { alphanetAssetHub, moonbaseAlpha } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const alphanetAssetHubRoutes = new ChainRoutes({
  chain: alphanetAssetHub,
  routes: [
    {
      source: {
        asset: tt1,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: unit,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: tt1,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromAssetIdQuery({ isAssetReserveChain: false }),
          asset: tt1,
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      // TODO add monitoring
      monitoring: MonitoringBuilder().polkadotXcm().messageQueue(),
      // monitoring: {
      //   source: {
      //     event: {
      //       section: 'polkadotXcm',
      //       method: 'Sent',
      //     },
      //     addressExtractor: XcmPallet().getAddress().fromAccountId32(),
      //     messageIdExtractor: XcmPallet().getMessageId().fromMessageId(),
      //   },
      //   destination: {
      //     event: {
      //       section: 'messageQueue',
      //       method: 'Processed',
      //     },
      //     messageIdExtractor: MessageQueue().getMessageId().fromId(),
      //   },
      // },
    },
  ],
});
