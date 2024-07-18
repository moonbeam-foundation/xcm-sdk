import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { csm, movr } from '../assets';
import { crustShadow, moonriver } from '../chains';
import { AssetTransferConfig } from '../types/AssetTransferConfig';
import { ChainRoutesConfig } from '../types/ChainRoutesConfig';

export const crustShadowConfig = new ChainRoutesConfig({
  assets: [
    new AssetTransferConfig({
      asset: csm,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonriver,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: csm,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .here(),
    }),
    new AssetTransferConfig({
      asset: movr,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonriver,
      destinationFee: {
        amount: 0.0001,
        asset: movr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: csm,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
  ],
  chain: crustShadow,
});
