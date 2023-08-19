import {
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { glmr, hdx, wbtc, weth, whusdc } from '../assets';
import { hydraDX, moonbeam } from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const hydraDxConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: hdx,
      balance: BalanceBuilder().substrate().system().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
        asset: hdx,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    new AssetConfig({
      asset: glmr,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.01,
        asset: glmr,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    }),
    // TODO pending tests
    // new AssetConfig({
    //   asset: dai,
    //   balance: BalanceBuilder().substrate().tokens().accounts(),
    //   destination: moonbeam,
    //   destinationFee: {
    //     amount: 0.04,
    //     asset: glmr,
    //   },
    //   extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
    //   fee: {
    //     asset: hdx,
    //     balance: BalanceBuilder().substrate().system().account(),
    //   },
    // }),
    new AssetConfig({
      asset: wbtc,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.04,
        asset: glmr,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: hdx,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: weth,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.04,
        asset: glmr,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: hdx,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: whusdc,
      balance: BalanceBuilder().substrate().tokens().accounts(),
      destination: moonbeam,
      destinationFee: {
        amount: 0.04,
        asset: glmr,
      },
      extrinsic: ExtrinsicBuilder().xTokens().transferMultiCurrencies(),
      fee: {
        asset: hdx,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
  ],
  chain: hydraDX,
});
