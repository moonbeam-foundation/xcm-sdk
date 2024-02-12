import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { Contract, TransactionResponse } from 'ethers';
import {
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
  readonly address = '0x0000000000000000000000000000000000000804';

  readonly #config: ContractConfig;

  readonly #contract: Contract | XtokensContract;

  readonly #signer: EvmSigner;

  constructor(config: ContractConfig, signer: EvmSigner) {
    this.#config = config;

    this.#signer = signer;

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

    return contract.estimateGas[this.#config.func](this.#config.args as any);
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
      const estimatedGas = isEthersContract(this.#contract)
        ? await this.getEthersContractEstimatedGas(this.#contract)
        : await this.getViemContractEstimatedGas(this.#contract);
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
    if (isEthersSigner(this.#signer)) {
      const { gasPrice, maxPriorityFeePerGas } =
        await this.#signer.getFeeData();

      return (
        (gasPrice?.toBigInt() || 0n) + (maxPriorityFeePerGas?.toBigInt() || 0n)
      );
    }

    const publicClient = createPublicClient({
      chain: this.#signer.chain,
      transport: http(),
    });

    return publicClient.getGasPrice();
  }
}
