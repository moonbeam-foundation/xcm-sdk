import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { Address, Hash, PublicClient, createPublicClient, http } from 'viem';
import { EvmParachain } from '@moonbeam-network/xcm-types';
import { EvmSigner } from '../../../sdk.interfaces';
import { TransferContractInterface } from '../../contract.interfaces';
import { XTOKENS_ABI } from './XtokensABI';

export class Xtokens implements TransferContractInterface {
  readonly defaultMoonChainAddress =
    '0x0000000000000000000000000000000000000804';

  readonly address: string;

  readonly #config: ContractConfig;

  readonly #publicClient: PublicClient;

  constructor(config: ContractConfig, chain: EvmParachain, address?: string) {
    this.#config = config;
    this.address = address ?? this.defaultMoonChainAddress;
    this.#publicClient = createPublicClient({
      chain: chain.getViemChain(),
      transport: http(),
    });
  }

  async transfer(signer: EvmSigner): Promise<Hash> {
    const { request } = await this.#publicClient.simulateContract({
      abi: XTOKENS_ABI,
      account: signer.account,
      address: this.address as Address,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      args: this.#config.args as any,
      functionName: this.#config.func as 'transfer',
    });
    const hash = await signer.writeContract(request);

    return hash;
  }

  async getFee(amount: bigint, address: string): Promise<bigint> {
    if (amount === 0n) {
      return 0n;
    }

    const gas = await this.#publicClient.estimateContractGas({
      abi: XTOKENS_ABI,
      account: address as Address,
      address: this.address as Address,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      args: this.#config.args as any,
      functionName: this.#config.func as 'transfer',
    });

    const gasPrice = await this.getGasPrice();

    return gas * gasPrice;
  }

  private async getGasPrice() {
    return this.#publicClient.getGasPrice();
  }
}
