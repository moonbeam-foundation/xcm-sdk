import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { movr, pha } from '../assets';
import { khala, moonriver } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const khalaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: pha,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder()
          .xcmPaymentApi()
          .xcmPaymentFee({ isAssetReserveChain: false }),
        asset: pha,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTransfer().transfer().here(),
    }),
    new AssetConfig({
      asset: movr,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder()
          .xcmPaymentApi()
          .xcmPaymentFee({ isAssetReserveChain: true }),
        asset: movr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTransfer().transfer().X2(),
      fee: {
        asset: pha,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
  ],
  chain: khala,
});
