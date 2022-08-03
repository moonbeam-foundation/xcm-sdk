import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import { Asset } from '../constants';
import {
  WithdrawXTokensConfig,
  WithdrawXTokensOptions,
} from './withdraw.interfaces';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function createWithdrawBuilder<Assets extends Asset>() {
  return {
    xTokens: (options: WithdrawXTokensOptions<Assets>) =>
      xTokens<Assets>(options),
  };
}

function xTokens<Assets extends Asset>({
  balance,
  destination,
  feePerWeight,
  weight = 4_000_000_000,
}: WithdrawXTokensOptions<Assets>): WithdrawXTokensConfig<Assets> {
  return {
    balance,
    destination,
    feePerWeight,
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
