export interface BaseConfigConstructorParams {
  module: string;
  func: string;
}

export class BaseConfig {
  readonly module: string;

  readonly func: string;

  constructor({ module, func }: BaseConfigConstructorParams) {
    this.module = module;
    this.func = func;
  }
}
