import { ChainXcmConfigs, XcmConfig } from '../config.interfaces';
import { MOONBASE_ASSETS } from './moonbase.assets';
import { MOONBASE_CHAINS } from './moonbase.chains';

export type MoonbaseAssets = typeof MOONBASE_ASSETS[number];
export type MoonbaseChains = typeof MOONBASE_CHAINS[number];

export type MoonbaseXcmConfig = XcmConfig<MoonbaseAssets, MoonbaseChains>;
export type MoonbaseXcmConfigs = ChainXcmConfigs<
  MoonbaseAssets,
  MoonbaseChains
>;
