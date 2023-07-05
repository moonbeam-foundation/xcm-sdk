import type { TransactionResponse } from '@ethersproject/abstract-provider';
import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { Contract, Signer } from 'ethers';
import { TransferContractInterface } from '../../contract.interfaces';
import abi from './XtokensABI.json';

export class Xtokens implements TransferContractInterface {
  readonly address: string = '0x0000000000000000000000000000000000000804';

  readonly #config: ContractConfig;

  readonly #contract: Contract;

  readonly #signer: Signer;

  constructor(config: ContractConfig, signer: Signer) {
    this.#config = config;
    this.#signer = signer;
    this.#contract = new Contract(this.address, abi, signer);
  }

  async transfer(): Promise<TransactionResponse> {
    return this.#contract[this.#config.func](...this.#config.args);
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
      const estimatedGas = (
        await this.#contract.estimateGas[this.#config.func](
          ...this.#config.args,
        )
      ).toBigInt();
      const gasPrice = await this.getGasPrice();

      return estimatedGas * gasPrice;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      return 0n;
    }
  }

  private async getGasPrice() {
    const { gasPrice, maxPriorityFeePerGas } = await this.#signer.getFeeData();

    return (
      (gasPrice?.toBigInt() || 0n) + (maxPriorityFeePerGas?.toBigInt() || 0n)
    );
  }
}
