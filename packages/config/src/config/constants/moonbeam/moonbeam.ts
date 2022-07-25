import { Asset } from '../../../constants';
import { MoonbeamAssets } from '../../../interfaces';
import { ChainXcmConfigs } from '../../config.interfaces';

import { ACA } from './assets/aca';
import { AUSD } from './assets/ausd';
import { DOT } from './assets/dot';
import { GLMR } from './assets/glmr';
import { PARA } from './assets/para';

export const MOONBEAM_CONFIGS: ChainXcmConfigs<MoonbeamAssets> = {
  [Asset.ACA]: ACA,
  [Asset.AUSD]: AUSD,
  [Asset.DOT]: DOT,
  [Asset.GLMR]: GLMR,
  [Asset.PARA]: PARA,
};
