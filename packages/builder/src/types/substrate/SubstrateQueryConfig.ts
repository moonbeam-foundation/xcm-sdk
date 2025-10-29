import { BaseConfig, type BaseConfigConstructorParams } from '../BaseConfig';

// TODO mjm rename? convert to enum?
type QueryType = 'query' | 'call';

export interface QueryConfigConstructorParams
  extends BaseConfigConstructorParams {
  queryType?: QueryType;
  args?: unknown[];
  // biome-ignore lint/suspicious/noExplicitAny: not sure how to fix this
  transform: (data: any) => Promise<bigint>;
}

export class SubstrateQueryConfig extends BaseConfig {
  readonly args: unknown[];

  readonly queryType: QueryType;

  readonly transform: (data: unknown) => Promise<bigint>;

  static is(obj: unknown): obj is SubstrateQueryConfig {
    return obj instanceof SubstrateQueryConfig;
  }

  constructor({
    args = [],
    transform,
    queryType = 'query',
    ...other
  }: QueryConfigConstructorParams) {
    super({ ...other });

    this.args = args;
    this.queryType = queryType;
    this.transform = transform;
  }
}
