export interface ExtrinsicConfigConstructorParams {
  args: any[];
  contract: string;
  func: string;
}

export class ContractConfig {
  readonly args: any[];

  readonly contract: string;

  readonly func: string;

  constructor({ args, contract, func }: ExtrinsicConfigConstructorParams) {
    this.args = args;
    this.contract = contract;
    this.func = func;
  }
}
