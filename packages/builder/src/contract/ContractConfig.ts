import { CallType } from '../builder.interfaces';
import { BaseConfig, BaseConfigConstructorParams } from '../types/BaseConfig';

export interface ContractConfigConstructorParams
  extends Omit<BaseConfigConstructorParams, 'type'> {
  args: any[];
}

export class ContractConfig extends BaseConfig {
  readonly args: any[];

  constructor({ args, ...other }: ContractConfigConstructorParams) {
    super({ ...other, type: CallType.Evm });

    this.args = args;
  }
}
