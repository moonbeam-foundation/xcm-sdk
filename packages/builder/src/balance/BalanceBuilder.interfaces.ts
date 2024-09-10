import type { Struct, u128 } from '@polkadot/types';
import type { ChainAsset } from '@moonbeam-network/xcm-types';
import type { ContractConfig } from '../contract';
import type { SubstrateQueryConfig } from '../types/substrate/SubstrateQueryConfig';
import type { ConfigBuilder } from '../builder.interfaces';

export type BalanceConfigBuilder = ConfigBuilder<
  ContractConfig | SubstrateQueryConfig,
  BalanceBuilderPrams
>;

export interface BalanceBuilderPrams {
  address: string;
  asset: ChainAsset;
}

export interface PalletBalancesAccountDataOld extends Struct {
  readonly free: u128;
  readonly reserved: u128;
  readonly miscFrozen: u128;
  readonly feeFrozen: u128;
}

export interface TokensPalletAccountData {
  free: u128;
  reserved: u128;
  frozen: u128;
}

export type EquilibriumSystemBalanceData = Array<
  [number, { positive: number }]
>;
