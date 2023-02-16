import { AssetSymbol } from '../../constants';
import { MoonbaseXcmConfigs } from './moonbase.interfaces';

import { AUQ } from './assets/auq';
import { BIT } from './assets/bit';
import { DEV } from './assets/dev';
import { LIT } from './assets/lit';
import { NEER } from './assets/neer';
import { TT1 } from './assets/tt1';
import { UNIT } from './assets/unit';

export const MOONBASE_CONFIGS: MoonbaseXcmConfigs = {
  [AssetSymbol.AUQ]: AUQ,
  [AssetSymbol.BIT]: BIT,
  [AssetSymbol.DEV]: DEV,
  [AssetSymbol.LIT]: LIT,
  [AssetSymbol.NEER]: NEER,
  [AssetSymbol.TT1]: TT1,
  [AssetSymbol.UNIT]: UNIT,
};
