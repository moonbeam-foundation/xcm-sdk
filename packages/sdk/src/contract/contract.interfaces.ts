import { Contract, Signer as EthersSigner, TransactionResponse } from 'ethers';
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
  signer: EthersSigner;
}

export interface ViemClient {
  publicClient: PublicClient;
  walletClient: WalletClient;
}
