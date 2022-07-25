import { Assets } from '../../../constants';
import { MoonriverAssets } from '../../../interfaces';
import { ChainXcmConfigs } from '../../config.interfaces';

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

export const MOONRIVER_CONFIGS: ChainXcmConfigs<MoonriverAssets> = {
  [Assets.AUSD]: AUSD,
  [Assets.BNC]: BNC,
  [Assets.CRAB]: CRAB,
  [Assets.CSM]: CSM,
  [Assets.HKO]: HKO,
  [Assets.KAR]: KAR,
  [Assets.KBTC]: KBTC,
  [Assets.KINT]: KINT,
  [Assets.KMA]: KMA,
  [Assets.KSM]: KSM,
  [Assets.MOVR]: MOVR,
  [Assets.PHA]: PHA,
  [Assets.RMRK]: RMRK,
  [Assets.SDN]: SDN,
  [Assets.TEER]: TEER,
  [Assets.USDT]: USDT,
};
