/* eslint-disable @typescript-eslint/no-explicit-any */
import { Abi, encodeFunctionData } from 'viem';
import { BaseConfig, BaseConfigConstructorParams } from './BaseConfig';

export interface ContractConfigConstructorParams
  extends BaseConfigConstructorParams {
  address: string;
  abi: Abi;
  args: any[];
}

export class ContractConfig extends BaseConfig {
  readonly address: string;

  readonly abi: Abi;

  readonly args: any[];

  static is(obj: unknown): obj is ContractConfig {
    return obj instanceof ContractConfig;
  }

  constructor({
    address,
    abi,
    args,
    ...other
  }: ContractConfigConstructorParams) {
    super({ ...other });

    this.address = address;
    this.abi = abi;
    this.args = args;
  }

  encodeFunctionData() {
    return encodeFunctionData({
      abi: this.abi,
      functionName: this.func,
      args: this.args,
    });
  }
}
