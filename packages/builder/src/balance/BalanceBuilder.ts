/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { u128 } from '@polkadot/types';
import { PalletBalancesAccountData } from '@polkadot/types/lookup';
import { QueryConfig } from '../QueryConfig';
import {
  BalanceConfigBuilder,
  EquilibriumSystemBalanceData,
  PalletBalancesAccountDataOld,
  TokensPalletAccountData,
} from './BalanceBuilder.interfaces';

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
        new QueryConfig({
          pallet: 'assets',
          func: 'account',
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
        new QueryConfig({
          pallet: 'ormlTokens',
          func: 'accounts',
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
        new QueryConfig({
          pallet: 'system',
          func: 'account',
          args: [account],
          transform: (response: any): bigint => {
            const balance = response.data as PalletBalancesAccountData &
              PalletBalancesAccountDataOld;
            const frozen = balance.miscFrozen ?? balance.frozen;

            return BigInt(balance.free.sub(frozen).toString());
          },
        }),
    }),
    accountEquilibrium: (): BalanceConfigBuilder => ({
      build: ({ account, asset }) =>
        new QueryConfig({
          pallet: 'system',
          func: 'account',
          args: [account],
          transform: (response): bigint => {
            if (response.data.isEmpty) {
              return 0n;
            }

            const res = response.data.toJSON() as unknown;
            let balances: EquilibriumSystemBalanceData | undefined;

            if (Array.isArray(res)) {
              balances = res;
            }

            if (Array.isArray((res as any)?.v0?.balance)) {
              balances = (res as any).v0.balance;
            }

            if (!balances) {
              throw new Error("Can't get balance from Equilibrium chain");
            }

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
      const func = 'accounts';
      const transform = ({ free, frozen }: TokensPalletAccountData): bigint =>
        BigInt(free.sub(frozen).toString());

      return {
        foreignAsset: (): BalanceConfigBuilder => ({
          build: ({ account, asset }) =>
            new QueryConfig({
              pallet,
              func,
              args: [account, { ForeignAsset: asset }],
              transform,
            }),
        }),
        fungibleToken: (): BalanceConfigBuilder => ({
          build: ({ account, asset }) =>
            new QueryConfig({
              pallet,
              func,
              args: [account, { FungibleToken: asset }],
              transform,
            }),
        }),
        miningResource: (): BalanceConfigBuilder => ({
          build: ({ account, asset }) =>
            new QueryConfig({
              pallet,
              func,
              args: [account, { MiningResource: asset }],
              transform,
            }),
        }),
        token: (): BalanceConfigBuilder => ({
          build: ({ account, asset }) =>
            new QueryConfig({
              pallet,
              func,
              args: [account, { Token: asset }],
              transform,
            }),
        }),
        token2: (): BalanceConfigBuilder => ({
          build: ({ account, asset }) =>
            new QueryConfig({
              pallet,
              func,
              args: [account, { Token2: asset }],
              transform,
            }),
        }),
      };
    },
  };
}
