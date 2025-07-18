import type { ChainAddress, TokenId } from '@wormhole-foundation/sdk-connect';

export type WormholeTransferFunctions = 'tokenTransfer';
export type WormholeFunctionArgs =
  | [
      token: TokenId,
      amount: bigint,
      from: ChainAddress,
      to: ChainAddress,
      protocol: 'TokenBridge',
      payload?: Uint8Array,
    ]
  | [
      token: TokenId,
      amount: bigint,
      from: ChainAddress,
      to: ChainAddress,
      protocol: 'AutomaticTokenBridge',
      nativeGas?: bigint,
    ]
  | [
      token: TokenId,
      amount: bigint,
      from: ChainAddress,
      to: ChainAddress,
      protocol: 'ExecutorTokenBridge',
    ];

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
