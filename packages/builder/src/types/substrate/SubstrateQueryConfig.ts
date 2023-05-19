import { SetOptional } from 'type-fest';
import { CallType } from '../../builder.interfaces';
import { BaseConfig, BaseConfigConstructorParams } from '../BaseConfig';

export interface QueryConfigConstructorParams
  extends SetOptional<BaseConfigConstructorParams, 'type'> {
  args?: any[];
  transform: (data: any) => Promise<bigint>;
}

export class SubstrateQueryConfig extends BaseConfig {
  readonly args: any[];

  readonly transform: (data: any) => Promise<bigint>;

  constructor({
    args = [],
    transform,
    type = CallType.Substrate,
    ...other
  }: QueryConfigConstructorParams) {
    super({ ...other, type });

    this.args = args;
    this.transform = transform;
  }
}
