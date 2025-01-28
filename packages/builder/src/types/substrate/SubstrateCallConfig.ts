import type { ApiPromise } from '@polkadot/api';

export interface SubstrateCallConfigConstructorParams {
  api: ApiPromise;
  call: () => Promise<bigint>;
}

export class SubstrateCallConfig {
  readonly api: ApiPromise;

  // biome-ignore lint/suspicious/noExplicitAny: not sure how to fix this
  readonly call: () => Promise<any>;

  static is(obj: unknown): obj is SubstrateCallConfig {
    return obj instanceof SubstrateCallConfig;
  }

  constructor({ api, call }: SubstrateCallConfigConstructorParams) {
    this.api = api;
    this.call = call;
  }
}
