import { Asset } from '../../constants';
import { MoonbaseXcmConfigs } from './moonbase.interfaces';

import { ASTR } from './assets/astr';
import { BSX } from './assets/bsx';
import { CRU } from './assets/cru';
import { DEV } from './assets/dev';
import { KBTC } from './assets/kbtc';
import { KINT } from './assets/kint';
import { LIT } from './assets/lit';
import { PARING } from './assets/paring';
import { TEER } from './assets/teer';
import { UNIT } from './assets/unit';

export const MOONBASE_CONFIGS: MoonbaseXcmConfigs = <const>{
  [Asset.ASTR]: ASTR,
  [Asset.BSX]: BSX,
  [Asset.CRU]: CRU,
  [Asset.DEV]: DEV,
  [Asset.KBTC]: KBTC,
  [Asset.KINT]: KINT,
  [Asset.LIT]: LIT,
  [Asset.PARING]: PARING,
  [Asset.TEER]: TEER,
  [Asset.UNIT]: UNIT,
};
