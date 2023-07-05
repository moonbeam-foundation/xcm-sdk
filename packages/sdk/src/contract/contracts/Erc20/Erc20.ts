import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { Contract, Signer } from 'ethers';
import { BalanceContractInterface } from '../../contract.interfaces';
import abi from './Erc20ABI.json';

export class Erc20 implements BalanceContractInterface {
  readonly address: string;

  readonly #config: ContractConfig;

  readonly #contract: Contract;

  readonly #signer: Signer;

  constructor(config: ContractConfig, signer: Signer) {
    if (!config.address) {
      throw new Error('Contract address is required');
    }

    this.address = config.address;
    this.#config = config;
    this.#signer = signer;
    this.#contract = new Contract(this.address, abi, this.#signer);
  }

  async getBalance(): Promise<bigint> {
    console.log(
      '\x1b[34m████████████████████▓▓▒▒░ Erc20.ts:27 ░▒▒▓▓████████████████████\x1b[0m',
    );
    console.log('* this.#config = ', this.#config);
    console.log(
      '\x1b[34m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x1b[0m',
    );

    const balance = await this.#contract[this.#config.func](
      ...this.#config.args,
    );

    console.log(
      '\x1b[34m████████████████████▓▓▒▒░ Erc20.ts:26 ░▒▒▓▓████████████████████\x1b[0m',
    );
    console.log('* balance = ', balance);
    console.log(
      '\x1b[34m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x1b[0m',
    );

    return balance.toBigInt();
  }
}
