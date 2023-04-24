import { Struct, u128 } from '@polkadot/types';
import { BalanceConfig } from './BalanceConfig';

export interface BalanceConfigBuilder {
  build: (params: BalanceConfigBuilderPrams) => BalanceConfig;
}

export interface BalanceConfigBuilderPrams {
  account: string;
  asset?: string | number | bigint;
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
