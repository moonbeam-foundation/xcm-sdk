import type { Network, Wormhole } from '@wormhole-foundation/sdk-connect';

export type WormholeTransferFunctions = 'tokenTransfer';
export type WormholeFunctionArgs = Parameters<
  Wormhole<Network>[WormholeTransferFunctions]
>;

export interface WormholeConfigConstructorParams {
  args: WormholeFunctionArgs;
  func: WormholeTransferFunctions;
}

export class WormholeConfig {
  readonly args: WormholeFunctionArgs;

  readonly func: WormholeTransferFunctions;

  static is(obj: unknown): obj is WormholeConfig {
    return obj instanceof WormholeConfig;
  }

  constructor({ args, func }: WormholeConfigConstructorParams) {
    this.args = args;
    this.func = func;
  }
}
