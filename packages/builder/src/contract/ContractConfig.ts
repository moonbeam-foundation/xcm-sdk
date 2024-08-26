import { CallType } from '../builder.interfaces';
import { BaseConfig, BaseConfigConstructorParams } from '../types/BaseConfig';

export interface ContractConfigConstructorParams
  extends Omit<BaseConfigConstructorParams, 'type'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any[];
  address?: string;
}

export class ContractConfig extends BaseConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly args: any[];

  readonly address?: string;

  static is(obj: unknown): obj is ContractConfig {
    return obj instanceof ContractConfig;
  }

  constructor({ args, address, ...other }: ContractConfigConstructorParams) {
    super({ ...other, type: CallType.Evm });

    this.args = args;
    this.address = address;
  }
}
