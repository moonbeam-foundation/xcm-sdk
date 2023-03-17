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
    getParams: (account: string, usesEthereumAccounts = false) => {
      const { parachainId } = destination;
      // 01: AccountId32
      // 03: AccountKey20
      // https://docs.moonbeam.network/builders/interoperability/xcm/xc20/xtokens/#building-the-precompile-multilocation
      const accountType = usesEthereumAccounts ? '03' : '01';

      const acc = `0x${accountType}${u8aToHex(
        decodeAddress(account),
        -1,
        false,
      )}00`;

      return [
        1,
        parachainId ? [`0x0000000${parachainId.toString(16)}`, acc] : [acc],
      ];
    },
  };
}
