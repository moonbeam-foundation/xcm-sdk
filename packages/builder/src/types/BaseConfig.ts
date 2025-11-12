// TODO these are for MRL, we can create a Config specific for MRL and include them
export type Provider = 'snowbridge' | 'wormhole';

export interface BaseConfigConstructorParams {
  module: string;
  func: string;
  provider?: Provider;
}

export class BaseConfig {
  readonly module: string;

  readonly func: string;

  readonly provider?: Provider;

  constructor({ module, func, provider }: BaseConfigConstructorParams) {
    this.module = module;
    this.func = func;
    this.provider = provider;
  }
}
