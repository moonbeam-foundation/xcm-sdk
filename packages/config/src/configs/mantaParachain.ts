import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { glmr, manta } from '../assets';
import { mantaParachain, moonbeam } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const mantaParachainConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: manta,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: manta,
        balance: BalanceBuilder().substrate().system().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.01,
        asset: glmr,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
      fee: {
        asset: manta,
        balance: BalanceBuilder().substrate().system().account(),
      },
      min: AssetMinBuilder().assets().asset(),
    }),
  ],
  chain: mantaParachain,
});
