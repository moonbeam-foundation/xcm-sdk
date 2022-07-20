import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import {
  WithdrawXTokensOptions,
  WithdrawXTokensConfig,
} from './withdraw.interfaces';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function withdraw<Asset>() {
  return {
    xTokens: (options: WithdrawXTokensOptions<Asset>) =>
      xTokens<Asset>(options),
  };
}

function xTokens<Asset>({
  balance,
  destination,
  existentialDeposit = 0,
  feePerWeight,
  weight = 4_000_000_000,
}: WithdrawXTokensOptions<Asset>): WithdrawXTokensConfig<Asset> {
  return {
    balance,
    destination,
    existentialDeposit,
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
