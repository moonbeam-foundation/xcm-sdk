import type { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import { BaseConfig, type BaseConfigConstructorParams } from '../BaseConfig';

export interface ExtrinsicConfigConstructorParams
  extends Omit<BaseConfigConstructorParams, 'type'> {
  // biome-ignore lint/suspicious/noExplicitAny: not sure how to fix this
  getArgs: (func?: SubmittableExtrinsicFunction<'promise'>) => any[];
}

export class ExtrinsicConfig extends BaseConfig {
  // biome-ignore lint/suspicious/noExplicitAny: not sure how to fix this
  getArgs: (func?: SubmittableExtrinsicFunction<'promise'>) => any[];

  static is(obj: unknown): obj is ExtrinsicConfig {
    return obj instanceof ExtrinsicConfig;
  }

  constructor({ getArgs, ...other }: ExtrinsicConfigConstructorParams) {
    super({ ...other });

    this.getArgs = getArgs;
  }
}
