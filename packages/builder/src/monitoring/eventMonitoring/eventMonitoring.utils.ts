import type { EventRecord } from '@polkadot/types/interfaces';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import type {
  DestinationChecker,
  SourceChecker,
} from './eventMonitoring.interfaces';

export const createSourceChecker =
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

export const createDestinationChecker =
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
