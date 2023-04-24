/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { u128 } from '@polkadot/types';
import { PalletBalancesAccountData } from '@polkadot/types/lookup';
import { BalanceConfig } from './BalanceConfig';
import {
  BalanceConfigBuilder,
  EquilibriumSystemBalanceData,
  PalletBalancesAccountDataOld,
  TokensPalletAccountData,
} from './BalanceConfigBuilder.interfaces';

export function BalanceBuilder() {
  return {
    assets,
    ormlTokens,
    system,
    tokens,
  };
}

function assets() {
  return {
    account: (): BalanceConfigBuilder => ({
      build: ({ account, asset }) =>
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

function ormlTokens() {
  return {
    accounts: (): BalanceConfigBuilder => ({
      build: ({ account, asset }) =>
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

function system() {
  return {
    account: (): BalanceConfigBuilder => ({
      build: ({ account }) =>
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
      build: ({ account, asset }) =>
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

function tokens() {
  return {
    accounts: () => {
      const pallet = 'tokens';
      const method = 'accounts';
      const transform = ({ free, frozen }: TokensPalletAccountData): bigint =>
        BigInt(free.sub(frozen).toString());

      return {
        foreignAsset: (): BalanceConfigBuilder => ({
          build: ({ account, asset }) =>
            new BalanceConfig({
              pallet,
              method,
              args: [account, { ForeignAsset: asset }],
              transform,
            }),
        }),
        fungibleToken: (): BalanceConfigBuilder => ({
          build: ({ account, asset }) =>
            new BalanceConfig({
              pallet,
              method,
              args: [account, { FungibleToken: asset }],
              transform,
            }),
        }),
        miningResource: (): BalanceConfigBuilder => ({
          build: ({ account, asset }) =>
            new BalanceConfig({
              pallet,
              method,
              args: [account, { MiningResource: asset }],
              transform,
            }),
        }),
        token: (): BalanceConfigBuilder => ({
          build: ({ account, asset }) =>
            new BalanceConfig({
              pallet,
              method,
              args: [account, { Token: asset }],
              transform,
            }),
        }),
        token2: (): BalanceConfigBuilder => ({
          build: ({ account, asset }) =>
            new BalanceConfig({
              pallet,
              method,
              args: [account, { Token2: asset }],
              transform,
            }),
        }),
      };
    },
  };
}
