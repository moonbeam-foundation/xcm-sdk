// TODO mjm fix the architecture, make it like the other builders. Or is it actually a builder?
// TODO mjm review and remove redundant comments

import type { Bool, U8aFixed } from '@polkadot/types';
import type {
  AccountId32,
  Event,
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
export function XcmCommonPallets() {
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

// TODO mjm too much duplication here. Implement something like address extractor and message id extractor
// Pre-built source checkers
const sourceCheckers = {
  xcmPallet:
    (method = 'Sent'): SourceChecker =>
    (events, sourceAddress) => {
      const decodedSourceAddress = u8aToHex(decodeAddress(sourceAddress));

      const event = events.find((event) => {
        if (
          event.event.section !== 'xcmPallet' ||
          event.event.method !== method
        ) {
          return false;
        }

        try {
          // Extract address from XCM Pallet event with automatic type detection
          const eventData = event.event.data as unknown as XcmEventData;
          const interior = eventData.origin.interior.asX1[0];

          // TODO mjm duplication of Account checking
          let address: string;
          if (interior.isAccountId32) {
            address = interior.asAccountId32.id.toHex();
          } else if (interior.isAccountKey20) {
            address = interior.asAccountKey20.key.toString();
          } else {
            return false; // Unsupported address type
          }

          return address === decodedSourceAddress;
        } catch (error) {
          return false;
        }
      });

      if (!event) {
        return { matched: false };
      }

      // Extract message ID
      const eventData = event.event.data as unknown as XcmEventData;
      const messageId = eventData.messageId.toHex();

      return { matched: true, messageId, event };
    },

  polkadotXcm: (): SourceChecker => (events, sourceAddress) => {
    const decodedSourceAddress = u8aToHex(decodeAddress(sourceAddress));

    const event = events.find((event) => {
      if (
        event.event.section !== 'polkadotXcm' ||
        event.event.method !== 'Sent'
      ) {
        return false;
      }

      try {
        // Extract address from PolkadotXcm event with automatic type detection
        const eventData = event.event.data as unknown as XcmEventData;
        const interior = eventData.origin.interior.asX1[0];

        let address: string;
        if (interior.isAccountId32) {
          address = interior.asAccountId32.id.toHex();
        } else if (interior.isAccountKey20) {
          address = interior.asAccountKey20.key.toString();
        } else {
          return false; // Unsupported address type
        }

        return address === decodedSourceAddress;
      } catch {
        return false;
      }
    });

    if (!event) {
      return { matched: false };
    }

    const eventData = event.event.data as unknown as XcmEventData;
    const messageId = eventData.messageId.toHex();

    return { matched: true, messageId, event };
  },

  polkadotXcmAndXcmpQueue: (): SourceChecker => (events, sourceAddress) => {
    const decodedSourceAddress = u8aToHex(decodeAddress(sourceAddress));

    const polkadotXcmEvent = events.find((event) => {
      if (
        event.event.section !== 'polkadotXcm' ||
        event.event.method !== 'Sent'
      ) {
        return false;
      }

      try {
        // Extract address from PolkadotXcm event with automatic type detection
        const eventData = event.event.data as unknown as XcmEventData;
        const interior = eventData.origin.interior.asX1[0];

        let address: string;
        if (interior.isAccountId32) {
          address = interior.asAccountId32.id.toHex();
        } else if (interior.isAccountKey20) {
          address = interior.asAccountKey20.key.toString();
        } else {
          return false; // Unsupported address type
        }

        return address === decodedSourceAddress;
      } catch {
        return false;
      }
    });

    if (!polkadotXcmEvent) {
      return { matched: false };
    }
    const xcmpEvent = events.find(
      (event) =>
        event.event.section === 'xcmpQueue' &&
        event.event.method === 'XcmpMessageSent',
    );

    if (!polkadotXcmEvent || !xcmpEvent) {
      return { matched: false };
    }

    const eventData = xcmpEvent.event.data as unknown as XcmQueueEventData;
    const messageId = eventData.messageHash.toHex();

    return { matched: true, messageId, event: polkadotXcmEvent };
  },

  xTokens: (): SourceChecker => (events, sourceAddress) => {
    const decodedSourceAddress = u8aToHex(decodeAddress(sourceAddress));

    const xTokensEvent = events.find((event) => {
      if (event.event.section !== 'xTokens') return false;
      if (
        !['TransferredMultiAssets', 'TransferredAssets'].includes(
          event.event.method,
        )
      )
        return false;

      try {
        const eventData = event.event.data as unknown as XTokensEventData;
        const address = u8aToHex(decodeAddress(eventData.sender.toString()));
        return address === decodedSourceAddress;
      } catch (error) {
        return false;
      }
    });

    const xcmpEvent = events.find(
      (event) =>
        event.event.section === 'xcmpQueue' &&
        event.event.method === 'XcmpMessageSent',
    );

    if (!xTokensEvent || !xcmpEvent) {
      return { matched: false };
    }

    // Extract message ID from xcmpQueue event
    const eventData = xcmpEvent.event.data as unknown as XcmQueueEventData;
    const messageId = eventData.messageHash.toHex();

    return { matched: true, messageId, event: xTokensEvent };
  },

  bridgeMessages: (): SourceChecker => (events, sourceAddress) => {
    const event = events.find(
      (event) =>
        event.event.section === 'bridgeMessages' &&
        event.event.method === 'MessageAccepted',
    );

    return event ? { matched: true, event } : { matched: false };
  },
};

// Pre-built destination checkers
const destinationCheckers = {
  messageQueue: (): DestinationChecker => (events, messageId) => {
    const event = events.find((event) => {
      if (
        event.event.section !== 'messageQueue' ||
        event.event.method !== 'Processed'
      ) {
        return false;
      }

      if (messageId) {
        try {
          const eventData = event.event
            .data as unknown as MessageQueueProcessedData;
          return eventData.id.toString() === messageId;
        } catch (error) {
          return false;
        }
      }

      return true;
    });

    if (!event) {
      return { matched: false, success: false };
    }

    try {
      const eventData = event.event
        .data as unknown as MessageQueueProcessedData;
      const success = eventData.success.isTrue;
      return { matched: true, success, event };
    } catch (error) {
      return { matched: true, success: false, event };
    }
  },

  xcmpQueue: (): DestinationChecker => (events, messageId) => {
    const successEvent = events.find((event) => {
      if (
        event.event.section !== 'xcmpQueue' ||
        event.event.method !== 'Success'
      ) {
        return false;
      }

      console.log('successEvent', event.toHuman());

      if (messageId) {
        try {
          const eventData = event.event.data as unknown as XcmQueueEventData;
          return eventData.messageHash.toString() === messageId;
        } catch (error) {
          return false;
        }
      }
      return true;
    });

    const failEvent = events.find(
      (event) =>
        event.event.section === 'xcmpQueue' && event.event.method === 'Fail',
    );

    console.log('failEvent', failEvent?.toHuman());

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

  bridgeMessages: (): DestinationChecker => (events, messageId) => {
    const event = events.find(
      (event) =>
        event.event.section === 'bridgeMessages' &&
        event.event.method === 'MessagesReceived',
    );

    return event
      ? { matched: true, success: true, event }
      : { matched: false, success: false };
  },
};

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
        checkSource: sourceCheckers.xcmPallet(),
        checkDestination: destinationCheckers.messageQueue(),
      }),
    }),

    polkadotXcm: () => ({
      messageQueue: () => ({
        checkSource: sourceCheckers.polkadotXcm(),
        checkDestination: destinationCheckers.messageQueue(),
      }),
      xcmpQueue: () => ({
        checkSource: sourceCheckers.polkadotXcmAndXcmpQueue(),
        checkDestination: destinationCheckers.xcmpQueue(),
      }),
    }),

    xTokens: () => ({
      messageQueue: () => ({
        checkSource: sourceCheckers.xTokens(),
        checkDestination: destinationCheckers.messageQueue(),
      }),
    }),

    // TODO mjm call ecosystem bridge or something?
    bridgeMessages: () => ({
      bridgeMessages: () => ({
        checkSource: sourceCheckers.bridgeMessages(),
        checkDestination: destinationCheckers.bridgeMessages(),
      }),
    }),
  };
}
