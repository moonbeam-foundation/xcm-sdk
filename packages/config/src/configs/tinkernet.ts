import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { tnkr } from '../assets';
import { moonriver, tinkernet } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const tinkernetConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: tnkr,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().xcmPaymentApi().xcmPaymentFee({
          isAssetReserveChain: false,
        }),
        asset: tnkr,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
  ],
  chain: tinkernet,
});
