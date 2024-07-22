import { uniqueAlpha } from '../chains';
import { ChainRoutesConfig } from '../types/ChainRoutesConfig';

// NOTE: Disabling because ws endpoint is not working
export const uniqueAlphaConfig = new ChainRoutesConfig({
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
