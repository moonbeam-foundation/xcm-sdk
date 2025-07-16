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
  xcmPallet: () => {
    messageQueue: () => EventMonitoringConfig;
  };
  polkadotXcm: () => {
    messageQueue: () => EventMonitoringConfig;
    xcmpQueue: () => EventMonitoringConfig;
  };
  xTokens: () => {
    messageQueue: () => EventMonitoringConfig;
    ethereumXcm: () => EventMonitoringConfig;
  };
  bridgeMessages: () => {
    bridgeMessages: () => EventMonitoringConfig;
  };
}

export interface EventMonitoringConfig {
  checkSource: SourceChecker;
  checkDestination: DestinationChecker;
}
