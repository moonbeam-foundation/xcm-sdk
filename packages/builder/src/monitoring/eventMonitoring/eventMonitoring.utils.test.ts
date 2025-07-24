import type { EventRecord } from '@polkadot/types/interfaces';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createDestinationChecker,
  createSourceChecker,
} from './eventMonitoring.utils';

// Mock @polkadot/util functions for unit tests
vi.mock('@polkadot/util', () => ({
  u8aToHex: vi.fn((input) => `0x${input.toString()}`),
}));

vi.mock('@polkadot/util-crypto', () => ({
  decodeAddress: vi.fn((address) => address.replace('0x', '')),
}));

describe('eventMonitoring.utils', () => {
  describe('createSourceChecker', () => {
    const mockEvent: EventRecord = {
      event: {
        section: 'xcmPallet',
        method: 'Sent',
        data: {},
      },
    } as EventRecord;

    const mockEvents: EventRecord[] = [mockEvent];
    const sourceAddress = '0x7ACB5055C5341b9Bab04a18247E7fEAF64347409';
    const decodedAddress = '0x7ACB5055C5341b9Bab04a18247E7fEAF64347409';

    const mockAddressExtractor = vi.fn((_event: EventRecord) => decodedAddress);
    const mockMessageIdExtractor = vi.fn((_event: EventRecord) => 'message123');

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should match event and return messageId when everything succeeds', () => {
      const sourceChecker = createSourceChecker(
        'xcmPallet',
        'Sent',
        mockAddressExtractor,
        mockMessageIdExtractor,
      );

      const result = sourceChecker(mockEvents, sourceAddress);

      expect(result).toEqual({
        matched: true,
        messageId: 'message123',
        event: mockEvent,
      });
      expect(mockAddressExtractor).toHaveBeenCalledWith(mockEvent);
      expect(mockMessageIdExtractor).toHaveBeenCalledWith(
        mockEvent,
        mockEvents,
      );
    });

    it('should match event but return without messageId when messageId extraction fails', () => {
      const failingMessageIdExtractor = vi.fn(() => {
        throw new Error('Failed to extract messageId');
      });

      const sourceChecker = createSourceChecker(
        'xcmPallet',
        'Sent',
        mockAddressExtractor,
        failingMessageIdExtractor,
      );

      const result = sourceChecker(mockEvents, sourceAddress);

      expect(result).toEqual({
        matched: true,
        event: mockEvent,
      });
      expect(mockAddressExtractor).toHaveBeenCalledWith(mockEvent);
      expect(failingMessageIdExtractor).toHaveBeenCalledWith(
        mockEvent,
        mockEvents,
      );
    });

    it('should not match when event section is different', () => {
      const sourceChecker = createSourceChecker(
        'polkadotXcm',
        'Sent',
        mockAddressExtractor,
        mockMessageIdExtractor,
      );

      const result = sourceChecker(mockEvents, sourceAddress);

      expect(result).toEqual({ matched: false });
      expect(mockAddressExtractor).not.toHaveBeenCalled();
      expect(mockMessageIdExtractor).not.toHaveBeenCalled();
    });

    it('should not match when event method is different', () => {
      const sourceChecker = createSourceChecker(
        'xcmPallet',
        'Failed',
        mockAddressExtractor,
        mockMessageIdExtractor,
      );

      const result = sourceChecker(mockEvents, sourceAddress);

      expect(result).toEqual({ matched: false });
      expect(mockAddressExtractor).not.toHaveBeenCalled();
      expect(mockMessageIdExtractor).not.toHaveBeenCalled();
    });

    it('should match when method is in array of methods', () => {
      const sourceChecker = createSourceChecker(
        'xcmPallet',
        ['Sent', 'Failed'],
        mockAddressExtractor,
        mockMessageIdExtractor,
      );

      const result = sourceChecker(mockEvents, sourceAddress);

      expect(result).toEqual({
        matched: true,
        messageId: 'message123',
        event: mockEvent,
      });
    });

    it('should not match when method is not in array of methods', () => {
      const sourceChecker = createSourceChecker(
        'xcmPallet',
        ['Failed', 'Success'],
        mockAddressExtractor,
        mockMessageIdExtractor,
      );

      const result = sourceChecker(mockEvents, sourceAddress);

      expect(result).toEqual({ matched: false });
    });

    it('should not match when address extraction throws error', () => {
      const failingAddressExtractor = vi.fn(() => {
        throw new Error('Failed to extract address');
      });

      const sourceChecker = createSourceChecker(
        'xcmPallet',
        'Sent',
        failingAddressExtractor,
        mockMessageIdExtractor,
      );

      const result = sourceChecker(mockEvents, sourceAddress);

      expect(result).toEqual({ matched: false });
      expect(failingAddressExtractor).toHaveBeenCalledWith(mockEvent);
      expect(mockMessageIdExtractor).not.toHaveBeenCalled();
    });

    it('should not match when extracted address does not match source address', () => {
      const differentAddressExtractor = vi.fn(() => '0x_different_address');

      const sourceChecker = createSourceChecker(
        'xcmPallet',
        'Sent',
        differentAddressExtractor,
        mockMessageIdExtractor,
      );

      const result = sourceChecker(mockEvents, sourceAddress);

      expect(result).toEqual({ matched: false });
      expect(differentAddressExtractor).toHaveBeenCalledWith(mockEvent);
      expect(mockMessageIdExtractor).not.toHaveBeenCalled();
    });

    it('should handle empty events array', () => {
      const sourceChecker = createSourceChecker(
        'xcmPallet',
        'Sent',
        mockAddressExtractor,
        mockMessageIdExtractor,
      );

      const result = sourceChecker([], sourceAddress);

      expect(result).toEqual({ matched: false });
      expect(mockAddressExtractor).not.toHaveBeenCalled();
      expect(mockMessageIdExtractor).not.toHaveBeenCalled();
    });
  });

  describe('createDestinationChecker', () => {
    const mockEvent: EventRecord = {
      event: {
        section: 'xcmPallet',
        method: 'Success',
        data: {},
      },
    } as EventRecord;

    const mockEvents: EventRecord[] = [mockEvent];
    const messageId = 'message123';

    const mockMatchMessageId = vi.fn(
      (_event: EventRecord, msgId?: string) => msgId === messageId,
    );
    const mockGetIsSuccess = vi.fn((_event: EventRecord) => true);

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should match event and return success=true when conditions are met', () => {
      const destinationChecker = createDestinationChecker(
        'xcmPallet',
        'Success',
        mockMatchMessageId,
        mockGetIsSuccess,
      );

      const result = destinationChecker(mockEvents, messageId);

      expect(result).toEqual({
        matched: true,
        success: true,
        event: mockEvent,
      });
      expect(mockMatchMessageId).toHaveBeenCalledWith(mockEvent, messageId);
      expect(mockGetIsSuccess).toHaveBeenCalledWith(mockEvent);
    });

    it('should match event and return success=false when getIsSuccess returns false', () => {
      const mockGetIsSuccessFalse = vi.fn(() => false);

      const destinationChecker = createDestinationChecker(
        'xcmPallet',
        'Success',
        mockMatchMessageId,
        mockGetIsSuccessFalse,
      );

      const result = destinationChecker(mockEvents, messageId);

      expect(result).toEqual({
        matched: true,
        success: false,
        event: mockEvent,
      });
      expect(mockMatchMessageId).toHaveBeenCalledWith(mockEvent, messageId);
      expect(mockGetIsSuccessFalse).toHaveBeenCalledWith(mockEvent);
    });

    it('should not match when event section is different', () => {
      const destinationChecker = createDestinationChecker(
        'polkadotXcm',
        'Success',
        mockMatchMessageId,
        mockGetIsSuccess,
      );

      const result = destinationChecker(mockEvents, messageId);

      expect(result).toEqual({ matched: false, success: false });
      expect(mockMatchMessageId).not.toHaveBeenCalled();
      expect(mockGetIsSuccess).not.toHaveBeenCalled();
    });

    it('should not match when event method is different', () => {
      const destinationChecker = createDestinationChecker(
        'xcmPallet',
        'Failed',
        mockMatchMessageId,
        mockGetIsSuccess,
      );

      const result = destinationChecker(mockEvents, messageId);

      expect(result).toEqual({ matched: false, success: false });
      expect(mockMatchMessageId).not.toHaveBeenCalled();
      expect(mockGetIsSuccess).not.toHaveBeenCalled();
    });

    it('should match when method is in array of methods', () => {
      const destinationChecker = createDestinationChecker(
        'xcmPallet',
        ['Success', 'Failed'],
        mockMatchMessageId,
        mockGetIsSuccess,
      );

      const result = destinationChecker(mockEvents, messageId);

      expect(result).toEqual({
        matched: true,
        success: true,
        event: mockEvent,
      });
    });

    it('should not match when method is not in array of methods', () => {
      const destinationChecker = createDestinationChecker(
        'xcmPallet',
        ['Failed', 'Timeout'],
        mockMatchMessageId,
        mockGetIsSuccess,
      );

      const result = destinationChecker(mockEvents, messageId);

      expect(result).toEqual({ matched: false, success: false });
    });

    it('should not match when messageId does not match', () => {
      const mockMatchMessageIdFalse = vi.fn(() => false);

      const destinationChecker = createDestinationChecker(
        'xcmPallet',
        'Success',
        mockMatchMessageIdFalse,
        mockGetIsSuccess,
      );

      const result = destinationChecker(mockEvents, messageId);

      expect(result).toEqual({ matched: false, success: false });
      expect(mockMatchMessageIdFalse).toHaveBeenCalledWith(
        mockEvent,
        messageId,
      );
      expect(mockGetIsSuccess).not.toHaveBeenCalled();
    });

    it('should handle empty events array', () => {
      const destinationChecker = createDestinationChecker(
        'xcmPallet',
        'Success',
        mockMatchMessageId,
        mockGetIsSuccess,
      );

      const result = destinationChecker([], messageId);

      expect(result).toEqual({ matched: false, success: false });
      expect(mockMatchMessageId).not.toHaveBeenCalled();
      expect(mockGetIsSuccess).not.toHaveBeenCalled();
    });

    it('should handle undefined messageId', () => {
      const mockMatchMessageIdForUndefined = vi.fn(
        (_event: EventRecord, msgId?: string) => msgId === undefined,
      );

      const destinationChecker = createDestinationChecker(
        'xcmPallet',
        'Success',
        mockMatchMessageIdForUndefined,
        mockGetIsSuccess,
      );

      const result = destinationChecker(mockEvents, undefined);

      expect(result).toEqual({
        matched: true,
        success: true,
        event: mockEvent,
      });
      expect(mockMatchMessageIdForUndefined).toHaveBeenCalledWith(
        mockEvent,
        undefined,
      );
      expect(mockGetIsSuccess).toHaveBeenCalledWith(mockEvent);
    });

    it('should handle multiple events and find the correct one', () => {
      const mockEvent2: EventRecord = {
        event: {
          section: 'xcmPallet',
          method: 'Success',
          data: {},
        },
      } as EventRecord;

      const mockMatchMessageIdSelective = vi.fn(
        (event: EventRecord, msgId?: string) =>
          event === mockEvent2 && msgId === messageId,
      );

      const multipleEvents = [mockEvent, mockEvent2];

      const destinationChecker = createDestinationChecker(
        'xcmPallet',
        'Success',
        mockMatchMessageIdSelective,
        mockGetIsSuccess,
      );

      const result = destinationChecker(multipleEvents, messageId);

      expect(result).toEqual({
        matched: true,
        success: true,
        event: mockEvent2,
      });
      expect(mockMatchMessageIdSelective).toHaveBeenCalledWith(
        mockEvent,
        messageId,
      );
      expect(mockMatchMessageIdSelective).toHaveBeenCalledWith(
        mockEvent2,
        messageId,
      );
      expect(mockGetIsSuccess).toHaveBeenCalledWith(mockEvent2);
    });
  });
});
