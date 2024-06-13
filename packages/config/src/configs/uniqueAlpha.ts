import { ChainConfig } from '../types/ChainConfig';
import { uniqueAlpha } from '../xcmChains';

// NOTE: Disabling because ws endpoint is not working
export const uniqueAlphaConfig = new ChainConfig({
  assets: [
    // new AssetConfig({
    //   asset: auq,
    //   balance: BalanceBuilder().substrate().assets().account(),
    //   destination: moonbaseAlpha,
    //   destinationFee: {
    //     amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
    //     asset: auq,
    //     balance: BalanceBuilder().substrate().assets().account(),
    //   },
    //   extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    // }),
  ],
  chain: uniqueAlpha,
});
