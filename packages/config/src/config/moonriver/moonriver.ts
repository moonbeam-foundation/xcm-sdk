import { Asset } from '../../constants';
import { MoonriverXcmConfigs } from './moonriver.interfaces';

import { AUSD } from './assets/ausd';
import { BNC } from './assets/bnc';
import { CRAB } from './assets/crab';
import { CSM } from './assets/csm';
import { HKO } from './assets/hko';
import { KAR } from './assets/kar';
import { KBTC } from './assets/kbtc';
import { KINT } from './assets/kint';
import { KMA } from './assets/kma';
import { KSM } from './assets/ksm';
import { MOVR } from './assets/movr';
import { PHA } from './assets/pha';
import { RMRK } from './assets/rmrk';
import { SDN } from './assets/sdn';
import { TEER } from './assets/teer';
import { USDT } from './assets/usdt';

export const MOONRIVER_CONFIGS: MoonriverXcmConfigs = <const>{
  [Asset.AUSD]: AUSD,
  [Asset.BNC]: BNC,
  [Asset.CRAB]: CRAB,
  [Asset.CSM]: CSM,
  [Asset.HKO]: HKO,
  [Asset.KAR]: KAR,
  [Asset.KBTC]: KBTC,
  [Asset.KINT]: KINT,
  [Asset.KMA]: KMA,
  [Asset.KSM]: KSM,
  [Asset.MOVR]: MOVR,
  [Asset.PHA]: PHA,
  [Asset.RMRK]: RMRK,
  [Asset.SDN]: SDN,
  [Asset.TEER]: TEER,
  [Asset.USDT]: USDT,
};
