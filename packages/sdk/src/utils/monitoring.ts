import { getPolkadotApi } from '@moonbeam-network/xcm-utils';
import type { ApiPromise } from '@polkadot/api';
import type { Bool } from '@polkadot/types';
import type { ISubmittableResult } from '@polkadot/types/types';
import type { TransferData } from '../sdk.interfaces';

export interface MessageQueueEventData {
  success?: Bool;
}
async function listenToDestinationEvents(
  transferData: TransferData,
  onDestinationFinalized?: () => void,
  onDestinationError?: (error: Error) => void,
): Promise<void> {
  if (
    !transferData?.destination?.chain ||
    !('ws' in transferData.destination.chain)
  ) {
    console.log('No destination WS endpoint available');
    return;
  }

  try {
    const destinationApi: ApiPromise = await getPolkadotApi(
      transferData.destination.chain.ws,
    );

    console.log('Subscribing to destination events...');
    const unsubscribe = await destinationApi.query.system.events((events) => {
      console.log('Destination events:', events.toHuman());

      const bridgeMessageEvent = events.find(({ event }) => {
        return (
          event.section === 'bridgeMessages' &&
          event.method === 'MessagesReceived'
        );
      });

      const messageQueueEvent = events.find(({ event }) => {
        return event.section === 'messageQueue' && event.method === 'Processed';
      });

      if (bridgeMessageEvent && messageQueueEvent) {
        console.log(
          'Found bridgeMessages event on destination:',
          bridgeMessageEvent?.toHuman(),
        );
        console.log(
          'Found MessageQueue event on destination:',
          messageQueueEvent?.toHuman(),
        );

        const eventData = messageQueueEvent.event.data as MessageQueueEventData;
        const isMessageQueueSuccess = eventData.success?.isTrue;

        unsubscribe();
        if (isMessageQueueSuccess) {
          onDestinationFinalized?.();
        } else {
          const error = new Error(
            `Message queue processing failed on destination chain: ${transferData.destination.chain.name}`,
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

export function createStatusCallback(
  transferData: TransferData,
  onSourceFinalized?: () => void,
  onSourceError?: () => void,
  onDestinationFinalized?: () => void,
  onDestinationError?: (error: Error) => void,
) {
  return (status: ISubmittableResult) => {
    const successfulEventIndicator: EventInfo = {
      section: 'bridgeMessages',
      method: 'MessageAccepted',
    };

    const extrinsicFailedEvent = status.events.find((event) => {
      return (
        event.event.section === 'system' &&
        event.event.method === 'ExtrinsicFailed'
      );
    });

    if (extrinsicFailedEvent) {
      onSourceError?.();

      return;
    }

    const event = status.events.find((event) => {
      return (
        event.event.section === successfulEventIndicator.section &&
        event.event.method === successfulEventIndicator.method
      );
    });

    if (event && onSourceFinalized) {
      console.log('MessageAccepted', event);
      onSourceFinalized();
      listenToDestinationEvents(
        transferData,
        onDestinationFinalized,
        onDestinationError,
      );
    }
  };
}
