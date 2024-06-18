import { ContractConfig } from '@moonbeam-network/xcm-builder';
import {
  Address,
  HttpTransport,
  PublicClient,
  createPublicClient,
  http,
} from 'viem';
import { EvmParachain } from '@moonbeam-network/xcm-types';
import { BalanceContractInterface } from '../../contract.interfaces';
import { ERC20_ABI } from './Erc20ABI';

export class Erc20 implements BalanceContractInterface {
  readonly address: Address;

  readonly #config: ContractConfig;

  readonly #client: PublicClient<HttpTransport>;

  constructor(config: ContractConfig, chain: EvmParachain) {
    if (!config.address) {
      throw new Error('Contract address is required');
    }

    this.address = config.address as Address;
    this.#config = config;
    this.#client = createPublicClient({
      chain: chain.getViemChain(),
      transport: http(),
    });
  }

  async getBalance(): Promise<bigint> {
    const address = this.#config.args[0] as Address;

    return this.#client.readContract({
      abi: ERC20_ABI,
      address: this.address,
      args: [address],
      functionName: 'balanceOf',
    });
  }

  async getDecimals(): Promise<number> {
    return this.#client.readContract({
      abi: ERC20_ABI,
      address: this.address,
      functionName: 'decimals',
    });
  }
}
