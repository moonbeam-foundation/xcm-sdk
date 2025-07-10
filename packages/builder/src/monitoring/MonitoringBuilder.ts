// TODO mjm fix the architecture, make it like the other builders. Or is it actually a builder?
// TODO mjm review and remove redundant comments

import type { Bool, U8aFixed } from '@polkadot/types';
import type {
  AccountId32,
  EventRecord,
  H256,
} from '@polkadot/types/interfaces';
import type {
  CumulusPrimitivesCoreAggregateMessageOrigin,
  StagingXcmV5Location,
} from '@polkadot/types/lookup';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';

// TODO mjm review this
interface MessageQueueProcessedData {
  id: H256;
  origin: CumulusPrimitivesCoreAggregateMessageOrigin;
  weightUsed: unknown; // not used
  success: Bool;
  // TODO mjm necessary? Also support array access
  0: H256; // id
  1: CumulusPrimitivesCoreAggregateMessageOrigin; // origin
  2: unknown; // weightUsed
  3: Bool; // success
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
// export function XcmCommonPallets() {
//   return {
//     getAddress: () => ({
//       fromAccountId32: () => (event: EventRecord) => {
//         try {
//           const eventData = event.event.data as unknown as XcmEventData;

//           return eventData.origin.interior.asX1[0].asAccountId32.id.toHex();
//         } catch (error) {
//           console.error('Error extracting address from event:', error);
//           throw error;
//         }
//       },
//       fromAccountKey20: () => (event: EventRecord) => {
//         try {
//           const eventData = event.event.data as unknown as XcmEventData;

//           return eventData.origin.interior.asX1[0].asAccountKey20.key.toString();
//         } catch (error) {
//           console.error('Error extracting address from event:', error);
//           throw error;
//         }
//       },
//     }),
//     getMessageId: () => ({
//       fromMessageId: () => (event: EventRecord) => {
//         try {
//           const eventData = event.event.data as unknown as XcmEventData;

//           return eventData.messageId.toHex();
//         } catch (error) {
//           console.error('Error extracting message ID from event:', error);
//           throw error;
//         }
//       },
//     }),
//   };
// }

// export function XTokens() {
//   return {
//     getAddress: () => ({
//       fromSender: () => (event: EventRecord) => {
//         try {
//           const eventData = event.event.data as unknown as XTokensEventData;

//           const sender = eventData.sender.toString();

//           return u8aToHex(decodeAddress(sender));
//         } catch (error) {
//           console.error('Error extracting address from event:', error);
//           throw error;
//         }
//       },
//     }),
//     getMessageId: () => ({
//       fromXcmpQueue: () => (event: EventRecord, events?: EventRecord[]) => {
//         try {
//           const xcmpQueueEvent = events?.find((e) => {
//             return (
//               e.event.section === 'xcmpQueue' &&
//               e.event.method === 'XcmpMessageSent'
//             );
//           });

//           if (!xcmpQueueEvent) {
//             throw new Error('XcmpMessageSent event not found');
//           }

//           return (
//             xcmpQueueEvent?.event.data as unknown as XcmQueueEventData
//           ).messageHash.toHex();
//         } catch (error) {
//           console.error('Error extracting message ID from event:', error);
//           throw error;
//         }
//       },
//     }),
//   };
// }

// export function MessageQueue() {
//   return {
//     getMessageId: () => ({
//       fromId: () => (event: Event) => {
//         return (
//           event.data as unknown as MessageQueueProcessedData
//         ).id.toString();
//       },
//     }),
//   };
// }

/// NEW IMPLEMENTATION

// Source checker function type
export type SourceChecker = (
  events: EventRecord[],
  sourceAddress: string,
) => {
  matched: boolean;
  messageId?: string;
  event?: EventRecord;
};

// Destination checker function type
export type DestinationChecker = (
  events: EventRecord[],
  messageId?: string,
) => {
  matched: boolean;
  success: boolean;
  event?: EventRecord;
};

export interface MonitoringConfig {
  checkSource: SourceChecker;
  checkDestination: DestinationChecker;
}

// Address extractor builder
function GetAddress() {
  return {
    fromXcmEvent:
      () =>
      (event: EventRecord): string => {
        const eventData = event.event.data as unknown as XcmEventData;
        const interior = eventData.origin.interior.asX1[0];

        if (interior.isAccountId32) {
          return interior.asAccountId32.id.toHex();
        } else if (interior.isAccountKey20) {
          return interior.asAccountKey20.key.toString();
        } else {
          throw new Error('Unsupported address type');
        }
      },

    fromXTokensEvent:
      () =>
      (event: EventRecord): string => {
        const eventData = event.event.data as unknown as XTokensEventData;
        return u8aToHex(decodeAddress(eventData.sender.toString()));
      },
  };
}

// Message ID extractor builder
function GetMessageId() {
  return {
    fromXcmEvent:
      () =>
      (event: EventRecord): string => {
        const eventData = event.event.data as unknown as XcmEventData;
        return eventData.messageId.toHex();
      },

    fromXcmpQueue:
      () =>
      (event: EventRecord, events?: EventRecord[]): string => {
        const xcmpEvent = events?.find(
          (event) =>
            event.event.section === 'xcmpQueue' &&
            event.event.method === 'XcmpMessageSent',
        );

        if (!xcmpEvent) {
          throw new Error('XcmpMessageSent event not found');
        }

        const eventData = xcmpEvent.event.data as unknown as XcmQueueEventData;
        return eventData.messageHash.toHex();
      },
  };
}

// Message ID matcher builder for destination checkers
function MatchMessageId() {
  return {
    fromMessageQueueId:
      () =>
      (event: EventRecord, messageId?: string): boolean => {
        if (!messageId) return true;

        try {
          const eventData = event.event
            .data as unknown as MessageQueueProcessedData;
          return eventData.id.toString() === messageId;
        } catch {
          return false;
        }
      },

    fromXcmpQueueHash:
      () =>
      (event: EventRecord, messageId?: string): boolean => {
        if (!messageId) return true;

        try {
          const eventData = event.event.data as unknown as XcmQueueEventData;
          return eventData.messageHash.toString() === messageId;
        } catch {
          return false;
        }
      },

    // TODO
    never: () => (): boolean => true, // Always match for cases where messageId is not used
  };
}

// Success extractor builder for destination checkers
function GetIsSuccess() {
  return {
    fromMessageQueueProcessed:
      () =>
      (event: EventRecord): boolean => {
        try {
          const eventData = event.event
            .data as unknown as MessageQueueProcessedData;
          return eventData.success.isTrue;
        } catch {
          return false;
        }
      },

    fromXcmpQueueEvent:
      () =>
      (event: EventRecord): boolean => {
        // Success if it's a 'Success' event, fail if it's a 'Fail' event
        return event.event.method === 'Success';
      },

    // TODO
    alwaysTrue: () => (): boolean => true, // Always successful for simple cases
  };
}

// Generic destination checker factory
const createDestinationChecker =
  (
    section: string,
    method: string | string[],
    matchMessageId: (event: EventRecord, messageId?: string) => boolean,
    getIsSuccess: (event: EventRecord) => boolean,
  ): DestinationChecker =>
  (events, messageId) => {
    const methods = Array.isArray(method) ? method : [method];

    const event = events.find((event) => {
      if (
        event.event.section !== section ||
        !methods.includes(event.event.method)
      ) {
        return false;
      }

      return matchMessageId(event, messageId);
    });

    if (!event) {
      return { matched: false, success: false };
    }

    const success = getIsSuccess(event);
    return { matched: true, success, event };
  };

// Generic source checker factory
const createSourceChecker =
  (
    section: string,
    method: string | string[],
    addressExtractor: (event: EventRecord) => string,
    messageIdExtractor: (event: EventRecord, events?: EventRecord[]) => string,
  ): SourceChecker =>
  (events, sourceAddress) => {
    const decodedSourceAddress = u8aToHex(decodeAddress(sourceAddress));
    const methods = Array.isArray(method) ? method : [method];

    const event = events.find((event) => {
      if (
        event.event.section !== section ||
        !methods.includes(event.event.method)
      ) {
        return false;
      }

      try {
        const address = addressExtractor(event);
        return address === decodedSourceAddress;
      } catch {
        return false;
      }
    });

    if (!event) {
      return { matched: false };
    }

    try {
      const messageId = messageIdExtractor(event, events);
      return { matched: true, messageId, event };
    } catch {
      return { matched: true, event }; // Return without messageId if extraction fails
    }
  };

// Source checker builder
function CheckSource() {
  return {
    xcmPallet: (): SourceChecker =>
      createSourceChecker(
        'xcmPallet',
        'Sent',
        GetAddress().fromXcmEvent(),
        GetMessageId().fromXcmEvent(),
      ),

    polkadotXcm: (): SourceChecker =>
      createSourceChecker(
        'polkadotXcm',
        'Sent',
        GetAddress().fromXcmEvent(),
        GetMessageId().fromXcmEvent(),
      ),

    polkadotXcmAndXcmpQueue: (): SourceChecker =>
      createSourceChecker(
        'polkadotXcm',
        'Sent',
        GetAddress().fromXcmEvent(),
        GetMessageId().fromXcmpQueue(),
      ),

    xTokens: (): SourceChecker =>
      createSourceChecker(
        'xTokens',
        ['TransferredMultiAssets', 'TransferredAssets'],
        GetAddress().fromXTokensEvent(),
        GetMessageId().fromXcmpQueue(),
      ),

    bridgeMessages: (): SourceChecker => (events, sourceAddress) => {
      const event = events.find(
        (event) =>
          event.event.section === 'bridgeMessages' &&
          event.event.method === 'MessageAccepted',
      );

      return event ? { matched: true, event } : { matched: false };
    },
  };
}

// Destination checker builder
function CheckDestination() {
  return {
    messageQueue: (): DestinationChecker =>
      createDestinationChecker(
        'messageQueue',
        'Processed',
        MatchMessageId().fromMessageQueueId(),
        GetIsSuccess().fromMessageQueueProcessed(),
      ),

    xcmpQueue: (): DestinationChecker => (events, messageId) => {
      // Special handling for xcmpQueue as it needs to check both Success and Fail events
      const matchMessageId = MatchMessageId().fromXcmpQueueHash();

      const successEvent = events.find((event) => {
        if (
          event.event.section !== 'xcmpQueue' ||
          event.event.method !== 'Success'
        ) {
          return false;
        }

        return matchMessageId(event, messageId);
      });

      const failEvent = events.find((event) => {
        if (
          event.event.section !== 'xcmpQueue' ||
          event.event.method !== 'Fail'
        ) {
          return false;
        }

        return matchMessageId(event, messageId);
      });

      if (!successEvent && !failEvent) {
        return { matched: false, success: false };
      }

      // TODO mjm review this
      return {
        matched: true,
        success: !!successEvent,
        event: successEvent || failEvent,
      };
    },

    bridgeMessages: (): DestinationChecker =>
      createDestinationChecker(
        'bridgeMessages',
        'MessagesReceived',
        MatchMessageId().never(),
        GetIsSuccess().alwaysTrue(),
      ),
  };
}

// TODO mjm use?
// interface MethodConfigurableBuilder {
//   messageQueue: () => MonitoringConfig;
//   bridgeMessages: () => MonitoringConfig;
//   // custom: (section: string, method: string) => MonitoringConfig;
// }

// Main MonitoringBuilder
export function MonitoringBuilder() {
  return {
    xcmPallet: () => ({
      messageQueue: () => ({
        checkSource: CheckSource().xcmPallet(),
        checkDestination: CheckDestination().messageQueue(),
      }),
    }),

    polkadotXcm: () => ({
      messageQueue: () => ({
        checkSource: CheckSource().polkadotXcm(),
        checkDestination: CheckDestination().messageQueue(),
      }),
      xcmpQueue: () => ({
        checkSource: CheckSource().polkadotXcmAndXcmpQueue(),
        checkDestination: CheckDestination().xcmpQueue(),
      }),
    }),

    xTokens: () => ({
      messageQueue: () => ({
        checkSource: CheckSource().xTokens(),
        checkDestination: CheckDestination().messageQueue(),
      }),
    }),

    // TODO mjm call ecosystem bridge or something?
    bridgeMessages: () => ({
      bridgeMessages: () => ({
        checkSource: CheckSource().bridgeMessages(),
        checkDestination: CheckDestination().bridgeMessages(),
      }),
    }),
  };
}
