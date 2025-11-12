import type {
  ChainAddress,
  TokenId,
  TokenTransfer,
} from '@wormhole-foundation/sdk-connect';

export enum Protocols {
  TokenBridge = 'TokenBridge',
  AutomaticTokenBridge = 'AutomaticTokenBridge',
  ExecutorTokenBridge = 'ExecutorTokenBridge',
}

export type WormholeTransferFunctions = 'tokenTransfer';

export interface WormholeFunctionArgs {
  token: TokenId;
  amount: bigint;
  from: ChainAddress;
  to: ChainAddress;
  protocol: TokenTransfer.Protocol;
  payload?: Uint8Array;
}

export interface WormholeConfigConstructorParams {
  args: WormholeFunctionArgs;
  func: WormholeTransferFunctions;
}

export class WormholeConfig {
  readonly args: WormholeFunctionArgs;

  readonly func: WormholeTransferFunctions;

  readonly provider = 'wormhole' as const;

  static is(obj: unknown): obj is WormholeConfig {
    return obj instanceof WormholeConfig;
  }

  constructor({ args, func }: WormholeConfigConstructorParams) {
    this.args = args;
    this.func = func;
  }
}
