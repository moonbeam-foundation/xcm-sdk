import { uniqueAlpha } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

// NOTE: Disabling because ws endpoint is not working
// The config might be invalid
export const uniqueAlphaRoutes = new ChainRoutes({
  chain: uniqueAlpha,
  routes: [
    // new AssetConfig({
    //   asset: auq,
    //   balance: BalanceBuilder().substrate().assets().account(),
    //   destination: {
    //   chain: moonbaseAlpha,
    //   fee:{
    //     amount: FeeBuilder().assetManager().assetTypeUnitsPerSecond(),
    //     asset: auq,
    //     balance: BalanceBuilder().substrate().assets().account(),
    //   }
    //   },
    //   extrinsic: ExtrinsicBuilder().xTokens().transfer(),
    // }),
  ],
});
