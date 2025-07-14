import type { EventRecord } from '@polkadot/types/interfaces';

export type SourceChecker = (
  events: EventRecord[],
  sourceAddress: string,
) => {
  matched: boolean;
  messageId?: string;
  event?: EventRecord;
};

export type DestinationChecker = (
  events: EventRecord[],
  messageId?: string,
) => {
  matched: boolean;
  success: boolean;
  event?: EventRecord;
};

export interface MonitorEventReturn {
  [key: string]: () => {
    [key: string]: () => EventMonitoringConfig;
  };
}

export interface EventMonitoringConfig {
  checkSource: SourceChecker;
  checkDestination: DestinationChecker;
}
