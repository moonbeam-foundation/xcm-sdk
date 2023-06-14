import { ApiPromise } from '@polkadot/api';
import { CallType } from '../../builder.interfaces';

export interface SubstrateCallConfigConstructorParams {
  api: ApiPromise;
  call: () => Promise<bigint>;
}

export class SubstrateCallConfig {
  readonly api: ApiPromise;

  readonly call: () => Promise<any>;

  readonly type = CallType.Substrate;

  constructor({ api, call }: SubstrateCallConfigConstructorParams) {
    this.api = api;
    this.call = call;
  }
}
