import { Provider } from '../../../MrlBuilder.interfaces';

export type SnowbridgeFunctions = 'sendToken';

export interface SnowbridgeFunctionArgs {
  tokenAddress: string;
  destinationAddress: string;
  destinationParaId: number;
  amount: bigint;
  bridgeFeeAmount: bigint;
  bridgeChainFee: bigint;
  requiresApproval: boolean;
  value: bigint;
}

export interface SnowbridgeConfigConstructorParams {
  args: SnowbridgeFunctionArgs;
  func: SnowbridgeFunctions;
}

export class SnowbridgeConfig {
  readonly args: SnowbridgeFunctionArgs;

  readonly func: SnowbridgeFunctions;

  readonly provider = Provider.Snowbridge;

  static is(obj: unknown): obj is SnowbridgeConfig {
    return obj instanceof SnowbridgeConfig;
  }

  constructor({ args, func }: SnowbridgeConfigConstructorParams) {
    this.args = args;
    this.func = func;
  }
}
