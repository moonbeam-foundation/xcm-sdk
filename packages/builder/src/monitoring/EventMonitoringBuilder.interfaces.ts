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

export interface EventMonitoringBuilderReturn {
  [key: string]: () => {
    [key: string]: () => EventMonitoringBuilderConfig;
  };
}

export interface EventMonitoringBuilderConfig {
  checkSource: SourceChecker;
  checkDestination: DestinationChecker;
}
