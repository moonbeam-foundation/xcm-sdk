/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import { BaseConfig, BaseConfigConstructorParams } from '../BaseConfig';

export interface ExtrinsicConfigConstructorParams
  extends Omit<BaseConfigConstructorParams, 'type'> {
  getArgs: (func?: SubmittableExtrinsicFunction<'promise'>) => any[];
}

export class ExtrinsicConfig extends BaseConfig {
  getArgs: (func?: SubmittableExtrinsicFunction<'promise'>) => any[];

  static is(obj: unknown): obj is ExtrinsicConfig {
    return obj instanceof ExtrinsicConfig;
  }

  constructor({ getArgs, ...other }: ExtrinsicConfigConstructorParams) {
    super({ ...other });

    this.getArgs = getArgs;
  }
}
