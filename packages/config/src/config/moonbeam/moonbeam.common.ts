import { createBalanceBuilder } from '../../balance';
import { MoonChain, MOON_CHAINS_CONFIGS } from '../../constants';
import { MOONBEAM_ASSETS_CONFIGS as assets } from './moonbeam.assets';
import { MOONBEAM_CHAINS_CONFIGS as chains } from './moonbeam.chains';
import { createExtrinsicBuilder } from '../../extrinsic';
import { createWithdrawBuilder } from '../../withdraw';
import { MoonbeamAssets } from './moonbeam.interfaces';

export { assets, chains };

export const moonbeam = MOON_CHAINS_CONFIGS[MoonChain.Moonbeam];
export const balance = createBalanceBuilder<MoonbeamAssets>();
export const extrinsic = createExtrinsicBuilder<MoonbeamAssets>(moonbeam);
export const withdraw = createWithdrawBuilder<MoonbeamAssets>();
