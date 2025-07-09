// TODO mjm fix the architecture, make it like the other builders. Or is it actually a builder?

import type { U8aFixed } from '@polkadot/types';
import type {
  AccountId32,
  Event,
  EventRecord,
  H256,
} from '@polkadot/types/interfaces';
import type { StagingXcmV5Location } from '@polkadot/types/lookup';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';

interface MessageQueueProcessedData {
  id: H256;
}

interface XcmEventData {
  origin: StagingXcmV5Location;
  messageId: U8aFixed;
}

interface XTokensEventData {
  sender: AccountId32;
}

interface XcmQueueEventData {
  messageHash: U8aFixed;
}

// TODO mjm handle try-catches, too bloating
// TODO mjm could be catching somewhere else (in monitoring.ts) or just returning undefined and handling
// TODO mjm add tests
// TODO mjm rename? PolkadotXcm also uses this builder
export function XcmPallet() {
  return {
    getAddress: () => ({
      fromAccountId32: () => (event: EventRecord) => {
        try {
          const eventData = event.event.data as unknown as XcmEventData;

          return eventData.origin.interior.asX1[0].asAccountId32.id.toHex();
        } catch (error) {
          console.error('Error extracting address from event:', error);
          throw error;
        }
      },
      fromAccountKey20: () => (event: EventRecord) => {
        try {
          const eventData = event.event.data as unknown as XcmEventData;

          return eventData.origin.interior.asX1[0].asAccountKey20.key.toString();
        } catch (error) {
          console.error('Error extracting address from event:', error);
          throw error;
        }
      },
    }),
    getMessageId: () => ({
      fromMessageId: () => (event: EventRecord) => {
        try {
          const eventData = event.event.data as unknown as XcmEventData;

          return eventData.messageId.toHex();
        } catch (error) {
          console.error('Error extracting message ID from event:', error);
          throw error;
        }
      },
    }),
  };
}

export function XTokens() {
  return {
    getAddress: () => ({
      fromSender: () => (event: EventRecord) => {
        try {
          const eventData = event.event.data as unknown as XTokensEventData;

          const sender = eventData.sender.toString();

          return u8aToHex(decodeAddress(sender));
        } catch (error) {
          console.error('Error extracting address from event:', error);
          throw error;
        }
      },
    }),
    getMessageId: () => ({
      fromXcmpQueue: () => (event: EventRecord, events?: EventRecord[]) => {
        try {
          const xcmpQueueEvent = events?.find((e) => {
            return (
              e.event.section === 'xcmpQueue' &&
              e.event.method === 'XcmpMessageSent'
            );
          });

          if (!xcmpQueueEvent) {
            throw new Error('XcmpMessageSent event not found');
          }

          return (
            xcmpQueueEvent?.event.data as unknown as XcmQueueEventData
          ).messageHash.toHex();
        } catch (error) {
          console.error('Error extracting message ID from event:', error);
          throw error;
        }
      },
    }),
  };
}

export function MessageQueue() {
  return {
    getMessageId: () => ({
      fromId: () => (event: Event) => {
        return (
          event.data as unknown as MessageQueueProcessedData
        ).id.toString();
      },
    }),
  };
}
