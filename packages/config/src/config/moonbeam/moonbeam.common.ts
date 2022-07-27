import { createBalanceBuilder } from '../../balance';
import {
  MOONBEAM_ASSETS_CONFIGS as assets,
  MOONBEAM_CHAINS_CONFIGS as chains,
  MoonChain,
  MOON_CHINS_CONFIGS,
} from '../../constants';
import { createExtrinsicBuilder } from '../../extrinsic';
import { MoonbeamAssets } from '../../interfaces';
import { createWithdrawBuilder } from '../../withdraw';

export { assets, chains };

export const moonbeam = MOON_CHINS_CONFIGS[MoonChain.Moonbeam];
export const balance = createBalanceBuilder<MoonbeamAssets>();
export const extrinsic = createExtrinsicBuilder<MoonbeamAssets>(moonbeam);
export const withdraw = createWithdrawBuilder<MoonbeamAssets>();
