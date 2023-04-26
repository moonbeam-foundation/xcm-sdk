export interface BaseConfigConstructorParams {
  pallet: string;
  func: string;
}

export class BaseConfig {
  readonly pallet: string;

  readonly func: string;

  constructor({ pallet, func }: BaseConfigConstructorParams) {
    this.pallet = pallet;
    this.func = func;
  }
}
