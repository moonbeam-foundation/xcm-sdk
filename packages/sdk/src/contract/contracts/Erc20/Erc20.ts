import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { Contract, Signer } from 'ethers';
import { WalletClient, createPublicClient, http } from 'viem';
import {
  BalanceContractInterface,
  ContractClient,
} from '../../contract.interfaces';
import { isEthersClient, isEthersSigner } from '../../contract.utils';
import abi from './Erc20ABI.json';

export class Erc20 implements BalanceContractInterface {
  readonly address: string;

  readonly #config: ContractConfig;

  readonly #client: ContractClient;

  constructor(config: ContractConfig, signer: Signer | WalletClient) {
    if (!config.address) {
      throw new Error('Contract address is required');
    }

    this.address = config.address;
    this.#config = config;
    this.#client = isEthersSigner(signer)
      ? { contract: new Contract(this.address, abi, signer), signer }
      : {
          publicClient: createPublicClient({
            chain: signer.chain,
            transport: http(),
          }),
          walletClient: signer,
        };
  }

  async getBalance(): Promise<bigint> {
    if (isEthersClient(this.#client)) {
      const balance = await this.#client.contract.balanceOf(
        ...this.#config.args,
      );
      return balance.toBigInt();
    }

    return (await this.#client.publicClient.readContract({
      abi,
      account: this.#client.walletClient.account,
      address: this.address as `0x${string}`,
      args: this.#config.args,
      functionName: 'balanceOf',
    })) as bigint;
  }

  async getDecimals(): Promise<number> {
    const decimals = isEthersClient(this.#client)
      ? await this.#client.contract.decimals()
      : this.#client.publicClient.readContract({
          abi,
          account: this.#client.walletClient.account,
          address: this.address as `0x${string}`,
          args: [],
          functionName: 'decimals',
        });

    return decimals;
  }
}
