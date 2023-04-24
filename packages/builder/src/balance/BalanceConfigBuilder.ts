/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { PalletBalancesAccountData } from '@polkadot/types/lookup';
import { BalanceConfig } from './BalanceConfig';
import {
  BalanceConfigBuilder,
  BalanceConfigBuilderPrams,
  PalletBalancesAccountDataOld,
} from './BalanceConfigBuilder.interfaces';

export function BalanceBuilder() {
  return {
    system,
  };
}

export function system() {
  return {
    account: (): BalanceConfigBuilder => ({
      build: ({ account }: BalanceConfigBuilderPrams): BalanceConfig =>
        new BalanceConfig({
          pallet: 'system',
          method: 'account',
          args: [account],
          transform: (response: any): bigint => {
            const balance = response.data as PalletBalancesAccountData &
              PalletBalancesAccountDataOld;
            const frozen = balance.miscFrozen ?? balance.frozen ?? 0n;

            return BigInt(balance.free.sub(frozen).toString());
          },
        }),
    }),
  };
}
