import { AssetSymbol } from '../../constants';
import { MoonbaseXcmConfigs } from './moonbase.interfaces';

import { AUQ } from './assets/auq';
import { BIT } from './assets/bit';
import { DEV } from './assets/dev';
import { EQ } from './assets/eq';
import { EQD } from './assets/eqd';
import { LIT } from './assets/lit';
import { NEER } from './assets/neer';
import { PARING } from './assets/paring';
import { TT1 } from './assets/tt1';
import { UNIT } from './assets/unit';

export const MOONBASE_CONFIGS: MoonbaseXcmConfigs = {
  [AssetSymbol.AUQ]: AUQ,
  [AssetSymbol.BIT]: BIT,
  [AssetSymbol.DEV]: DEV,
  [AssetSymbol.EQ]: EQ,
  [AssetSymbol.EQD]: EQD,
  [AssetSymbol.LIT]: LIT,
  [AssetSymbol.NEER]: NEER,
  [AssetSymbol.PARING]: PARING,
  [AssetSymbol.TT1]: TT1,
  [AssetSymbol.UNIT]: UNIT,
};
