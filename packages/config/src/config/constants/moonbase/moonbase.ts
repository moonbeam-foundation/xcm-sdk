import { Asset } from '../../../constants';
import { MoonbaseAssets, MoonbaseChains } from '../../../interfaces';
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

export const MOONBASE_CONFIGS: ChainXcmConfigs<MoonbaseAssets, MoonbaseChains> =
  <const>{
    [Asset.ASTR]: ASTR,
    [Asset.BNC]: BNC,
    [Asset.BSX]: BSX,
    [Asset.CRU]: CRU,
    [Asset.DEV]: DEV,
    [Asset.HKO]: HKO,
    [Asset.KAR]: KAR,
    [Asset.KBTC]: KBTC,
    [Asset.KINT]: KINT,
    [Asset.KMA]: KMA,
    [Asset.KUSD]: KUSD,
    [Asset.LIT]: LIT,
    [Asset.PARING]: PARING,
    [Asset.PHA]: PHA,
    [Asset.TEER]: TEER,
    [Asset.UNIT]: UNIT,
  };
