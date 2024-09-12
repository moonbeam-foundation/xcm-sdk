import { Contract, Signer as EthersSigner } from 'ethers';
import { Abi, GetContractReturnType, WalletClient } from 'viem';
import { EvmSigner } from '../sdk.interfaces';

export function isEthersSigner(signer: EvmSigner): signer is EthersSigner {
  return 'provider' in signer;
}

export function isWalletClient(signer: EvmSigner): signer is WalletClient {
  return 'chain' in signer;
}

export function isEthersContract(
  contract: Contract | GetContractReturnType<Abi | readonly unknown[]>,
): contract is Contract {
  return !('abi' in contract);
}
