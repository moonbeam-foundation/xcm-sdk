import { Asset } from '../../constants';
import { MoonbeamXcmConfigs } from './moonbeam.interfaces';

import { ACA } from './assets/aca';
import { AUSD } from './assets/ausd';
import { DOT } from './assets/dot';
import { GLMR } from './assets/glmr';
import { IBTC } from './assets/ibtc';
import { INTR } from './assets/intr';
import { PARA } from './assets/para';
import { PHA } from './assets/pha';

export const MOONBEAM_CONFIGS: MoonbeamXcmConfigs = <const>{
  [Asset.ACA]: ACA,
  [Asset.AUSD]: AUSD,
  [Asset.DOT]: DOT,
  [Asset.GLMR]: GLMR,
  [Asset.IBTC]: IBTC,
  [Asset.INTR]: INTR,
  [Asset.PARA]: PARA,
  [Asset.PHA]: PHA,
};
