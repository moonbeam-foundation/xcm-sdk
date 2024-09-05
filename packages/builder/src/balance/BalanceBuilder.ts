/* eslint-disable @typescript-eslint/no-use-before-define */

import { Option } from '@polkadot/types';
import {
  FrameSystemAccountInfo,
  PalletAssetsAssetAccount,
  PalletBalancesAccountData,
} from '@polkadot/types/lookup';
import { isString } from '@polkadot/util';
import { evmToAddress } from '@polkadot/util-crypto';
import { ContractConfig } from '../contract';
import { SubstrateQueryConfig } from '../types/substrate/SubstrateQueryConfig';
import {
  BalanceConfigBuilder,
  EquilibriumSystemBalanceData,
  PalletBalancesAccountDataOld,
  TokensPalletAccountData,
} from './BalanceBuilder.interfaces';
import { ERC20_ABI } from './Erc20Abi';

export function BalanceBuilder() {
  return {
    evm,
    substrate,
  };
}

export function evm() {
  return {
    erc20,
  };
}

function erc20(): BalanceConfigBuilder {
  return {
    build: ({ address, contractAddress }) => {
      if (!contractAddress || !isString(contractAddress)) {
        throw new Error(`Invalid contract address: ${contractAddress}`);
      }

      return new ContractConfig({
        address: contractAddress,
        abi: ERC20_ABI,
        args: [address],
        func: 'balanceOf',
        module: 'Erc20',
      });
    },
  };
}

export function substrate() {
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
          transform: async (
            response: Option<PalletAssetsAssetAccount>,
          ): Promise<bigint> => response.unwrapOrDefault().balance.toBigInt(),
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
          transform: async (
            response: FrameSystemAccountInfo,
          ): Promise<bigint> => {
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

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (Array.isArray((res as any)?.v0?.balance)) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    accountEvmTo32: (): BalanceConfigBuilder => ({
      build: ({ address }) => {
        const substrateAddress = evmToAddress(address);

        return new SubstrateQueryConfig({
          module: 'system',
          func: 'account',
          args: [substrateAddress],
          transform: async (
            response: FrameSystemAccountInfo,
          ): Promise<bigint> => {
            const balance = response.data as PalletBalancesAccountData &
              PalletBalancesAccountDataOld;
            const frozen = balance.miscFrozen ?? balance.frozen;

            return BigInt(balance.free.sub(frozen).toString());
          },
        });
      },
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
