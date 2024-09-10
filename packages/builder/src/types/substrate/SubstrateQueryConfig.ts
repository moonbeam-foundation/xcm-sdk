import { BaseConfig, type BaseConfigConstructorParams } from '../BaseConfig';

export interface QueryConfigConstructorParams
  extends BaseConfigConstructorParams {
  args?: unknown[];
  // biome-ignore lint/suspicious/noExplicitAny: not sure how to fix this
  transform: (data: any) => Promise<bigint>;
}

export class SubstrateQueryConfig extends BaseConfig {
  readonly args: unknown[];

  readonly transform: (data: unknown) => Promise<bigint>;

  static is(obj: unknown): obj is SubstrateQueryConfig {
    return obj instanceof SubstrateQueryConfig;
  }

  constructor({
    args = [],
    transform,
    ...other
  }: QueryConfigConstructorParams) {
    super({ ...other });

    this.args = args;
    this.transform = transform;
  }
}
