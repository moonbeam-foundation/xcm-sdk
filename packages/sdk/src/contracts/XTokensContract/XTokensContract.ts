import type { TransactionResponse } from '@ethersproject/abstract-provider';
import {
  Asset,
  AssetSymbol,
  WithdrawXTokensConfig,
} from '@moonbeam-network/xcm-config';
import { Contract, Signer } from 'ethers';

import ContractInterface from './XTokensABI.json';

export class XTokensContract<Symbols extends AssetSymbol = AssetSymbol> {
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
    asset: Asset<Symbols>,
    config: WithdrawXTokensConfig<Symbols>,
    destinationFee: bigint,
  ): Promise<TransactionResponse> {
    if (config.xcmFeeAsset) {
      return this.#contract.transferMultiCurrencies(
        [
          [config.xcmFeeAsset.erc20Id, destinationFee],
          [asset.erc20Id, amount],
        ],
        0,
        config.getParams(account),
        config.weight,
      );
    }
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
    asset: Asset<Symbols>,
    config: WithdrawXTokensConfig<Symbols>,
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
