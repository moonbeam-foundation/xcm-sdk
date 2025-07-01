import { getPolkadotApi } from '@moonbeam-network/xcm-utils';
import type { ApiPromise } from '@polkadot/api';
import type { Bool, U8aFixed } from '@polkadot/types';
import type { AccountId32, H256 } from '@polkadot/types/interfaces';
import type {
  CumulusPrimitivesCoreAggregateMessageOrigin,
  StagingXcmV5Location,
} from '@polkadot/types/lookup';
import type { ISubmittableResult } from '@polkadot/types/types';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import type { TransferData } from '../sdk.interfaces';

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

interface XcmPalletSentEventData {
  origin: StagingXcmV5Location;
  messageId: U8aFixed;
}

interface XTokensEventData {
  sender: AccountId32;
}

interface XcmQueueEventData {
  messageHash: U8aFixed;
}

interface ListenToDestinationEventsProps {
  transferData: TransferData;
  messageId?: string;
  onDestinationFinalized?: () => void;
  onDestinationError?: (error: Error) => void;
}

async function listenToDestinationEvents({
  transferData,
  messageId,
  onDestinationFinalized,
  onDestinationError,
}: ListenToDestinationEventsProps): Promise<void> {
  if (
    !transferData?.destination?.chain ||
    !('ws' in transferData.destination.chain)
  ) {
    console.log('No destination WS endpoint available');
    return;
  }

  try {
    const api: ApiPromise = await getPolkadotApi(
      transferData.destination.chain.ws,
    );

    console.log('Subscribing to destination events...');
    const unsubscribe = await api.query.system.events((events) => {
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

      // XcmPallet-XTokens monitoring
      if (messageQueueEvent) {
        console.log(
          'Found MessageQueue event on destination:',
          messageQueueEvent?.toHuman(),
        );
        // Access the messageQueue.Processed event data with proper typing
        const eventData = messageQueueEvent.event
          .data as unknown as MessageQueueProcessedData;

        const isSameEvent = messageId === eventData.id.toString();

        if (isSameEvent) {
          const isMessageQueueSuccess = eventData.success.isTrue;
          console.log('isMessageQueueSuccess', isMessageQueueSuccess);

          if (isMessageQueueSuccess) {
            onDestinationFinalized?.();
          } else {
            onDestinationError?.(new Error('Message queue processing failed'));
          }
          unsubscribe();
        }
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

interface CreateStatusCallbackProps {
  transferData: TransferData;
  sourceAddress: string;
  onSourceFinalized?: () => void;
  onSourceError?: () => void;
  onDestinationFinalized?: () => void;
  onDestinationError?: (error: Error) => void;
}

export function createStatusCallback({
  transferData,
  sourceAddress,
  onSourceFinalized,
  onSourceError,
  onDestinationFinalized,
  onDestinationError,
}: CreateStatusCallbackProps) {
  return (status: ISubmittableResult) => {
    console.log('status', status.toHuman());

    // XcmPallet monitoring
    const xcmPalletSentEvent = status.events.find((event) => {
      return (
        event.event.section === 'xcmPallet' && event.event.method === 'Sent'
      );
    });

    console.log('xcmPalletSentEvent', xcmPalletSentEvent?.toHuman());

    if (xcmPalletSentEvent?.event.data) {
      const eventData = xcmPalletSentEvent.event
        .data as unknown as XcmPalletSentEventData;
      const originLocation = eventData.origin;

      const address = originLocation.interior.asX1[0].asAccountId32.id.toHex();
      const decodedSourceAddress = u8aToHex(decodeAddress(sourceAddress));

      console.log('decodedSourceAddress', decodedSourceAddress);
      console.log('address', address);

      if (address === decodedSourceAddress) {
        onSourceFinalized?.();
        const messageId = eventData.messageId.toHex();

        console.log('messageId', messageId);

        listenToDestinationEvents({
          transferData,
          messageId,
          onDestinationFinalized,
          onDestinationError,
        });
      }
    }
    // End of XcmPallet monitoring

    // XTokens monitoring
    const xTokensSentEvent = status.events.find((event) => {
      return (
        event.event.section === 'xTokens' &&
        event.event.method === 'TransferredAssets' // TODO depends on the extrinsic
      );
    });

    const xcmpQueueEvent = status.events.find((event) => {
      return (
        event.event.section === 'xcmpQueue' &&
        event.event.method === 'XcmpMessageSent'
      );
    });

    console.log('xTokensSentEvent', xTokensSentEvent?.toHuman());
    console.log('xcmpQueueEvent', xcmpQueueEvent?.toHuman());
    if (xTokensSentEvent && xcmpQueueEvent) {
      const eventData = xTokensSentEvent.event
        .data as unknown as XTokensEventData;
      const eventAddress = eventData.sender.toString();

      const decodedEventAddress = u8aToHex(decodeAddress(eventAddress));
      const decodedSourceAddress = u8aToHex(decodeAddress(sourceAddress));

      if (decodedEventAddress === decodedSourceAddress) {
        onSourceFinalized?.();
        const messageId = (
          xcmpQueueEvent?.event.data as unknown as XcmQueueEventData
        ).messageHash.toHex();

        console.log('messageId', messageId);

        listenToDestinationEvents({
          transferData,
          messageId,
          onDestinationFinalized,
          onDestinationError,
        });
      }
    }
    // End of XTokens monitoring

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

    // Ecosystem bridge monitoring
    const successfulEventIndicator: EventInfo = {
      section: 'bridgeMessages',
      method: 'MessageAccepted',
    };

    const event = status.events.find((event) => {
      return (
        event.event.section === successfulEventIndicator.section &&
        event.event.method === successfulEventIndicator.method
      );
    });

    if (event && onSourceFinalized) {
      console.log('MessageAccepted', event);
      onSourceFinalized();
      listenToDestinationEvents({
        transferData,
        onDestinationFinalized,
        onDestinationError,
      });
    }
  };
}
