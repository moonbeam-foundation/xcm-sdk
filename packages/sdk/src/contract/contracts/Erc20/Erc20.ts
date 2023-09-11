import { ContractConfig } from '@moonbeam-network/xcm-builder';
import { Contract } from 'ethers';
import {
  GetContractReturnType,
  PublicClient,
  WalletClient,
  createPublicClient,
  getContract,
  http,
} from 'viem';
import { EvmSigner } from '../../../sdk.interfaces';
import { BalanceContractInterface } from '../../contract.interfaces';
import { isEthersContract, isEthersSigner } from '../../contract.utils';
import abi from './Erc20ABI.json';

type Erc20Contract = GetContractReturnType<
  typeof abi,
  PublicClient,
  WalletClient
>;

export class Erc20 implements BalanceContractInterface {
  readonly address: string;

  readonly #config: ContractConfig;

  readonly #contract: Contract | Erc20Contract;

  constructor(config: ContractConfig, signer: EvmSigner) {
    if (!config.address) {
      throw new Error('Contract address is required');
    }

    this.address = config.address;
    this.#config = config;
    this.#contract = isEthersSigner(signer)
      ? new Contract(this.address, abi, signer)
      : getContract({
          abi,
          address: this.address as `0x${string}`,
          publicClient: createPublicClient({
            chain: signer.chain,
            transport: http(),
          }),
          walletClient: signer,
        });
  }

  async getBalance(): Promise<bigint> {
    if (isEthersContract(this.#contract)) {
      const balance = await this.#contract.balanceOf(...this.#config.args);
      return balance.toBigInt();
    }
    return this.#contract.read.balanceOf(
      this.#config.args,
    ) as unknown as bigint;
  }

  async getDecimals(): Promise<number> {
    const decimals = isEthersContract(this.#contract)
      ? await this.#contract.decimals()
      : this.#contract.read.decimals();

    return decimals;
  }
}
