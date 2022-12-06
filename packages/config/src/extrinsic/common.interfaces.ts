export type Parents = 0 | 1;

export interface XcmExtrinsicGetParams {
  account: string;
  amount: bigint;
  fee?: bigint;
}
