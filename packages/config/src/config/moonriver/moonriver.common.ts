import { createBalanceBuilder } from '../../balance';
import { MoonChainKey, MOON_CHAINS } from '../../constants';
import { createExtrinsicBuilder } from '../../extrinsic';
import { createWithdrawBuilder } from '../../withdraw';
import { MOONRIVER_ASSETS_CONFIGS as assets } from './moonriver.assets';
import { MOONRIVER_CHAINS_CONFIGS as chains } from './moonriver.chains';
import { MoonriverAssets, MoonriverChains } from './moonriver.interfaces';

export { assets, chains };

export const moonriver = MOON_CHAINS[MoonChainKey.Moonriver];
export const balance = createBalanceBuilder<MoonriverAssets>();
export const extrinsic = createExtrinsicBuilder<
  MoonriverAssets,
  MoonriverChains
>(moonriver);
export const withdraw = createWithdrawBuilder<MoonriverAssets>();
