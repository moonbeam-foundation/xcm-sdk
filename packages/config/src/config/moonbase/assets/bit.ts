import { AssetSymbol, ChainKey } from '../../../constants';
import {
  XTokensExtrinsicCurrencyTypes,
  XTokensExtrinsicSuccessEvent,
} from '../../../extrinsic';
import { WithdrawConfig } from '../../../withdraw';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonbase.common';
import { MoonbaseXcmConfig } from '../moonbase.interfaces';
import { NEER } from './neer';

const asset = assets[AssetSymbol.BIT];
const feeAsset = assets[AssetSymbol.NEER];
const origin = chains[ChainKey.BitCountryPioneer];
const neerWithdrawConfig = NEER.withdraw[
  origin.key
] as WithdrawConfig<AssetSymbol.NEER>;

export const BIT: MoonbaseXcmConfig = {
  asset,
  origin,
  deposit: {
    [origin.key]: {
      source: origin,
      balance: balance.tokens().miningResource(0),
      sourceFeeBalance: balance.system(),
      xcmFeeAsset: {
        asset: feeAsset,
        balance: balance.system(),
      },
      extrinsic: extrinsic
        .xTokens()
        .transferMultiCurrencies()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(origin)
        .assets(
          {
            [XTokensExtrinsicCurrencyTypes.MiningResource]: 0,
          },
          {
            [XTokensExtrinsicCurrencyTypes.NativeToken]: 0,
          },
        ),
    },
  },
  withdraw: {
    [origin.key]: withdraw.xTokens({
      balance: balance.tokens().miningResource(0),
      destination: origin,
      feePerWeight: neerWithdrawConfig.feePerWeight,
      weight: neerWithdrawConfig.weight,
      xcmFeeAsset: feeAsset,
    }),
  },
};
