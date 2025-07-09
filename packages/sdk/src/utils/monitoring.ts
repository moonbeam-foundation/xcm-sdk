import type { ExtrinsicConfig } from '@moonbeam-network/xcm-builder';
import type { AssetRoute } from '@moonbeam-network/xcm-config';
import { getPolkadotApi } from '@moonbeam-network/xcm-utils';
import type { ApiPromise } from '@polkadot/api';
import type { Bool } from '@polkadot/types';
import type { EventRecord, H256 } from '@polkadot/types/interfaces';
import type { CumulusPrimitivesCoreAggregateMessageOrigin } from '@polkadot/types/lookup';
import type { ISubmittableResult } from '@polkadot/types/types';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';

// TODO mjm review this
// MessageQueue.Processed event data structure
// Based on: AugmentedEvent<ApiType, [id: H256, origin: ..., weightUsed: ..., success: bool], { id: H256, origin: ..., weightUsed: ..., success: bool }>
interface MessageQueueProcessedData {
  id: H256; // H256
  origin: CumulusPrimitivesCoreAggregateMessageOrigin; // CumulusPrimitivesCoreAggregateMessageOrigin
  weightUsed: unknown; // not used
  success: Bool;
  // Also support array access
  0: H256; // id
  1: CumulusPrimitivesCoreAggregateMessageOrigin; // origin
  2: unknown; // weightUsed
  3: Bool; // success
}

// interface XTokensEventData {
//   sender: AccountId32;
// }

// interface XcmQueueEventData {
//   messageHash: U8aFixed;
// }

interface ListenToDestinationEventsProps {
  route?: AssetRoute; // TODO mjm optional?
  messageId?: string;
  onDestinationFinalized?: () => void;
  onDestinationError?: (error: Error) => void;
}

export async function listenToDestinationEvents({
  route,
  messageId,
  onDestinationFinalized,
  onDestinationError,
}: ListenToDestinationEventsProps): Promise<void> {
  if (!route?.destination?.chain || !('ws' in route.destination.chain)) {
    console.log('No destination WS endpoint available');
    return;
  }

  try {
    // TODO mjm handle better
    const monitoringConfig = route?.monitoring;
    if (!monitoringConfig) {
      console.log('No monitoring config found');
      return;
    }

    const api: ApiPromise = await getPolkadotApi(route.destination.chain.ws);

    console.log('Subscribing to destination events...');
    const unsubscribe = await api.query.system.events((events) => {
      console.log('Destination events:', events.toHuman());

      const bridgeMessageEvent = events.find(({ event }) => {
        return (
          event.section === 'bridgeMessages' &&
          event.method === 'MessagesReceived'
        );
      });

      // Find the specific messageQueue.Processed event that matches our messageId
      const messageQueueEvent = events.find(({ event }) => {
        // TODO extract this to a function matchMessageQueueEvent ?
        if (
          event.section === monitoringConfig.destination.event.section &&
          event.method === monitoringConfig.destination.event.method
        ) {
          if (messageId) {
            const destinationMessageId =
              monitoringConfig.destination.messageIdExtractor(event, events);
            return messageId === destinationMessageId;
          }
          // TODO should we return true?
          return true;
        }
        return false;
      });

      // XcmPallet-XTokens monitoring
      if (messageQueueEvent) {
        console.log(
          'Found MessageQueue event on destination:',
          messageQueueEvent?.toHuman(),
        );
        // Access the messageQueue.Processed event data with proper typing
        const eventData = messageQueueEvent.event
          .data as unknown as MessageQueueProcessedData;

        const isMessageQueueSuccess = eventData.success.isTrue;
        console.log('isMessageQueueSuccess', isMessageQueueSuccess);

        if (isMessageQueueSuccess) {
          onDestinationFinalized?.();
        } else {
          onDestinationError?.(new Error('Message queue processing failed'));
        }
        console.log('Unsubscribing from destination events...');
        unsubscribe();
      }

      // Ecosystem bridge monitoring
      if (bridgeMessageEvent && messageQueueEvent) {
        console.log(
          'Found bridgeMessages event on destination:',
          bridgeMessageEvent?.toHuman(),
        );
        console.log(
          'Found MessageQueue event on destination:',
          messageQueueEvent?.toHuman(),
        );

        const eventData = messageQueueEvent.event
          .data as unknown as MessageQueueProcessedData;
        const isMessageQueueSuccess = eventData.success.isTrue;

        unsubscribe();
        if (isMessageQueueSuccess) {
          onDestinationFinalized?.();
        } else {
          const error = new Error(
            `Message queue processing failed on destination chain: ${route.destination.chain.name}`,
          );
          console.error(
            'Destination message queue processing failed:',
            messageQueueEvent?.toHuman(),
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

interface EventInfo {
  section: string;
  method: string;
}

interface CreateMonitoringCallbackProps {
  sourceAddress: string;
  route: AssetRoute;
  extrinsic?: ExtrinsicConfig;
  statusCallback?: (status: ISubmittableResult) => void;
  onSourceFinalized?: () => void;
  onSourceError?: (error: Error) => void;
  onDestinationFinalized?: () => void;
  onDestinationError?: (error: Error) => void;
}

// TODO needed?
interface ListenToSourceEventsProps extends CreateMonitoringCallbackProps {}

interface ProcessSourceEventsProps extends CreateMonitoringCallbackProps {
  events: EventRecord[];
  unsubscribe?: () => void;
}

/**
 * Listen to source chain events from any events array
 * This function can be used independently of the monitoring callback
 */
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

  // TODO route.monitoring check should be done differently after all is integrated
  // TODO mjm change to monitoringConfig parameter?
  const monitoringConfig = route.monitoring;
  if (!monitoringConfig) {
    console.log('No monitoring config found');
    return;
  }

  const decodedSourceAddress = u8aToHex(decodeAddress(sourceAddress));

  const sentEvent = events.find((event) => {
    if (
      event.event.section !== monitoringConfig.source.event.section ||
      event.event.method !== monitoringConfig.source.event.method
    ) {
      return false;
    }

    // Extract address and check if it matches source address
    try {
      console.log('event', event.toHuman());
      const address = monitoringConfig.source.addressExtractor(event);

      console.log('address', address);
      return address === decodedSourceAddress;
    } catch (error) {
      console.error('Error extracting address from event:', error);
      return false;
    }
  });

  console.log('sentEvent', sentEvent?.toHuman());

  if (sentEvent) {
    onSourceFinalized?.();
    if (unsubscribe) {
      console.log('Unsubscribing from source events...');
      unsubscribe();
    }

    const messageId = monitoringConfig.source.messageIdExtractor(
      sentEvent,
      events,
    );

    console.log('messageId', messageId);

    listenToDestinationEvents({
      route,
      messageId,
      onDestinationFinalized,
      onDestinationError,
    });
  }
  // end of generic monitoring

  // Ecosystem bridge monitoring
  const successfulEventIndicator: EventInfo = {
    section: 'bridgeMessages',
    method: 'MessageAccepted',
  };

  const event = events.find((event) => {
    return (
      event.event.section === successfulEventIndicator.section &&
      event.event.method === successfulEventIndicator.method
    );
  });

  if (event && onSourceFinalized) {
    console.log('MessageAccepted', event);
    onSourceFinalized();
    listenToDestinationEvents({
      route,
      onDestinationFinalized,
      onDestinationError,
    });
  }
}

export function createMonitoringCallback({
  sourceAddress,
  route,
  extrinsic,
  statusCallback,
  onSourceFinalized,
  onSourceError,
  onDestinationFinalized,
  onDestinationError,
}: CreateMonitoringCallbackProps) {
  return (status: ISubmittableResult) => {
    // Execute the original user callback
    statusCallback?.(status);
    console.log('status', status.toHuman());

    const extrinsicPalletName = extrinsic?.module;
    const extrinsicFunctionName = extrinsic?.func;

    if (extrinsicPalletName && extrinsicFunctionName) {
      console.log(
        `Monitoring extrinsic: ${extrinsicPalletName}::${extrinsicFunctionName}`,
      );
    }

    processSourceEvents({
      events: status.events,
      sourceAddress,
      route,
      extrinsic,
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
    console.log('No source WS endpoint available');
    return;
  }

  try {
    const api: ApiPromise = await getPolkadotApi(route.source.chain.ws);

    console.log('Subscribing to source events...');
    const unsubscribe = await api.query.system.events((events) => {
      console.log('Source events:', events.toHuman());

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
