import { createBalanceBuilder } from '../../balance';
import {
  MOONRIVER_ASSETS_CONFIGS as assets,
  MOONRIVER_CHAINS_CONFIGS as chains,
  MoonChain,
  MOON_CHINS_CONFIGS,
} from '../../constants';
import { createExtrinsicBuilder } from '../../extrinsic';
import { MoonriverAssets } from '../../interfaces';
import { createWithdrawBuilder } from '../../withdraw';

export { assets, chains };

export const moonriver = MOON_CHINS_CONFIGS[MoonChain.Moonriver];
export const balance = createBalanceBuilder<MoonriverAssets>();
export const extrinsic = createExtrinsicBuilder<MoonriverAssets>(moonriver);
export const withdraw = createWithdrawBuilder<MoonriverAssets>();
