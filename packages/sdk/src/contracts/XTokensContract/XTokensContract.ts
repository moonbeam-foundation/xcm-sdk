import type { TransactionResponse } from '@ethersproject/abstract-provider';
import {
  Asset,
  AssetConfig,
  WithdrawXTokensConfig,
} from '@moonbeam-network/xcm-config';
import { Contract, Signer } from 'ethers';

import ContractInterface from './XTokensABI.json';

export class XTokensContract<Assets extends Asset> {
  readonly address: string = '0x0000000000000000000000000000000000000804';

  readonly #contract: Contract;

  readonly #signer: Signer;

  constructor(signer: Signer) {
    this.#signer = signer;
    this.#contract = new Contract(this.address, ContractInterface, signer);
  }

  async transfer(
    account: string,
    amount: bigint,
    asset: AssetConfig<Assets>,
    config: WithdrawXTokensConfig<Assets>,
  ): Promise<TransactionResponse> {
    return this.#contract.transfer(
      asset.erc20Id,
      amount,
      config.getParams(account),
      config.weight,
    );
  }

  async getTransferFees(
    account: string,
    amount: bigint,
    asset: AssetConfig<Assets>,
    config: WithdrawXTokensConfig<Assets>,
  ) {
    const estimatedGas = (
      await this.#contract.estimateGas.transfer(
        asset.erc20Id,
        amount,
        config.getParams(account),
        config.weight,
      )
    ).toBigInt();
    const gasPrice = await this.getGasPrice();

    return estimatedGas * gasPrice;
  }

  private async getGasPrice() {
    const { gasPrice, maxPriorityFeePerGas } = await this.#signer.getFeeData();

    return (
      (gasPrice?.toBigInt() || 0n) + (maxPriorityFeePerGas?.toBigInt() || 0n)
    );
  }
}
