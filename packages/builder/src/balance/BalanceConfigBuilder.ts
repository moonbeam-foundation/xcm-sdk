/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { u128 } from '@polkadot/types';
import { PalletBalancesAccountData } from '@polkadot/types/lookup';
import { BalanceConfig } from './BalanceConfig';
import {
  BalanceConfigBuilder,
  BalanceConfigBuilderPrams,
  EquilibriumSystemBalanceData,
  PalletBalancesAccountDataOld,
  TokensPalletAccountData,
} from './BalanceConfigBuilder.interfaces';

export function BalanceBuilder() {
  return {
    assets,
    ormlTokens,
    system,
  };
}

export function assets() {
  return {
    account: (): BalanceConfigBuilder => ({
      build: ({ account, asset }: BalanceConfigBuilderPrams): BalanceConfig =>
        new BalanceConfig({
          pallet: 'assets',
          method: 'account',
          args: [asset, account],
          transform: (response: any): bigint =>
            (response.balance as u128).toBigInt(),
        }),
    }),
  };
}

export function ormlTokens() {
  return {
    accounts: (): BalanceConfigBuilder => ({
      build: ({ account, asset }: BalanceConfigBuilderPrams): BalanceConfig =>
        new BalanceConfig({
          pallet: 'ormlTokens',
          method: 'accounts',
          args: [account, { ForeignAsset: asset }],
          transform: ({ free, frozen }: TokensPalletAccountData): bigint =>
            BigInt(free.sub(frozen).toString()),
        }),
    }),
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
    accountEquilibrium: (): BalanceConfigBuilder => ({
      build: ({ account, asset }: BalanceConfigBuilderPrams): BalanceConfig =>
        new BalanceConfig({
          pallet: 'system',
          method: 'account',
          args: [account],
          transform: (response: any): bigint => {
            if (response.data.isEmpty) {
              return 0n;
            }

            const balances =
              response.data.toJSON() as any as EquilibriumSystemBalanceData;
            const balance = balances.find(([assetId]) => assetId === asset);

            if (!balance) {
              return 0n;
            }

            return BigInt(balance[1].positive);
          },
        }),
    }),
  };
}
