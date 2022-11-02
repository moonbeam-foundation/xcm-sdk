export type Hash = string;

export type ExtrinsicEventsCallback = (event: ExtrinsicEvent) => void;

export type ExtrinsicEvent =
  | ExtrinsicFailedEvent
  | ExtrinsicSentEvent
  | ExtrinsicSuccessEvent;

export interface ExtrinsicFailedEvent {
  blockHash: Hash;
  message?: string;
  status: ExtrinsicStatus.Failed;
  txHash: Hash;
}

export interface ExtrinsicSentEvent {
  status: ExtrinsicStatus.Sent;
  txHash: Hash;
}

export interface ExtrinsicSuccessEvent {
  blockHash: Hash;
  status: ExtrinsicStatus.Success;
  txHash: Hash;
}

export enum ExtrinsicStatus {
  Failed = 'Failed',
  Sent = 'Sent',
  Success = 'Success',
}
