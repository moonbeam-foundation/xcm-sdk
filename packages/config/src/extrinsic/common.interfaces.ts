import { SubmittableExtrinsicFunction } from '@polkadot/api/types';

export type Parents = 0 | 1;

export interface XcmExtrinsicGetParams {
  account: string;
  amount: bigint;
  extrinsicCall?: SubmittableExtrinsicFunction<'promise'>;
  fee?: bigint;
}

export enum XcmVersion {
  v1 = 'V1',
  v2 = 'V2',
  v3 = 'V3',
}
