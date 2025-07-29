import type { EventMonitoringConfig } from '@moonbeam-network/xcm-builder';
import type { AssetRoute } from '@moonbeam-network/xcm-config';
import { getPolkadotApi } from '@moonbeam-network/xcm-utils';
import type { ApiPromise } from '@polkadot/api';
import type { EventRecord } from '@polkadot/types/interfaces';
import type { ISubmittableResult } from '@polkadot/types/types';

interface ListenToDestinationEventsProps {
  route: AssetRoute;
  monitoringConfig: EventMonitoringConfig;
  messageId?: string;
  onDestinationFinalized?: () => void;
  onDestinationError?: (error: Error) => void;
}

const ENABLE_LOGGING = process.env.ENABLE_LOGGING === 'true';

function log(label: string, message?: unknown): void {
  if (ENABLE_LOGGING) {
    console.log(`[${label}]`, message ?? '');
  }
}

export async function listenToDestinationEvents({
  route,
  monitoringConfig,
  messageId,
  onDestinationFinalized,
  onDestinationError,
}: ListenToDestinationEventsProps): Promise<void> {
  if (!route?.destination?.chain || !('ws' in route.destination.chain)) {
    log('No destination WS endpoint available');
    return;
  }

  try {
    const api: ApiPromise = await getPolkadotApi(route.destination.chain.ws);

    log('Subscribing to destination events...');
    const unsubscribe = await api.query.system.events((events) => {
      log('Destination events', events.toHuman());

      const destinationResult = monitoringConfig.checkDestination(
        events,
        messageId,
      );

      if (destinationResult.matched) {
        log('Destination event matched:', destinationResult.event?.toHuman());

        unsubscribe();

        if (destinationResult.success) {
          onDestinationFinalized?.();
        } else {
          const error = new Error(
            `Message processing failed on destination chain: ${route.destination.chain.name}`,
          );
          console.error(
            'Destination message processing failed:',
            destinationResult.event?.toHuman(),
          );
          onDestinationError?.(error);
        }
      }
    });
  } catch (error) {
    console.error('Error listening to destination events:', error);
    onDestinationError?.(error as Error);
  }
}

interface CreateMonitoringCallbackProps {
  sourceAddress: string;
  route: AssetRoute;
  statusCallback?: (status: ISubmittableResult) => void;
  onSourceFinalized?: () => void;
  onSourceError?: (error: Error) => void;
  onDestinationFinalized?: () => void;
  onDestinationError?: (error: Error) => void;
}

interface ListenToSourceEventsProps extends CreateMonitoringCallbackProps {}

interface ProcessSourceEventsProps extends ListenToSourceEventsProps {
  events: EventRecord[];
  unsubscribe?: () => void;
}

export function processSourceEvents({
  events,
  sourceAddress,
  route,
  onSourceFinalized,
  onSourceError,
  onDestinationFinalized,
  onDestinationError,
  unsubscribe,
}: ProcessSourceEventsProps): void {
  const monitoringConfig = route.monitoring;
  if (!monitoringConfig) {
    log('No monitoring config found');
    unsubscribe?.();
    return;
  }

  const extrinsicFailedEvent = events.find((event) => {
    return (
      event.event.section === 'system' &&
      event.event.method === 'ExtrinsicFailed'
    );
  });

  if (extrinsicFailedEvent) {
    onSourceError?.(new Error('Extrinsic failed'));
    unsubscribe?.();
    return;
  }

  try {
    const sourceResult = monitoringConfig.checkSource(events, sourceAddress);

    if (sourceResult.matched) {
      log('Source event matched:', sourceResult.event?.toHuman());
      onSourceFinalized?.();

      if (unsubscribe) {
        log('Unsubscribing from source events...');
        unsubscribe();
      }

      listenToDestinationEvents({
        route,
        monitoringConfig,
        messageId: sourceResult.messageId,
        onDestinationFinalized,
        onDestinationError,
      });

      return;
    }
  } catch (error) {
    console.error('Error in MonitoringBuilder config:', error);
    return;
  }
}

export function createMonitoringCallback({
  sourceAddress,
  route,
  statusCallback,
  onSourceFinalized,
  onSourceError,
  onDestinationFinalized,
  onDestinationError,
}: CreateMonitoringCallbackProps) {
  return (status: ISubmittableResult) => {
    // Execute the original user callback
    statusCallback?.(status);

    processSourceEvents({
      events: status.events,
      sourceAddress,
      route,
      onSourceFinalized,
      onSourceError,
      onDestinationFinalized,
      onDestinationError,
    });
  };
}

export async function listenToSourceEvents({
  route,
  sourceAddress,
  onSourceFinalized,
  onSourceError,
  onDestinationFinalized,
  onDestinationError,
}: ListenToSourceEventsProps) {
  if (!route?.source?.chain || !('ws' in route.source.chain)) {
    log('No source WS endpoint available');
    return;
  }

  try {
    const api: ApiPromise = await getPolkadotApi(route.source.chain.ws);

    log('Subscribing to source events...');
    const unsubscribe = await api.query.system.events((events) => {
      log('Source events:', events.toHuman());

      processSourceEvents({
        events,
        sourceAddress,
        route,
        onSourceFinalized,
        onSourceError,
        onDestinationFinalized,
        onDestinationError,
        unsubscribe,
      });
    });
  } catch (error) {
    console.error('Error listening to source events:', error);
  }
}
