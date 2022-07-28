import { ChainXcmConfigs, XcmConfig } from '../config.interfaces';
// eslint-disable-next-line import/no-cycle
import { MOONBEAM_ASSETS } from './moonbeam.assets';
// eslint-disable-next-line import/no-cycle
import { MOONBEAM_CHAINS } from './moonbeam.chains';

export type MoonbeamAssets = typeof MOONBEAM_ASSETS[number];
export type MoonbeamChains = typeof MOONBEAM_CHAINS[number];

export type MoonbeamXcmConfig = XcmConfig<MoonbeamAssets, MoonbeamChains>;
export type MoonbeamXcmConfigs = ChainXcmConfigs<
  MoonbeamAssets,
  MoonbeamChains
>;
