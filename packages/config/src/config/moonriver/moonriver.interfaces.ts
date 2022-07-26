import { MoonriverAssets, MoonriverChains } from '../../interfaces';
import { ChainXcmConfigs, XcmConfig } from '../config.interfaces';

export type MoonriverXcmConfig = XcmConfig<MoonriverAssets, MoonriverChains>;
export type MoonriverXcmConfigs = ChainXcmConfigs<
  MoonriverAssets,
  MoonriverChains
>;
