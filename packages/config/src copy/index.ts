import { Network } from './network';
import {
  xcmConfigMoonbase,
  nativeTokenXcmConfigMoonbase,
} from './moonbase-alpha/xcm.moonbase';
import {
  xcmConfigMoonbeam,
  nativeTokenXcmConfigMoonbeam,
} from './moonbeam/xcm.moonbeam';
import {
  xcmConfigMoonriver,
  nativeTokenXcmConfigMoonriver,
} from './moonriver/xcm.moonriver';

export const nativeTokenConfigByNetwork = {
  [Network.moonbase_alpha]: nativeTokenXcmConfigMoonbase,
  [Network.moonbeam]: nativeTokenXcmConfigMoonbeam,
  [Network.moonriver]: nativeTokenXcmConfigMoonriver,
};

export const xcmConfigByNetwork = {
  [Network.moonbase_alpha]: xcmConfigMoonbase,
  [Network.moonbeam]: xcmConfigMoonbeam,
  [Network.moonriver]: xcmConfigMoonriver,
};
