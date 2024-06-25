import { Hash, PublicClient, WalletClient } from 'viem';
import { EvmSigner } from '../sdk.interfaces';

export interface BaseContractInterface {
  readonly address: string;
}

export interface TransferContractInterface extends BaseContractInterface {
  transfer(signer: EvmSigner): Promise<Hash>;
  getFee(amount: bigint, address: string): Promise<bigint>;
}

export interface BalanceContractInterface extends BaseContractInterface {
  getBalance(): Promise<bigint>;
  getDecimals(): Promise<number>;
}

export interface ViemClient {
  publicClient: PublicClient;
  walletClient: WalletClient;
}
