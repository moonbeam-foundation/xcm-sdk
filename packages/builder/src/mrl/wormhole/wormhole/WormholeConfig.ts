export interface WormholeConfigConstructorParams {
  args: unknown[];
  func: string;
}

export class WormholeConfig {
  readonly args: unknown[];

  readonly func: string;

  constructor({ args, func }: WormholeConfigConstructorParams) {
    this.args = args;
    this.func = func;
  }
}
