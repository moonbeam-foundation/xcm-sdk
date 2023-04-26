import { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import { BaseConfig, BaseConfigConstructorParams } from '../BaseConfig';

export interface ExtrinsicConfigConstructorParams
  extends BaseConfigConstructorParams {
  getArgs: (func?: SubmittableExtrinsicFunction<'promise'>) => any[];
}

export class ExtrinsicConfig extends BaseConfig {
  getArgs: (func?: SubmittableExtrinsicFunction<'promise'>) => any[];

  constructor({ getArgs, ...other }: ExtrinsicConfigConstructorParams) {
    super(other);

    this.getArgs = getArgs;
  }
}
