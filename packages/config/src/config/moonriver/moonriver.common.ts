import { createBalanceBuilder } from '../../balance';
import { MoonChain, MOON_CHAINS_CONFIGS } from '../../constants';
import { MOONRIVER_ASSETS_CONFIGS as assets } from './moonriver.assets';
import { MOONRIVER_CHAINS_CONFIGS as chains } from './moonriver.chains';
import { createExtrinsicBuilder } from '../../extrinsic';
import { createWithdrawBuilder } from '../../withdraw';
import { MoonriverAssets } from './moonriver.interfaces';

export { assets, chains };

export const moonriver = MOON_CHAINS_CONFIGS[MoonChain.Moonriver];
export const balance = createBalanceBuilder<MoonriverAssets>();
export const extrinsic = createExtrinsicBuilder<MoonriverAssets>(moonriver);
export const withdraw = createWithdrawBuilder<MoonriverAssets>();
