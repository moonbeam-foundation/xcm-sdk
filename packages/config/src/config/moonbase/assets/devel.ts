import { AssetSymbol, ChainKey } from '../../../constants';
import { assets, balance, chains } from '../moonbase.common';
import { MoonbaseXcmConfig } from '../moonbase.interfaces';

const asset = assets[AssetSymbol.DEVEL];
const centrifuge = chains[ChainKey.CentrifugeAlphanet];

export const DEVEL: MoonbaseXcmConfig = {
  asset,
  origin: centrifuge,
  deposit: {
    [centrifuge.key]: {
      origin: centrifuge,
      balance: balance.system(),
    },
  },
  withdraw: {},
};
