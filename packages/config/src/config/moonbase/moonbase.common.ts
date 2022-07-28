import { createBalanceBuilder } from '../../balance';
import { MoonChain, MOON_CHAINS_CONFIGS } from '../../constants';
import { MOONBASE_ASSETS_CONFIGS as assets } from './moonbase.assets';
import { MOONBASE_CHAINS_CONFIGS as chains } from './moonbase.chains';
import { createExtrinsicBuilder } from '../../extrinsic';
import { createWithdrawBuilder } from '../../withdraw';
import { MoonbaseAssets } from './moonbase.interfaces';

export { assets, chains };

export const moonbase = MOON_CHAINS_CONFIGS[MoonChain.MoonbaseAlpha];
export const balance = createBalanceBuilder<MoonbaseAssets>();
export const extrinsic = createExtrinsicBuilder<MoonbaseAssets>(moonbase);
export const withdraw = createWithdrawBuilder<MoonbaseAssets>();
