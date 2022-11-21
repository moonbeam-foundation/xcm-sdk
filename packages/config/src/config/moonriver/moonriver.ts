import { AssetSymbol } from '../../constants';
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
import { LIT } from './assets/lit';
import { MOVR } from './assets/movr';
import { PHA } from './assets/pha';
import { RMRK } from './assets/rmrk';
import { SDN } from './assets/sdn';
import { TEER } from './assets/teer';
import { USDT } from './assets/usdt';
import { XRT } from './assets/xrt';

export const MOONRIVER_CONFIGS: MoonriverXcmConfigs = {
  [AssetSymbol.AUSD]: AUSD,
  [AssetSymbol.BNC]: BNC,
  [AssetSymbol.CRAB]: CRAB,
  [AssetSymbol.CSM]: CSM,
  [AssetSymbol.HKO]: HKO,
  [AssetSymbol.KAR]: KAR,
  [AssetSymbol.KBTC]: KBTC,
  [AssetSymbol.KINT]: KINT,
  [AssetSymbol.KMA]: KMA,
  [AssetSymbol.KSM]: KSM,
  [AssetSymbol.LIT]: LIT,
  [AssetSymbol.MOVR]: MOVR,
  [AssetSymbol.PHA]: PHA,
  [AssetSymbol.RMRK]: RMRK,
  [AssetSymbol.SDN]: SDN,
  [AssetSymbol.TEER]: TEER,
  [AssetSymbol.USDT]: USDT,
  [AssetSymbol.XRT]: XRT,
};
