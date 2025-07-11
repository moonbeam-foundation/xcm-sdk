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
import type {
  DestinationChecker,
  EventMonitoringBuilderReturn,
  SourceChecker,
} from './EventMonitoringBuilder.interfaces';

interface MessageQueueProcessedData {
  id: H256;
  origin: CumulusPrimitivesCoreAggregateMessageOrigin;
  weightUsed: unknown;
  success: Bool;
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

// TODO mjm move all this to utils?
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
      (_event: EventRecord, events?: EventRecord[]): string => {
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

    bridgeMessages: (): SourceChecker => (events) => {
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

export function EventMonitoringBuilder(): EventMonitoringBuilderReturn {
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

    bridgeMessages: () => ({
      bridgeMessages: () => ({
        checkSource: CheckSource().bridgeMessages(),
        checkDestination: CheckDestination().bridgeMessages(),
      }),
    }),
  };
}
