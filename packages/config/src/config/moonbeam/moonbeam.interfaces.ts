import { MoonbeamAssets, MoonbeamChains } from '../../interfaces';
import { ChainXcmConfigs, XcmConfig } from '../config.interfaces';

export type MoonbeamXcmConfig = XcmConfig<MoonbeamAssets, MoonbeamChains>;
export type MoonbeamXcmConfigs = ChainXcmConfigs<
  MoonbeamAssets,
  MoonbeamChains
>;
