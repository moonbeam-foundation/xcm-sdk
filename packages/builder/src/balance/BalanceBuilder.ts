import type { Option } from '@polkadot/types';
import type {
  FrameSystemAccountInfo,
  PalletAssetsAssetAccount,
  PalletBalancesAccountData,
} from '@polkadot/types/lookup';
import { evmToAddress } from '@polkadot/util-crypto';
import type { Address } from 'viem';
import { ContractConfig } from '../contract';
import { getExtrinsicAccount } from '../extrinsic/ExtrinsicBuilder.utils';
import { EvmQueryConfig } from '../types/evm/EvmQueryConfig';
import { SubstrateQueryConfig } from '../types/substrate/SubstrateQueryConfig';
import type {
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
    native,
  };
}

function erc20(): BalanceConfigBuilder {
  return {
    build: ({ asset, address }) => {
      if (!asset.address) {
        throw new Error(`Asset ${asset.key} has no address`);
      }

      return new ContractConfig({
        address: asset.address,
        abi: ERC20_ABI,
        args: [address],
        func: 'balanceOf',
        module: 'Erc20',
      });
    },
  };
}

function native(): BalanceConfigBuilder {
  return {
    build: ({ address }) => {
      return new EvmQueryConfig({
        func: 'getBalance',
        args: [{ address: address as Address }],
      });
    },
  };
}
export function substrate() {
  return {
    assets,
    foreignAssets,
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
          args: [asset.getBalanceAssetId(), address],
          transform: async (
            response: Option<PalletAssetsAssetAccount>,
          ): Promise<bigint> => response.unwrapOrDefault().balance.toBigInt(),
        }),
    }),
  };
}

function foreignAssets() {
  return {
    account: (): BalanceConfigBuilder => ({
      build: ({ address, asset }) => {
        if (!asset.address) {
          throw new Error(
            'Asset address is needed to calculate balance with foreignAssets.account function',
          );
        }

        const multilocation = {
          parents: 2,
          interior: {
            X2: [
              { GlobalConsensus: { ethereum: { chainId: 1 } } },
              getExtrinsicAccount(asset.address),
            ],
          },
        };

        return new SubstrateQueryConfig({
          module: 'foreignAssets',
          func: 'account',
          args: [multilocation, address],
          transform: async (
            response: Option<PalletAssetsAssetAccount>,
          ): Promise<bigint> => response.unwrapOrDefault().balance.toBigInt(),
        });
      },
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
          ): Promise<bigint> => calculateSystemAccountBalance(response),
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

            // biome-ignore lint/suspicious/noExplicitAny: not sure how to fix this
            if (Array.isArray((res as any)?.v0?.balance)) {
              // biome-ignore lint/suspicious/noExplicitAny: not sure how to fix this
              balances = (res as any).v0.balance;
            }

            if (!balances) {
              throw new Error("Can't get balance from Equilibrium chain");
            }

            const balance = balances.find(
              ([assetId]) => assetId === asset.getBalanceAssetId(),
            );

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
          ): Promise<bigint> => calculateSystemAccountBalance(response),
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
          args: [address, asset.getBalanceAssetId()],
          transform: async ({
            free,
            frozen,
          }: TokensPalletAccountData): Promise<bigint> =>
            BigInt(free.sub(frozen).toString()),
        }),
    }),
  };
}

export async function calculateSystemAccountBalance(
  response: FrameSystemAccountInfo,
): Promise<bigint> {
  const balance = response.data as PalletBalancesAccountData &
    PalletBalancesAccountDataOld;

  const free = BigInt(balance.free.toString());
  const frozen = balance.miscFrozen ?? balance.frozen;
  const frozenMinusReserved = BigInt(frozen.sub(balance.reserved).toString());
  const locked = frozenMinusReserved < 0n ? 0n : frozenMinusReserved;

  return free - locked;
}
