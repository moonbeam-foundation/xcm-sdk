import type {
  ContractConfig,
  EvmQueryConfig,
} from '@moonbeam-network/xcm-builder';
import type { EvmChain, EvmParachain } from '@moonbeam-network/xcm-types';
import {
  type Address,
  createPublicClient,
  type Hash,
  type HttpTransport,
  http,
  type PublicClient,
  type StateOverride,
} from 'viem';
import type { EvmSigner } from '../../sdk.interfaces';

export class EvmService {
  readonly chain: EvmChain | EvmParachain;

  readonly client: PublicClient<HttpTransport>;

  static create(chain: EvmChain | EvmParachain): EvmService {
    return new EvmService(chain);
  }

  constructor(chain: EvmChain | EvmParachain) {
    this.chain = chain;
    this.client = createPublicClient({
      chain: chain.getViemChain(),
      transport: http(),
    });
  }

  async query(query: EvmQueryConfig) {
    return this.client[query.func](...query.args);
  }

  async read(config: ContractConfig) {
    return this.client.readContract({
      abi: config.abi,
      address: config.address as Address,
      args: config.args,
      functionName: config.func,
    });
  }

  async getFee(
    address: string,
    contract: ContractConfig,
    stateOverride?: StateOverride,
  ): Promise<bigint> {
    const gas = await this.client.estimateContractGas({
      abi: contract.abi,
      account: address as Address,
      address: contract.address as Address,
      args: contract.args,
      functionName: contract.func,
      value: contract.value,
      stateOverride,
    });
    const gasPrice = await this.client.getGasPrice();

    return gas * gasPrice;
  }

  async getBalance(address: string, contract: ContractConfig): Promise<bigint> {
    const balance = await this.client.readContract({
      abi: contract.abi,
      address: contract.address as Address,
      args: [address],
      functionName: 'balanceOf',
    });

    if (typeof balance !== 'bigint') {
      throw new Error(
        `Could not get balance on ${this.chain.name} for ${address} from contract ${contract.address}`,
      );
    }

    return balance;
  }

  async transfer(signer: EvmSigner, contract: ContractConfig): Promise<Hash> {
    const { request } = await this.client.simulateContract({
      abi: contract.abi,
      account: signer.account,
      address: contract.address as Address,
      args: contract.args,
      functionName: contract.func,
      value: contract.value,
    });
    const hash = await signer.writeContract(request);

    return hash;
  }
}
