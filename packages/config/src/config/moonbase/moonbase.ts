import { AssetSymbol } from '../../constants';
import { MoonbaseXcmConfigs } from './moonbase.interfaces';

import { ASTR } from './assets/astr';
import { BSX } from './assets/bsx';
import { CLV } from './assets/clv';
import { CRU } from './assets/cru';
import { DEV } from './assets/dev';
import { KBTC } from './assets/kbtc';
import { KINT } from './assets/kint';
import { LIT } from './assets/lit';
import { PARING } from './assets/paring';
import { TEER } from './assets/teer';
import { TT1 } from './assets/tt1';
import { UNIT } from './assets/unit';

export const MOONBASE_CONFIGS: MoonbaseXcmConfigs = {
  [AssetSymbol.ASTR]: ASTR,
  [AssetSymbol.BSX]: BSX,
  [AssetSymbol.CLV]: CLV,
  [AssetSymbol.CRU]: CRU,
  [AssetSymbol.DEV]: DEV,
  [AssetSymbol.KBTC]: KBTC,
  [AssetSymbol.KINT]: KINT,
  [AssetSymbol.LIT]: LIT,
  [AssetSymbol.PARING]: PARING,
  [AssetSymbol.TEER]: TEER,
  [AssetSymbol.TT1]: TT1,
  [AssetSymbol.UNIT]: UNIT,
};
