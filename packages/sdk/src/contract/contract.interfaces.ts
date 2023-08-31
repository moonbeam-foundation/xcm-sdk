import type { TransactionResponse } from '@ethersproject/abstract-provider';
import { Contract, Signer } from 'ethers';
import { PublicClient, WalletClient, WriteContractReturnType } from 'viem';

export interface BaseContractInterface {
  readonly address: string;
}

export interface TransferContractInterface extends BaseContractInterface {
  transfer(): Promise<TransactionResponse | WriteContractReturnType>;
  getFee(amount: bigint): Promise<bigint>;
}

export interface BalanceContractInterface extends BaseContractInterface {
  getBalance(): Promise<bigint>;
  getDecimals(): Promise<number>;
}

export type ContractClient = EthersClient | ViemClient;

export interface EthersClient {
  contract: Contract;
  signer: Signer;
}

export interface ViemClient {
  publicClient: PublicClient;
  walletClient: WalletClient;
}
