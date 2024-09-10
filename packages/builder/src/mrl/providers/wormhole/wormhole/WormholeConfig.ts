import type { Network, Wormhole } from '@wormhole-foundation/sdk-connect';

export type WormholeTransferFunctions = 'tokenTransfer';
export type Args = Parameters<Wormhole<Network>[WormholeTransferFunctions]>;

export interface WormholeConfigConstructorParams {
  args: Args;
  func: WormholeTransferFunctions;
}

export class WormholeConfig {
  readonly args: Args;

  readonly func: WormholeTransferFunctions;

  static is(obj: unknown): obj is WormholeConfig {
    return obj instanceof WormholeConfig;
  }

  constructor({ args, func }: WormholeConfigConstructorParams) {
    this.args = args;
    this.func = func;
  }
}
