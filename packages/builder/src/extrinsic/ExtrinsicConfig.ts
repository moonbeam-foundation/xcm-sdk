import { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import { CallType } from '../builder.interfaces';
import { BaseConfig, BaseConfigConstructorParams } from '../types/BaseConfig';

export interface ExtrinsicConfigConstructorParams
  extends Omit<BaseConfigConstructorParams, 'type'> {
  getArgs: (func?: SubmittableExtrinsicFunction<'promise'>) => any[];
}

export class ExtrinsicConfig extends BaseConfig {
  getArgs: (func?: SubmittableExtrinsicFunction<'promise'>) => any[];

  constructor({ getArgs, ...other }: ExtrinsicConfigConstructorParams) {
    super({ ...other, type: CallType.Substrate });

    this.getArgs = getArgs;
  }
}
