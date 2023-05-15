import { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import { BaseConfig, BaseConfigConstructorParams } from '../BaseConfig';
import { CallType } from '../builder.interfaces';

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
