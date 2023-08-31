import type { TransactionResponse } from '@ethersproject/abstract-provider';
import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { Contract, Signer } from 'ethers';
import {
  PublicClient,
  WalletClient,
  WriteContractReturnType,
  createPublicClient,
  http,
} from 'viem';
import { TransferContractInterface } from '../../contract.interfaces';
import abi from './XtokensABI.json';

export class Xtokens implements TransferContractInterface {
  readonly address = '0x0000000000000000000000000000000000000804';

  readonly #config: ContractConfig;

  readonly #contract: Contract | undefined;

  // TODO mjm rename to EthersSigner
  readonly #signer: Signer | WalletClient;

  // TODO mjm use this or use the signer?
  readonly #walletClient: WalletClient | undefined;

  readonly #client: PublicClient;

  constructor(config: ContractConfig, signer: Signer | WalletClient) {
    this.#config = config;
    this.#signer = signer;
    this.#walletClient = signer instanceof Signer ? undefined : signer;
    this.#contract =
      signer instanceof Signer
        ? new Contract(this.address, abi, signer)
        : undefined;
    this.#client = createPublicClient({
      // TODO
      transport: http('https://rpc.api.moonbeam.network'),
    });
  }

  async transfer(): Promise<TransactionResponse | WriteContractReturnType> {
    if (this.#signer instanceof Signer) {
      return this.#contract?.[this.#config.func](...this.#config.args);
    }

    const { request } = await this.#client.simulateContract({
      // TODO compact this
      abi,
      account: this.#signer.account,
      address: this.address,
      args: this.#config.args,
      functionName: this.#config.func,
    });
    return this.#signer.writeContract(request);
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
      const estimatedGas = this.#contract
        ? (
            await this.#contract.estimateGas[this.#config.func](
              ...this.#config.args,
            )
          ).toBigInt()
        : await this.#client.estimateContractGas({
            abi,
            account: (this.#signer as WalletClient).account || '0x', // TODO mjm throw error here
            address: this.address,
            args: this.#config.args,
            functionName: this.#config.func,
          });
      const gasPrice = await this.getGasPrice();
      return estimatedGas * gasPrice;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      throw new Error(
        "Can't get a fee. Make sure that you have enough balance!",
      );
    }
  }

  private async getGasPrice() {
    if (this.#signer instanceof Signer) {
      const { gasPrice, maxPriorityFeePerGas } =
        await this.#signer.getFeeData();

      return (
        (gasPrice?.toBigInt() || 0n) + (maxPriorityFeePerGas?.toBigInt() || 0n)
      );
    }

    return this.#client.getGasPrice();
  }
}
