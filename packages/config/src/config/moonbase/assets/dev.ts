import { AssetSymbol } from '../../../constants';
import { assets, moonbase } from '../moonbase.common';
import { MoonbaseXcmConfig } from '../moonbase.interfaces';

const asset = assets[AssetSymbol.DEV];

export const DEV: MoonbaseXcmConfig = {
  asset,
  origin: moonbase,
  deposit: {},
  withdraw: {},
};
