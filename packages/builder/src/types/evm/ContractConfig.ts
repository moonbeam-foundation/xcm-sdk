import { type Abi, encodeFunctionData } from 'viem';
import { BaseConfig, type BaseConfigConstructorParams } from '../BaseConfig';

export interface ContractConfigConstructorParams
  extends BaseConfigConstructorParams {
  address: string;
  abi: Abi;
  args: unknown[];
  value?: bigint;
}

export class ContractConfig extends BaseConfig {
  readonly address: string;
  readonly abi: Abi;
  // TODO mjm changed this from `any`, does it work?
  readonly args: unknown[];
  readonly value?: bigint;

  static is(obj: unknown): obj is ContractConfig {
    return obj instanceof ContractConfig;
  }

  constructor({
    address,
    abi,
    args,
    value,
    ...other
  }: ContractConfigConstructorParams) {
    super({ ...other });

    this.address = address;
    this.abi = abi;
    this.args = args;
    this.value = value;
  }

  encodeFunctionData() {
    return encodeFunctionData({
      abi: this.abi,
      functionName: this.func,
      args: this.args,
    });
  }
}
