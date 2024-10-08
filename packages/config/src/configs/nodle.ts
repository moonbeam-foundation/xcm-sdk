import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { nodl } from '../assets';
import { moonbeam, nodle } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const nodleConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: nodl,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder()
          .xcmPaymentApi()
          .xcmPaymentFee({ isAssetReserveChain: false }),
        asset: nodl,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
  ],
  chain: nodle,
});
