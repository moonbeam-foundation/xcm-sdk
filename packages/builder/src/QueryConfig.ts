import { ChainType } from '@moonbeam-network/xcm-types';
import { SetOptional } from 'type-fest';
import { BaseConfig, BaseConfigConstructorParams } from './BaseConfig';

export interface QueryConfigConstructorParams
  extends SetOptional<BaseConfigConstructorParams, 'type'> {
  args: any[];
  transform: (data: any) => bigint;
}

export class QueryConfig extends BaseConfig {
  readonly args: any[];

  readonly transform: (data: any) => bigint;

  constructor({
    args,
    transform,
    type = ChainType.Substrate,
    ...other
  }: QueryConfigConstructorParams) {
    super({ ...other, type });

    this.args = args;
    this.transform = transform;
  }
}
