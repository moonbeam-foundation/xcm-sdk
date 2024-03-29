import { CallType } from '../builder.interfaces';
import { BaseConfig, BaseConfigConstructorParams } from '../types/BaseConfig';

export interface ContractConfigConstructorParams
  extends Omit<BaseConfigConstructorParams, 'type'> {
  args: any[];
  address?: string;
}

export class ContractConfig extends BaseConfig {
  readonly args: any[];

  readonly address?: string;

  constructor({ args, address, ...other }: ContractConfigConstructorParams) {
    super({ ...other, type: CallType.Evm });

    this.args = args;
    this.address = address;
  }
}
