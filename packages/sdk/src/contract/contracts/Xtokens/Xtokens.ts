import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { Contract, TransactionResponse } from 'ethers';
import {
  Address,
  GetContractReturnType,
  PublicClient,
  WriteContractReturnType,
  createPublicClient,
  getContract,
  http,
} from 'viem';
import { EvmSigner } from '../../../sdk.interfaces';
import { TransferContractInterface } from '../../contract.interfaces';
import { isEthersContract, isEthersSigner } from '../../contract.utils';
import abi from './XtokensABI.json';

type XtokensContract = GetContractReturnType<typeof abi, PublicClient>;

export class Xtokens implements TransferContractInterface {
  readonly defaultMoonChainAddress =
    '0x0000000000000000000000000000000000000804';

  readonly address: Address;

  readonly #config: ContractConfig;

  readonly #contract: Contract | XtokensContract;

  readonly #signer: EvmSigner;

  constructor(config: ContractConfig, signer: EvmSigner, address?: Address) {
    this.#config = config;

    this.#signer = signer;

    this.address = address ?? this.defaultMoonChainAddress;

    this.#contract = isEthersSigner(signer)
      ? new Contract(this.address, abi, signer)
      : getContract({
          abi,
          address: this.address,
          client: {
            public: createPublicClient({
              chain: signer.chain,
              transport: http(),
            }),
            wallet: signer,
          },
        });
  }

  async transfer(): Promise<TransactionResponse | WriteContractReturnType> {
    if (isEthersContract(this.#contract)) {
      return this.#contract[this.#config.func](...this.#config.args);
    }

    return this.#contract.write[this.#config.func](this.#config.args);
  }

  async getEthersContractEstimatedGas(contract: Contract): Promise<bigint> {
    return contract[this.#config.func].estimateGas(...this.#config.args);
  }

  async getViemContractEstimatedGas(
    contract: XtokensContract,
  ): Promise<bigint> {
    if (!contract) {
      return 0n;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return contract.estimateGas[this.#config.func](this.#config.args as any);
  }

  async getFee(amount: bigint): Promise<bigint> {
    console.log(
      '\x1b[34m████████████████████▓▓▒▒░ Xtokens.ts:78 ░▒▒▓▓████████████████████\x1b[0m',
    );
    console.log('* amount = ');
    console.log(amount);
    console.log(
      '\x1b[34m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x1b[0m',
    );

    console.log(
      '\x1b[34m████████████████████▓▓▒▒░ Xtokens.ts:86 ░▒▒▓▓████████████████████\x1b[0m',
    );
    console.log('* this.#config: = ');
    console.log(this.#config);
    console.log(
      '\x1b[34m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x1b[0m',
    );

    console.log(
      '\x1b[34m████████████████████▓▓▒▒░ Xtokens.ts:95 ░▒▒▓▓████████████████████\x1b[0m',
    );
    console.log('* this.#contract = ');
    console.log(this.#contract);
    console.log(
      '\x1b[34m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x1b[0m',
    );

    console.log(
      '\x1b[34m████████████████████▓▓▒▒░ Xtokens.ts:104 ░▒▒▓▓████████████████████\x1b[0m',
    );
    console.log('* this.#signer = ');
    console.log(this.#signer);
    console.log(
      '\x1b[34m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x1b[0m',
    );

    if (amount === 0n) {
      return 0n;
    }
    /**
     * Contract can throw an error if user balance is smaller than fee.
     * Or if you try to send 0 as amount.
     */
    try {
      const estimatedGas = isEthersContract(this.#contract)
        ? await this.getEthersContractEstimatedGas(this.#contract)
        : await this.getViemContractEstimatedGas(this.#contract);
      const gasPrice = await this.getGasPrice();
      return estimatedGas * gasPrice;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      console.log(
        '\x1b[34m████████████████████▓▓▒▒░ Xtokens.ts:102 ░▒▒▓▓████████████████████\x1b[0m',
      );
      console.log('* error = ');
      console.log(error);
      console.log(
        '\x1b[34m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x1b[0m',
      );

      throw new Error(
        "Can't get a fee. Make sure that you have enough balance!",
      );
    }
  }

  private async getGasPrice() {
    if (isEthersSigner(this.#signer)) {
      if (!this.#signer.provider) return 0n;
      const { gasPrice, maxPriorityFeePerGas } =
        await this.#signer.provider.getFeeData();

      return (gasPrice || 0n) + (maxPriorityFeePerGas || 0n);
    }

    const publicClient = createPublicClient({
      chain: this.#signer.chain,
      transport: http(),
    });

    return publicClient.getGasPrice();
  }
}
