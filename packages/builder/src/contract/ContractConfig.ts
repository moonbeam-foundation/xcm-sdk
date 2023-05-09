export interface ContractConfigConstructorParams {
  args: any[];
  contract: string;
  func: string;
}

export class ContractConfig {
  readonly args: any[];

  readonly contract: string;

  readonly func: string;

  constructor({ args, contract, func }: ContractConfigConstructorParams) {
    this.args = args;
    this.contract = contract;
    this.func = func;
  }
}
