import { Asset } from '../../../constants';
import { MoonbeamAssets, MoonbeamChains } from '../../../interfaces';
import { ChainXcmConfigs } from '../../config.interfaces';

import { ACA } from './assets/aca';
import { AUSD } from './assets/ausd';
import { DOT } from './assets/dot';
import { GLMR } from './assets/glmr';
import { PARA } from './assets/para';

export const MOONBEAM_CONFIGS: ChainXcmConfigs<MoonbeamAssets, MoonbeamChains> =
  <const>{
    [Asset.ACA]: ACA,
    [Asset.AUSD]: AUSD,
    [Asset.DOT]: DOT,
    [Asset.GLMR]: GLMR,
    [Asset.PARA]: PARA,
  };
