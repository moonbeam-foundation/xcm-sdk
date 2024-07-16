import { ChainAssetId } from '@moonbeam-network/xcm-types';
import { Struct, u128 } from '@polkadot/types';
import { ContractConfig } from '../contract';
import { SubstrateQueryConfig } from '../types/substrate/SubstrateQueryConfig';

export interface BalanceConfigBuilder {
  build: (
    params: BalanceConfigBuilderPrams,
  ) => SubstrateQueryConfig | ContractConfig;
}

export interface BalanceConfigBuilderPrams {
  address: string;
  asset: ChainAssetId;
  contractAddress?: string;
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
