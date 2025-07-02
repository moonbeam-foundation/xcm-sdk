export interface BaseConfigConstructorParams {
  module: string;
  func: string;
}

export class BaseConfig {
  readonly module: string;

  readonly func: string;

  // TODO add section and method here or some mapping that transforms the module in section and func in method, for the event monitoring

  constructor({ module, func }: BaseConfigConstructorParams) {
    this.module = module;
    this.func = func;
  }
}
