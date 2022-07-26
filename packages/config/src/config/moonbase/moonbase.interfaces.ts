import { MoonbaseAssets, MoonbaseChains } from '../../interfaces';
import { ChainXcmConfigs, XcmConfig } from '../config.interfaces';

export type MoonbaseXcmConfig = XcmConfig<MoonbaseAssets, MoonbaseChains>;
export type MoonbaseXcmConfigs = ChainXcmConfigs<
  MoonbaseAssets,
  MoonbaseChains
>;
