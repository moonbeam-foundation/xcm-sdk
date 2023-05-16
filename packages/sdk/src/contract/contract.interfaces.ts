import type { TransactionResponse } from '@ethersproject/abstract-provider';
import { ContractConfig } from '@moonbeam-network/xcm-builder';

export interface ContractInterface {
  readonly address: string;
  transfer(config: ContractConfig): Promise<TransactionResponse>;
  getFee(config: ContractConfig): Promise<bigint>;
}
