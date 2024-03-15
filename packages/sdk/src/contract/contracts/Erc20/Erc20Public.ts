import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { Chain, PublicClient, createPublicClient, http } from 'viem';
import { BalanceContractInterface } from '../../contract.interfaces';
import abi from './Erc20ABI.json';

export class Erc20Public implements BalanceContractInterface {
  readonly address: string;

  readonly #config: ContractConfig;

  readonly #publicClient: PublicClient;

  constructor(config: ContractConfig, chain: Chain) {
    if (!config.address) {
      throw new Error('Contract address is required');
    }
    this.address = config.address;

    this.#config = config;

    this.#publicClient = createPublicClient({
      chain,
      transport: http(),
    });
  }

  async getBalance(): Promise<bigint> {
    const data = await this.#publicClient.readContract({
      abi,
      address: this.#config.address as `0x${string}`,
      args: [this.address],
      functionName: 'balanceOf',
    });

    return data as unknown as bigint;
  }

  async getDecimals(): Promise<number> {
    const data = await this.#publicClient.readContract({
      abi,
      address: this.#config.address as `0x${string}`,
      functionName: 'decimals',
    });

    return data as unknown as number;
  }
}
