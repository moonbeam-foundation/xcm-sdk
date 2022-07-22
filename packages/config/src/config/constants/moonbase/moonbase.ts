import { Assets } from '../../../constants';
import { MoonbaseAssets } from '../../../interfaces';
import { ChainXcmConfigs } from '../../config.interfaces';

import { ASTR } from './assets/astr';
import { BNC } from './assets/bnc';
import { BSX } from './assets/bsx';
import { CRU } from './assets/cru';
import { DEV } from './assets/dev';
import { HKO } from './assets/hko';
import { KAR } from './assets/kar';
import { KBTC } from './assets/kbtc';
import { KINT } from './assets/kint';
import { KMA } from './assets/kma';
import { KUSD } from './assets/kusd';
import { LIT } from './assets/lit';
import { PARING } from './assets/paring';
import { PHA } from './assets/pha';
import { TEER } from './assets/teer';
import { UNIT } from './assets/unit';

export const MOONBASE_CONFIGS: ChainXcmConfigs<MoonbaseAssets> = {
  [Assets.ASTR]: ASTR,
  [Assets.BNC]: BNC,
  [Assets.BSX]: BSX,
  [Assets.CRU]: CRU,
  [Assets.DEV]: DEV,
  [Assets.HKO]: HKO,
  [Assets.KAR]: KAR,
  [Assets.KBTC]: KBTC,
  [Assets.KINT]: KINT,
  [Assets.KMA]: KMA,
  [Assets.KUSD]: KUSD,
  [Assets.LIT]: LIT,
  [Assets.PARING]: PARING,
  [Assets.PHA]: PHA,
  [Assets.TEER]: TEER,
  [Assets.UNIT]: UNIT,
};
