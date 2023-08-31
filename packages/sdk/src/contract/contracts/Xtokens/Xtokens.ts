import type { TransactionResponse } from '@ethersproject/abstract-provider';
import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { Contract, Signer } from 'ethers';
import {
  WalletClient,
  WriteContractReturnType,
  createPublicClient,
  http,
} from 'viem';
import {
  ContractClient,
  TransferContractInterface,
} from '../../contract.interfaces';
import { isEthersClient, isEthersSigner } from '../../contract.utils';
import abi from './XtokensABI.json';

export class Xtokens implements TransferContractInterface {
  readonly address = '0x0000000000000000000000000000000000000804';

  readonly #config: ContractConfig;

  readonly #client: ContractClient;

  constructor(config: ContractConfig, signer: Signer | WalletClient) {
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

  async transfer(): Promise<TransactionResponse | WriteContractReturnType> {
    if (isEthersClient(this.#client)) {
      return this.#client.contract[this.#config.func](...this.#config.args);
    }

    const { request } = await this.#client.publicClient.simulateContract({
      // TODO mjm compact this
      abi,
      account: this.#client.walletClient.account,
      address: this.address,
      args: this.#config.args,
      functionName: this.#config.func,
    });
    return this.#client.walletClient.writeContract(request);
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
      const estimatedGas = isEthersClient(this.#client)
        ? (
            await this.#client.contract.estimateGas[this.#config.func](
              ...this.#config.args,
            )
          ).toBigInt()
        : await this.#client.publicClient.estimateContractGas({
            abi,
            account: this.#client.walletClient.account || '0x', // TODO mjm throw error here
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
    if (isEthersClient(this.#client)) {
      const { gasPrice, maxPriorityFeePerGas } =
        await this.#client.signer.getFeeData();

      return (
        (gasPrice?.toBigInt() || 0n) + (maxPriorityFeePerGas?.toBigInt() || 0n)
      );
    }

    return this.#client.publicClient.getGasPrice();
  }
}
