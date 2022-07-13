import { Assets, DOT, ACA, AUSD, PARA } from './assets.moonbeam';
import { XcmConfigs } from '../interfaces/xcm-config.interfaces';
import { dotConfig } from './assets/dot.moonbeam';
import { acaConfig } from './assets/aca.moonbeam';
import { ausdConfig } from './assets/ausd.moonbeam';
import { paraConfig } from './assets/para.moonbeam';
export { nativeTokenXcmConfigMoonbeam } from './native-token.moonbeam';

export const xcmConfigMoonbeam: XcmConfigs<Assets> = {
  [DOT.id]: dotConfig,
  [ACA.id]: acaConfig,
  [AUSD.id]: ausdConfig,
  [PARA.id]: paraConfig,
};
