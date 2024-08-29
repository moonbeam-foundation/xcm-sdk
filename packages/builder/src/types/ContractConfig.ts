/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseConfig, BaseConfigConstructorParams } from './BaseConfig';

export interface ContractConfigConstructorParams
  extends BaseConfigConstructorParams {
  address?: string;
  args: any[];
}

export class ContractConfig extends BaseConfig {
  readonly address?: string;

  readonly args: any[];

  static is(obj: unknown): obj is ContractConfig {
    return obj instanceof ContractConfig;
  }

  constructor({ args, address, ...other }: ContractConfigConstructorParams) {
    super({ ...other });

    this.args = args;
    this.address = address;
  }
}
