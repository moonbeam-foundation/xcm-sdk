import { CallType } from '../builder.interfaces';

export interface BaseConfigConstructorParams {
  module: string;
  func: string;
  type: CallType;
}

export class BaseConfig {
  readonly module: string;

  readonly func: string;

  readonly type: CallType;

  constructor({ module, func, type }: BaseConfigConstructorParams) {
    this.module = module;
    this.func = func;
    this.type = type;
  }
}
