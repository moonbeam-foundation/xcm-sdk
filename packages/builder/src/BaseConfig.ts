import { ChainType } from '@moonbeam-network/xcm-types';

export interface BaseConfigConstructorParams {
  module: string;
  func: string;
  type: ChainType;
}

export class BaseConfig {
  readonly module: string;

  readonly func: string;

  readonly type: ChainType;

  constructor({ module, func, type }: BaseConfigConstructorParams) {
    this.module = module;
    this.func = func;
    this.type = type;
  }
}
