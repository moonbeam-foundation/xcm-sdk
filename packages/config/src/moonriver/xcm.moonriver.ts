import { XcmConfigs } from '../interfaces/xcm-config.interfaces';
import {
  Assets,
  BNC,
  KAR,
  KBTC,
  KINT,
  KSM,
  RMRK,
  AUSD,
  USDT,
  CSM,
  PHA,
  HKO,
  KMA,
  CRAB,
  TEER,
} from './assets.moonriver';

import { bncConfig } from './assets/bnc.moonriver';
import { karConfig } from './assets/kar.moonriver';
import { kbtcConfig } from './assets/kbtc.moonriver';
import { kintConfig } from './assets/kint.moonriver';
import { ksmConfig } from './assets/ksm.moonriver';
import { rmrkConfig } from './assets/rmrk.moonriver';
import { ausdConfig } from './assets/ausd.moonriver';
import { phaConfig } from './assets/pha.moonriver';
import { usdtConfig } from './assets/usdt.moonriver';
import { csmConfig } from './assets/csm.moonriver';
import { hkoConfig } from './assets/hko.moonriver';
import { kmaConfig } from './assets/kma.moonriver';
import { crabConfig } from './assets/crab.moonriver';
import { teerConfig } from './assets/teer.moonriver';

export { nativeTokenXcmConfigMoonriver } from './native-token.moonriver';

export const xcmConfigMoonriver: XcmConfigs<Assets> = {
  [KSM.id]: ksmConfig,
  [RMRK.id]: rmrkConfig,
  [KINT.id]: kintConfig,
  [KBTC.id]: kbtcConfig,
  [KAR.id]: karConfig,
  [BNC.id]: bncConfig,
  [AUSD.id]: ausdConfig,
  [USDT.id]: usdtConfig,
  [CSM.id]: csmConfig,
  [PHA.id]: phaConfig,
  [HKO.id]: hkoConfig,
  [KMA.id]: kmaConfig,
  [CRAB.id]: crabConfig,
  [TEER.id]: teerConfig,
};
