import { ContractConfig } from '@moonbeam-network/xcm-builder';
import {
  Address,
  Hash,
  PublicClient,
  WalletClient,
  createPublicClient,
  http,
} from 'viem';
import { EvmSigner } from '../../../sdk.interfaces';
import { TransferContractInterface } from '../../contract.interfaces';
import { XTOKENS_ABI } from './XtokensABI';

export class Xtokens implements TransferContractInterface {
  readonly defaultMoonChainAddress =
    '0x0000000000000000000000000000000000000804';

  readonly address: Address;

  readonly #config: ContractConfig;

  readonly #publicClient: PublicClient;

  readonly #walletClient: WalletClient;

  constructor(config: ContractConfig, signer: EvmSigner, address?: Address) {
    this.#config = config;
    this.address = address ?? this.defaultMoonChainAddress;
    this.#walletClient = signer;
    this.#publicClient = createPublicClient({
      chain: signer.chain,
      transport: http(),
    });
  }

  async transfer(): Promise<Hash> {
    const { request } = await this.#publicClient.simulateContract({
      abi: XTOKENS_ABI,
      account: this.#walletClient.account,
      address: this.address,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      args: this.#config.args as any,
      functionName: this.#config.func as 'transfer',
    });
    const hash = await this.#walletClient.writeContract(request);

    return hash;
  }

  async getFee(amount: bigint): Promise<bigint> {
    if (amount === 0n) {
      return 0n;
    }

    /**
     * Contract can throw an error if user balance is smaller than fee.
     * Or if you try to send 0 as amount.
     */
    try {
      const gas = await this.#publicClient.estimateContractGas({
        abi: XTOKENS_ABI,
        account: this.#walletClient.account,
        address: this.address,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        args: this.#config.args as any,
        functionName: this.#config.func as 'transfer',
      });

      const gasPrice = await this.getGasPrice();

      return gas * gasPrice;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      throw new Error(
        "Can't get a fee. Make sure that you have enough balance!",
      );
    }
  }

  private async getGasPrice() {
    return this.#publicClient.getGasPrice();
  }
}
