import { BaseConfig, BaseConfigConstructorParams } from './BaseConfig';

export interface QueryConfigConstructorParams
  extends BaseConfigConstructorParams {
  args: any[];
  transform: (data: any) => bigint;
}

export class QueryConfig extends BaseConfig {
  readonly args: any[];

  readonly transform: (data: any) => bigint;

  constructor({ args, transform, ...other }: QueryConfigConstructorParams) {
    super(other);

    this.args = args;
    this.transform = transform;
  }
}
