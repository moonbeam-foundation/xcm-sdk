import { Hash, PublicClient, WalletClient } from 'viem';

export interface BaseContractInterface {
  readonly address: string;
}

export interface TransferContractInterface extends BaseContractInterface {
  transfer(): Promise<Hash>;
  getFee(amount: bigint): Promise<bigint>;
}

export interface BalanceContractInterface extends BaseContractInterface {
  getBalance(): Promise<bigint>;
  getDecimals(): Promise<number>;
}

export interface ViemClient {
  publicClient: PublicClient;
  walletClient: WalletClient;
}
