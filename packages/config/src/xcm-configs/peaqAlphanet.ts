import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
  MessageQueue,
  XTokens,
} from '@moonbeam-network/xcm-builder';
import { agng, dev, ftmwh } from '../assets';
import { moonbaseAlpha, peaqAlphanet } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const peaqAlphanetRoutes = new ChainRoutes({
  chain: peaqAlphanet,
  routes: [
    {
      source: {
        asset: agng,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          asset: agng,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: agng,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          // amount: FeeBuilder()
          //   .xcmPaymentApi()
          //   .fromAssetIdQuery({ isAssetReserveChain: false }),
          amount: 0.001, // TODO remove this, force error in destination
          asset: agng,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      // TODO maybe apply just one, like extrinsic
      // monitoring: MonitoringBuilder().xTokens().transferredMultiAssets() or something
      monitoring: {
        source: {
          event: {
            section: 'xTokens',
            method: 'TransferredMultiAssets',
          },
          addressExtractor: XTokens().getAddress().fromSender(),
          messageIdExtractor: XTokens().getMessageId().fromXcmpQueue(),
        },
        destination: {
          event: {
            section: 'messageQueue',
            method: 'Processed',
          },
          messageIdExtractor: MessageQueue().getMessageId().fromId(),
        },
      },
    },
    {
      source: {
        asset: dev,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: agng,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: dev,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().substrate().system().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromPalletInstance({ isAssetReserveChain: true }),
          asset: dev,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    },
    {
      source: {
        asset: ftmwh,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: agng,
          balance: BalanceBuilder().substrate().system().account(),
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: ftmwh,
        chain: moonbaseAlpha,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .fromPalletInstanceAndAccountKey20({ isAssetReserveChain: true }),
          asset: dev,
        },
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    },
  ],
});
