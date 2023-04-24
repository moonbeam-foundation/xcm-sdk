import { Struct, u128 } from '@polkadot/types';
import { BalanceConfig } from './BalanceConfig';

export interface BalanceConfigBuilder {
  build: (params: BalanceConfigBuilderPrams) => BalanceConfig;
}

export interface BalanceConfigBuilderPrams {
  account: string;
}

export interface PalletBalancesAccountDataOld extends Struct {
  readonly free: u128;
  readonly reserved: u128;
  readonly miscFrozen: u128;
  readonly feeFrozen: u128;
}
