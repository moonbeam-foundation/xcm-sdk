import { AssetSymbol } from '../../constants';
import { MoonbaseXcmConfigs } from './moonbase.interfaces';

import { BIT } from './assets/bit';
import { CLV } from './assets/clv';
import { CRU } from './assets/cru';
import { DEV } from './assets/dev';
import { LIT } from './assets/lit';
import { NEER } from './assets/neer';
import { TT1 } from './assets/tt1';
import { UNIT } from './assets/unit';

export const MOONBASE_CONFIGS: MoonbaseXcmConfigs = {
  [AssetSymbol.BIT]: BIT,
  [AssetSymbol.CLV]: CLV,
  [AssetSymbol.CRU]: CRU,
  [AssetSymbol.DEV]: DEV,
  [AssetSymbol.LIT]: LIT,
  [AssetSymbol.NEER]: NEER,
  [AssetSymbol.TT1]: TT1,
  [AssetSymbol.UNIT]: UNIT,
};
