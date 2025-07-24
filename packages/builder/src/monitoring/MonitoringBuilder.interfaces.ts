import type { DestinationChecker, SourceChecker } from './eventMonitoring';

export interface MonitoringBuilderConfig {
  eventMonitoring: EventMonitoringConfig;
}

// In case of adding more types of monitoring, change this interface
export interface EventMonitoringConfig {
  checkSource: SourceChecker;
  checkDestination: DestinationChecker;
}
