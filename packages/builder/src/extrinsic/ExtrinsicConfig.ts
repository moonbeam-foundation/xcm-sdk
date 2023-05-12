import { ChainType } from '@moonbeam-network/xcm-types';
import { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import { BaseConfig, BaseConfigConstructorParams } from '../BaseConfig';

export interface ExtrinsicConfigConstructorParams
  extends Omit<BaseConfigConstructorParams, 'type'> {
  getArgs: (func?: SubmittableExtrinsicFunction<'promise'>) => any[];
}

export class ExtrinsicConfig extends BaseConfig {
  getArgs: (func?: SubmittableExtrinsicFunction<'promise'>) => any[];

  constructor({ getArgs, ...other }: ExtrinsicConfigConstructorParams) {
    super({ ...other, type: ChainType.Substrate });

    this.getArgs = getArgs;
  }
}
