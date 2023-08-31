import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { Contract, Signer } from 'ethers';
import { PublicClient, WalletClient, createPublicClient, http } from 'viem';
// TODO mjm implement correctly
import { moonbaseAlpha } from 'viem/chains';
import { BalanceContractInterface } from '../../contract.interfaces';
import abi from './Erc20ABI.json';

export class Erc20 implements BalanceContractInterface {
  readonly address: string;

  readonly #config: ContractConfig;

  readonly #contract: Contract | undefined;

  readonly #client: PublicClient;

  readonly #walletClient: WalletClient | undefined;

  constructor(config: ContractConfig, signer: Signer | WalletClient) {
    if (!config.address) {
      throw new Error('Contract address is required');
    }

    this.address = config.address;
    this.#config = config;
    this.#contract =
      signer instanceof Signer
        ? new Contract(this.address, abi, signer)
        : undefined;
    this.#client = createPublicClient({
      chain: moonbaseAlpha,
      transport: http(),
    });
    this.#walletClient = signer instanceof Signer ? undefined : signer;
  }

  async getBalance(): Promise<bigint> {
    if (this.#contract) {
      const balance = await this.#contract.balanceOf(...this.#config.args);
      return balance.toBigInt();
    }
    return (await this.#client.readContract({
      abi,
      account: this.#walletClient?.account,
      address: this.address as `0x${string}`,
      args: this.#config.args,
      functionName: 'balanceOf',
    })) as bigint;
  }

  async getDecimals(): Promise<number> {
    const decimals = this.#contract
      ? await this.#contract.decimals(...this.#config.args)
      : this.#client.readContract({
          abi,
          account: this.#walletClient?.account,
          address: this.address as `0x${string}`,
          args: [],
          functionName: 'decimals',
        });

    return decimals;
  }
}
