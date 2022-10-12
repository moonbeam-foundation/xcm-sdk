import { AssetSymbol } from '../../constants';
import { MoonbaseXcmConfigs } from './moonbase.interfaces';

import { CLV } from './assets/clv';
import { CRU } from './assets/cru';
import { DEV } from './assets/dev';
import { LIT } from './assets/lit';
import { TT1 } from './assets/tt1';
import { UNIT } from './assets/unit';
import { XUSDC } from './assets/xusdc';

export const MOONBASE_CONFIGS: MoonbaseXcmConfigs = {
  [AssetSymbol.CLV]: CLV,
  [AssetSymbol.CRU]: CRU,
  [AssetSymbol.DEV]: DEV,
  [AssetSymbol.LIT]: LIT,
  [AssetSymbol.TT1]: TT1,
  [AssetSymbol.UNIT]: UNIT,
  [AssetSymbol.XUSDC]: XUSDC,
};
