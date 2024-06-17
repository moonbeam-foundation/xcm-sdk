import { CallType } from '../builder.interfaces';
import { BaseConfig, BaseConfigConstructorParams } from '../types/BaseConfig';

export interface ContractConfigConstructorParams<Args extends unknown[]>
  extends Omit<BaseConfigConstructorParams, 'type'> {
  args: Args;
  address?: string;
}

export class ContractConfig<Args extends unknown[]> extends BaseConfig {
  readonly args: Args;

  readonly address?: string;

  constructor({
    args,
    address,
    ...other
  }: ContractConfigConstructorParams<Args>) {
    super({ ...other, type: CallType.Evm });

    this.args = args;
    this.address = address;
  }
}
