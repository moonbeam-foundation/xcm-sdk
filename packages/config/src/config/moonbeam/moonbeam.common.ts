import { createBalanceBuilder } from '../../balance';
import { MoonChainKey, MOON_CHAINS } from '../../constants';
import { createExtrinsicBuilder } from '../../extrinsic';
import { createWithdrawBuilder } from '../../withdraw';
import { MOONBEAM_ASSETS_MAP as assets } from './moonbeam.assets';
import { MOONBEAM_CHAINS_MAP as chains } from './moonbeam.chains';
import { MoonbeamAssets, MoonbeamChains } from './moonbeam.interfaces';

export { assets, chains };

export const moonbeam = MOON_CHAINS[MoonChainKey.Moonbeam];
export const balance = createBalanceBuilder<MoonbeamAssets>();
export const extrinsic = createExtrinsicBuilder<MoonbeamAssets, MoonbeamChains>(
  moonbeam,
);
export const withdraw = createWithdrawBuilder<MoonbeamAssets>();
