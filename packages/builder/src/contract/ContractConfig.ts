import { ChainType } from '@moonbeam-network/xcm-types';
import { BaseConfig, BaseConfigConstructorParams } from '../BaseConfig';

export interface ContractConfigConstructorParams
  extends Omit<BaseConfigConstructorParams, 'type'> {
  args: any[];
}

export class ContractConfig extends BaseConfig {
  readonly args: any[];

  constructor({ args, ...other }: ContractConfigConstructorParams) {
    super({ ...other, type: ChainType.Ethereum });

    this.args = args;
  }
}
