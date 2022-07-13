import { XcmConfigs } from '../interfaces/xcm-config.interfaces';
import {
  UNIT,
  KAR,
  KINT,
  KBTC,
  CRU,
  BSX,
  KUSD,
  Assets,
  KMA,
  LIT,
  PARING,
  TEER,
  ASTR,
} from './assets.moonbase';
import { bsxConfig } from './assets/bsx.moonbase';
import { cruConfig } from './assets/cru.moonbase';
import { karConfig } from './assets/kar.moonbase';
import { kbtcConfig } from './assets/kbtc.moonbase';
import { kintConfig } from './assets/kint.moonbase';
import { kusdConfig } from './assets/kusd.moonbase';
import { kmaConfig } from './assets/kma.moonbase';
import { unitConfig } from './assets/unit.moonbase';
import { litConfig } from './assets/lit.moonbase';
import { paringConfig } from './assets/paring.moonbase';
import { teerConfig } from './assets/teer.moonbase';
import { astrConfig } from './assets/astr.moonbase';

export { nativeTokenXcmConfigMoonbase } from './native-token.moonbase';

export const xcmConfigMoonbase: XcmConfigs<Assets> = {
  [UNIT.id]: unitConfig,
  [KAR.id]: karConfig,
  [KINT.id]: kintConfig,
  [KBTC.id]: kbtcConfig,
  [CRU.id]: cruConfig,
  [BSX.id]: bsxConfig,
  [KUSD.id]: kusdConfig,
  [KMA.id]: kmaConfig,
  [LIT.id]: litConfig,
  [PARING.id]: paringConfig,
  [TEER.id]: teerConfig,
  [ASTR.id]: astrConfig,
};
