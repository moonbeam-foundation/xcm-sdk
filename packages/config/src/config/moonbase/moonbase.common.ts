import { createBalanceBuilder } from '../../balance';
import { MoonChainKey, MOON_CHAINS } from '../../constants';
import { createExtrinsicBuilder } from '../../extrinsic';
import { createMultilocationBuilder } from '../../multilocation';
import { createTransactBuilder } from '../../transact';
import { createWithdrawBuilder } from '../../withdraw';
import { MOONBASE_ASSETS_MAP as assets } from './moonbase.assets';
import { MOONBASE_CHAINS_MAP as chains } from './moonbase.chains';
import { MoonbaseAssets, MoonbaseChains } from './moonbase.interfaces';

export { assets, chains };

export const moonbase = MOON_CHAINS[MoonChainKey.MoonbaseAlpha];
export const balance = createBalanceBuilder<MoonbaseAssets>();
export const extrinsic = createExtrinsicBuilder<MoonbaseAssets, MoonbaseChains>(
  moonbase,
);
export const withdraw = createWithdrawBuilder<MoonbaseAssets>();
export const transact = createTransactBuilder<MoonbaseChains>();
export const multilocation = createMultilocationBuilder();
