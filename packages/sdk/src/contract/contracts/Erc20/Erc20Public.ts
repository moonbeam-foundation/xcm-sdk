import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { Address, Chain, PublicClient, createPublicClient, http } from 'viem';
import { BalanceContractInterface } from '../../contract.interfaces';
import { ERC20_ABI } from './Erc20ABI';

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
      abi: ERC20_ABI,
      address: this.#config.address as `0x${string}`,
      args: [this.#config.args[0] as Address],
      functionName: 'balanceOf',
    });

    return data as unknown as bigint;
  }

  async getDecimals(): Promise<number> {
    const data = await this.#publicClient.readContract({
      abi: ERC20_ABI,
      address: this.#config.address as `0x${string}`,
      functionName: 'decimals',
    });

    return data as unknown as number;
  }
}
