import { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import { CallType } from '../builder.interfaces';
import { BaseConfig, BaseConfigConstructorParams } from '../types/BaseConfig';

export interface ExtrinsicConfigConstructorParams
  extends Omit<BaseConfigConstructorParams, 'type'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getArgs: (func?: SubmittableExtrinsicFunction<'promise'>) => any[];
}

export class ExtrinsicConfig extends BaseConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getArgs: (func?: SubmittableExtrinsicFunction<'promise'>) => any[];

  constructor({ getArgs, ...other }: ExtrinsicConfigConstructorParams) {
    super({ ...other, type: CallType.Substrate });

    this.getArgs = getArgs;
  }
}
