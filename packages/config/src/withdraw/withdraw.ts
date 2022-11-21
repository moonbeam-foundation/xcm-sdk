import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import { AssetSymbol } from '../constants';
import {
  WithdrawXTokensConfig,
  WithdrawXTokensOptions,
} from './withdraw.interfaces';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function createWithdrawBuilder<
  Symbols extends AssetSymbol = AssetSymbol,
>() {
  return {
    xTokens: (options: WithdrawXTokensOptions<Symbols>) =>
      xTokens<Symbols>(options),
  };
}

function xTokens<Symbols extends AssetSymbol = AssetSymbol>({
  balance,
  destination,
  feePerWeight,
  sourceMinBalance,
  xcmFeeAsset,
  weight = 4_000_000_000,
}: WithdrawXTokensOptions<Symbols>): WithdrawXTokensConfig<Symbols> {
  return {
    balance,
    destination,
    feePerWeight,
    sourceMinBalance,
    xcmFeeAsset,
    weight,
    getParams: (account: string) => {
      const { parachainId } = destination;
      const acc = `0x01${u8aToHex(decodeAddress(account), -1, false)}00`;

      return [
        1,
        parachainId ? [`0x0000000${parachainId.toString(16)}`, acc] : [acc],
      ];
    },
  };
}
