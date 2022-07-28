import { ChainXcmConfigs, XcmConfig } from '../config.interfaces';
// eslint-disable-next-line import/no-cycle
import { MOONRIVER_ASSETS } from './moonriver.assets';
// eslint-disable-next-line import/no-cycle
import { MOONRIVER_CHAINS } from './moonriver.chains';

export type MoonriverAssets = typeof MOONRIVER_ASSETS[number];
export type MoonriverChains = typeof MOONRIVER_CHAINS[number];

export type MoonriverXcmConfig = XcmConfig<MoonriverAssets, MoonriverChains>;
export type MoonriverXcmConfigs = ChainXcmConfigs<
  MoonriverAssets,
  MoonriverChains
>;
