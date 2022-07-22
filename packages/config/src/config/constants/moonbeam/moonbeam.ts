import { Assets } from '../../../constants';
import { MoonbeamAssets } from '../../../interfaces';
import { ChainXcmConfigs } from '../../config.interfaces';

import { ACA } from './assets/aca';
import { AUSD } from './assets/ausd';
import { DOT } from './assets/dot';
import { GLMR } from './assets/glmr';
import { PARA } from './assets/para';

export const MOONBEAM_CONFIGS: ChainXcmConfigs<MoonbeamAssets> = {
  [Assets.ACA]: ACA,
  [Assets.AUSD]: AUSD,
  [Assets.DOT]: DOT,
  [Assets.GLMR]: GLMR,
  [Assets.PARA]: PARA,
};
