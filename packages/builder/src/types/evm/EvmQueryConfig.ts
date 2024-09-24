import type { HttpTransport, PublicClient } from 'viem';

export type EvmQueryFunctions = 'getBalance';
export type EvmFunctionArgs = Parameters<
  PublicClient<HttpTransport>[EvmQueryFunctions]
>;

export interface EvmQueryConfigParams {
  readonly args: EvmFunctionArgs;
  readonly func: EvmQueryFunctions;
}

export class EvmQueryConfig {
  readonly args: EvmFunctionArgs;
  readonly func: EvmQueryFunctions;

  static is(obj: unknown): obj is EvmQueryConfig {
    return obj instanceof EvmQueryConfig;
  }

  constructor({ args, func }: EvmQueryConfigParams) {
    this.args = args;
    this.func = func;
  }
}
