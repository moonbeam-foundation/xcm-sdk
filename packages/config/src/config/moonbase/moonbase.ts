import { AssetSymbol } from '../../constants';
import { MoonbaseXcmConfigs } from './moonbase.interfaces';

import { DEV } from './assets/dev';
import { LIT } from './assets/lit';
import { TT1 } from './assets/tt1';
import { UNIT } from './assets/unit';

export const MOONBASE_CONFIGS: MoonbaseXcmConfigs = {
  [AssetSymbol.DEV]: DEV,
  [AssetSymbol.LIT]: LIT,
  [AssetSymbol.TT1]: TT1,
  [AssetSymbol.UNIT]: UNIT,
};
