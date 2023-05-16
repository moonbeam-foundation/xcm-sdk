import { SetOptional } from 'type-fest';
import { BaseConfig, BaseConfigConstructorParams } from './BaseConfig';
import { CallType } from './builder.interfaces';

export interface QueryConfigConstructorParams
  extends SetOptional<BaseConfigConstructorParams, 'type'> {
  args?: any[];
  transform: (data: any) => Promise<bigint>;
}

export class QueryConfig extends BaseConfig {
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
