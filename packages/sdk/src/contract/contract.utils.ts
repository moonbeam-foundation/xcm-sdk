import { Signer as EthersSigner } from 'ethers';
import { WalletClient } from 'viem';
import { Signer } from '../sdk.interfaces';
import {
  ContractClient,
  EthersClient,
  ViemClient,
} from './contract.interfaces';

export function isEthersSigner(signer: Signer): signer is EthersSigner {
  return 'provider' in signer;
}

export function isWalletClient(signer: Signer): signer is WalletClient {
  return 'chain' in signer;
}

export function isEthersClient(client: ContractClient): client is EthersClient {
  return 'contract' in client;
}

export function isViemClient(client: ContractClient): client is ViemClient {
  return 'publicClient' in client;
}
