import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { Contract, Signer } from 'ethers';
import { BalanceContractInterface } from '../../contract.interfaces';
import abi from './Erc20ABI.json';

export class Erc20 implements BalanceContractInterface {
  readonly address: string;

  readonly #config: ContractConfig;

  readonly #contract: Contract;

  constructor(config: ContractConfig, signer: Signer) {
    if (!config.address) {
      throw new Error('Contract address is required');
    }

    this.address = config.address;
    this.#config = config;
    this.#contract = new Contract(this.address, abi, signer);
  }

  async getBalance(): Promise<bigint> {
    const balance = await this.#contract.balanceOf(...this.#config.args);

    return balance.toBigInt();
  }
}
