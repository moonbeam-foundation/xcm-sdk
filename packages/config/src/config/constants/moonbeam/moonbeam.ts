import {
  Assets,
  Chain,
  MOONBEAM_ASSETS_CONFIGS as assets,
  MOONBEAM_CHINS_CONFIGS as chains,
  MoonChain,
  MOON_CHINS_CONFIGS,
} from '../../../constants';
import { MoonbeamAssets } from '../../../interfaces';
import { ChainXcmConfigs } from '../../config.interfaces';
import { ACA } from './assets/aca';
import { AUSD } from './assets/ausd';
import { DOT } from './assets/dot';

const config = MOON_CHINS_CONFIGS[MoonChain.Moonbeam];

export const MOONBEAM_CONFIGS: ChainXcmConfigs<MoonbeamAssets> = {
  [Assets.ACA]: ACA,
  [Assets.AUSD]: AUSD,
  [Assets.DOT]: DOT,
  [Assets.GLMR]: {
    asset: assets[Assets.GLMR],
    origin: config,
    deposit: [],
    withdraw: [],
  },
  [Assets.PARA]: {
    asset: assets[Assets.PARA],
    origin: chains[Chain.Parallel],
    deposit: [],
    withdraw: [],
  },
};
