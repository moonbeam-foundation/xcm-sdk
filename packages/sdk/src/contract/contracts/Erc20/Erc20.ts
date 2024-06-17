import { ContractConfig } from '@moonbeam-network/xcm-builder';
import {
  Address,
  GetContractReturnType,
  PublicClient,
  createPublicClient,
  getContract,
  http,
} from 'viem';
import { EvmSigner } from '../../../sdk.interfaces';
import { BalanceContractInterface } from '../../contract.interfaces';
import { ERC20_ABI } from './Erc20ABI';

type Erc20Contract = GetContractReturnType<typeof ERC20_ABI, PublicClient>;

export class Erc20 implements BalanceContractInterface {
  readonly address: string;

  readonly #config: ContractConfig;

  readonly #contract: Erc20Contract;

  constructor(config: ContractConfig, signer: EvmSigner) {
    if (!config.address) {
      throw new Error('Contract address is required');
    }

    this.address = config.address;
    this.#config = config;
    this.#contract = getContract({
      abi: ERC20_ABI,
      address: this.address as `0x${string}`,
      client: {
        public: createPublicClient({
          chain: signer.chain,
          transport: http(),
        }),
        wallet: signer,
      },
    });
  }

  async getBalance(): Promise<bigint> {
    const address = this.#config.args[0] as Address;

    return this.#contract.read.balanceOf([address]);
  }

  async getDecimals(): Promise<number> {
    return this.#contract.read.decimals();
  }
}
