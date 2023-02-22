import { AssetSymbol, ChainKey } from '../../../constants';
import { PolkadotXcmExtrinsicSuccessEvent } from '../../../extrinsic';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonbase.common';
import { MoonbaseXcmConfig } from '../moonbase.interfaces';

const asset = assets[AssetSymbol.UNIT];
const origin = chains[ChainKey.AlphanetRelay];

export const UNIT: MoonbaseXcmConfig = {
  asset,
  origin,
  deposit: {
    [origin.key]: {
      source: origin,
      balance: balance.system(),
      extrinsic: extrinsic
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
        .origin(origin)
        .V2()
        .here(),
    },
  },
  withdraw: {
    [origin.key]: withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      feePerWeight: 12.65,
    }),
  },
};
