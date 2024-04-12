import { SetOptional } from '@moonbeam-network/xcm-types';
import { CallType } from '../../builder.interfaces';
import { BaseConfig, BaseConfigConstructorParams } from '../BaseConfig';

export interface QueryConfigConstructorParams
  extends SetOptional<BaseConfigConstructorParams, 'type'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (data: any) => Promise<bigint>;
}

export class SubstrateQueryConfig extends BaseConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly args: any[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly transform: (data: any) => Promise<bigint>;

  constructor({
    args = [],
    transform,
    type = CallType.Substrate,
    ...other
  }: QueryConfigConstructorParams) {
    super({ ...other, type });

    this.args = args;
    this.transform = transform;
  }
}
