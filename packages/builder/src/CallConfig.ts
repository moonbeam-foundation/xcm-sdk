export interface CallConfigConstructorParams {
  pallet: string;
  method: string;
  args: any[];
}

export class CallConfig {
  readonly pallet: string;

  readonly method: string;

  readonly args: any[];

  constructor({ pallet, method, args }: CallConfigConstructorParams) {
    this.pallet = pallet;
    this.method = method;
    this.args = args;
  }
}
