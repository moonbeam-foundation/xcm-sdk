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
import { XTOKENS_ABI } from './XtokensABI';

type XtokensContract = GetContractReturnType<typeof XTOKENS_ABI, PublicClient>;

export class Xtokens implements TransferContractInterface {
  readonly defaultMoonChainAddress =
    '0x0000000000000000000000000000000000000804';

  readonly address: Address;

  readonly #config: ContractConfig;

  readonly #contract: XtokensContract;

  readonly #signer: EvmSigner;

  constructor(config: ContractConfig, signer: EvmSigner, address?: Address) {
    this.#config = config;

    this.#signer = signer;

    this.address = address ?? this.defaultMoonChainAddress;

    this.#contract = getContract({
      abi: XTOKENS_ABI,
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
    return this.#contract.write[this.#config.func](...this.#config.args);
  }

  async getEthersContractEstimatedGas(contract: Contract): Promise<bigint> {
    return contract[this.#config.func].estimateGas(...this.#config.args);
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
      const estimatedGas = await this.#contract.estimateGas[this.#config.func](
        ...(this.#config.args as any),
      );
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
    const publicClient = createPublicClient({
      chain: this.#signer.chain,
      transport: http(),
    });

    return publicClient.getGasPrice();
  }
}
