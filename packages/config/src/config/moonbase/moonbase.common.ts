import { createBalanceBuilder } from '../../balance';
import {
  MOONBASE_ASSETS_CONFIGS as assets,
  MOONBASE_CHINS_CONFIGS as chains,
  MoonChain,
  MOON_CHINS_CONFIGS,
} from '../../constants';
import { createExtrinsicBuilder } from '../../extrinsic';
import { MoonbaseAssets } from '../../interfaces';
import { createWithdrawBuilder } from '../../withdraw';

export { assets, chains };

export const moonbase = MOON_CHINS_CONFIGS[MoonChain.MoonbaseAlpha];
export const balance = createBalanceBuilder<MoonbaseAssets>();
export const extrinsic = createExtrinsicBuilder<MoonbaseAssets>(moonbase);
export const withdraw = createWithdrawBuilder<MoonbaseAssets>();
