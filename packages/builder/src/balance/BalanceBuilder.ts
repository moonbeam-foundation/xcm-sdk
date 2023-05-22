/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { PalletBalancesAccountData } from '@polkadot/types/lookup';
import { SubstrateQueryConfig } from '../types/substrate/SubstrateQueryConfig';
import {
  BalanceConfigBuilder,
  EquilibriumSystemBalanceData,
  PalletBalancesAccountDataOld,
  TokensPalletAccountData,
} from './BalanceBuilder.interfaces';

export function BalanceBuilder() {
  return {
    assets,
    system,
    tokens,
  };
}

function assets() {
  return {
    account: (): BalanceConfigBuilder => ({
      build: ({ address, asset }) =>
        new SubstrateQueryConfig({
          module: 'assets',
          func: 'account',
          args: [asset, address],
          transform: async (response: any): Promise<bigint> =>
            response.toJSON().balance,
        }),
    }),
  };
}

function system() {
  return {
    account: (): BalanceConfigBuilder => ({
      build: ({ address }) =>
        new SubstrateQueryConfig({
          module: 'system',
          func: 'account',
          args: [address],
          transform: async (response: any): Promise<bigint> => {
            const balance = response.data as PalletBalancesAccountData &
              PalletBalancesAccountDataOld;
            const frozen = balance.miscFrozen ?? balance.frozen;

            return BigInt(balance.free.sub(frozen).toString());
          },
        }),
    }),
    accountEquilibrium: (): BalanceConfigBuilder => ({
      build: ({ address, asset }) =>
        new SubstrateQueryConfig({
          module: 'system',
          func: 'account',
          args: [address],
          transform: async (response): Promise<bigint> => {
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
    accounts: (): BalanceConfigBuilder => ({
      build: ({ address, asset }) =>
        new SubstrateQueryConfig({
          module: 'tokens',
          func: 'accounts',
          args: [address, asset],
          transform: async ({
            free,
            frozen,
          }: TokensPalletAccountData): Promise<bigint> =>
            BigInt(free.sub(frozen).toString()),
        }),
    }),
  };
}
