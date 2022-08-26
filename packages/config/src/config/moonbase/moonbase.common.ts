import { createBalanceBuilder } from '../../balance';
import { MoonChainKey, MOON_CHAINS } from '../../constants';
import { createExtrinsicBuilder } from '../../extrinsic';
import { createWithdrawBuilder } from '../../withdraw';
import { MOONBASE_ASSETS_CONFIGS as assets } from './moonbase.assets';
import { MOONBASE_CHAINS_CONFIGS as chains } from './moonbase.chains';
import { MoonbaseAssets } from './moonbase.interfaces';

export { assets, chains };

export const moonbase = MOON_CHAINS[MoonChainKey.MoonbaseAlpha];
export const balance = createBalanceBuilder<MoonbaseAssets>();
export const extrinsic = createExtrinsicBuilder<MoonbaseAssets>(moonbase);
export const withdraw = createWithdrawBuilder<MoonbaseAssets>();
