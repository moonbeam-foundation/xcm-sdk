import {
  ContractConfig,
  ERC20_ABI,
  GATEWAY_ABI,
  type SnowbridgeConfig,
} from '@moonbeam-network/xcm-builder';
import type { EvmSigner } from '@moonbeam-network/xcm-sdk';
import { EvmService } from '@moonbeam-network/xcm-sdk';
import type { EvmChain } from '@moonbeam-network/xcm-types';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import { type Address, encodeFunctionData, type Hash } from 'viem';

export class SnowbridgeService {
  readonly chain: EvmChain;

  readonly #evmService: EvmService;

  readonly #gatewayAddress: string;

  static create(chain: EvmChain): SnowbridgeService {
    return new SnowbridgeService(chain);
  }

  constructor(chain: EvmChain) {
    if (!chain.contracts?.Gateway) {
      throw new Error(
        'Chain must be an EVMChain with the Gateway contract address configured for Snowbridge operations',
      );
    }

    this.chain = chain;
    this.#gatewayAddress = chain.contracts.Gateway;
    this.#evmService = EvmService.create(chain);
  }

  async checkAllowance(
    ownerAddress: string,
    tokenAddress: string,
    spenderAddress: string,
  ): Promise<bigint> {
    const allowance = await this.#evmService.client.readContract({
      abi: ERC20_ABI,
      address: tokenAddress as Address,
      args: [ownerAddress as Address, spenderAddress as Address],
      functionName: 'allowance',
    });

    if (typeof allowance !== 'bigint') {
      throw new Error(
        `Could not get allowance on ${this.chain.name} for token ${tokenAddress}`,
      );
    }

    return allowance;
  }

  async transfer(signer: EvmSigner, transfer: SnowbridgeConfig): Promise<Hash> {
    const { args } = transfer;
    const { tokenAddress, amount, requiresApproval } = args;

    if (!signer.account) {
      throw new Error('Signer account is required');
    }

    const contract = this.buildContractConfig(transfer);

    if (!requiresApproval) {
      return await this.#evmService.transfer(signer, contract);
    }

    const currentAllowance = await this.checkAllowance(
      signer.account.address,
      tokenAddress,
      this.#gatewayAddress,
    );
    console.log('currentAllowance', currentAllowance);

    if (currentAllowance < amount) {
      await this.approve(signer, tokenAddress, this.#gatewayAddress, amount);
    }

    return await this.#evmService.transfer(signer, contract);
  }

  private buildContractConfig(transfer: SnowbridgeConfig): ContractConfig {
    const { args } = transfer;
    const {
      tokenAddress,
      destinationAddress,
      destinationParaId,
      amount,
      bridgeFeeAmount,
      requiresApproval,
    } = args;

    const value = requiresApproval ? bridgeFeeAmount : amount + bridgeFeeAmount;

    const contractArgs = [
      tokenAddress,
      destinationParaId,
      {
        kind: 1,
        data: u8aToHex(decodeAddress(destinationAddress)),
      },
      0n,
      amount,
    ];

    return new ContractConfig({
      address: this.#gatewayAddress,
      abi: GATEWAY_ABI,
      args: contractArgs,
      func: 'sendToken',
      value,
      module: 'Gateway',
    });
  }

  private async approve(
    signer: EvmSigner,
    tokenAddress: string,
    spenderAddress: string,
    amount: bigint,
  ): Promise<Hash> {
    const { request } = await this.#evmService.client.simulateContract({
      abi: ERC20_ABI,
      account: signer.account,
      address: tokenAddress as Address,
      functionName: 'approve',
      args: [spenderAddress as Address, amount],
    });

    const hash = await signer.writeContract(request);

    await this.#evmService.client.waitForTransactionReceipt({
      hash,
    });

    return hash;
  }

  async getFee(address: string, transfer: SnowbridgeConfig): Promise<bigint> {
    const { args } = transfer;
    const { tokenAddress, amount, requiresApproval } = args;

    const contract = this.buildContractConfig(transfer);

    if (!requiresApproval) {
      return await this.#evmService.getFee(address, contract);
    }

    const currentAllowance = await this.checkAllowance(
      address,
      tokenAddress,
      this.#gatewayAddress,
    );

    if (currentAllowance >= amount) {
      return await this.#evmService.getFee(address, contract);
    }

    return await this.estimateApproveAndSendFee(address, transfer);
  }

  private async estimateApproveAndSendFee(
    address: string,
    transfer: SnowbridgeConfig,
  ): Promise<bigint> {
    const { args } = transfer;
    const { tokenAddress, amount } = args;

    const contract = this.buildContractConfig(transfer);

    try {
      const approveData = encodeFunctionData({
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [this.#gatewayAddress as Address, amount],
      });

      const approveGas = await this.#evmService.client.estimateGas({
        account: address as Address,
        to: tokenAddress as Address,
        data: approveData,
      });

      const sendData = encodeFunctionData({
        abi: contract.abi,
        functionName: contract.func,
        args: contract.args,
      });

      const sendGas = await this.#evmService.client.estimateGas({
        account: address as Address,
        to: contract.address as Address,
        data: sendData,
        value: contract.value,
      });

      const gasPrice = await this.#evmService.client.getGasPrice();
      console.log('gasPrice', gasPrice);
      console.log('approveGas', approveGas);
      console.log('sendGas', sendGas);

      return (approveGas + sendGas) * gasPrice;
    } catch (error) {
      console.error('Error estimating approve + send fee:', error);
      return 0n;
    }
  }
}
