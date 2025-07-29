import type { EventRecord } from '@polkadot/types/interfaces';
import { describe, expect, it, vi } from 'vitest';
import { GetIsSuccess, MatchMessageId } from './eventMonitoring';

// Helper function to create mock EventRecord
function createMockEvent(data: any, method?: string): EventRecord {
  return {
    event: {
      data: data as any,
      method: method || 'SomeMethod',
    },
  } as unknown as EventRecord;
}

// Type definitions for complex event data structures
interface MessageQueueProcessedData {
  id: {
    toString(): string;
  };
  success: {
    isTrue: boolean;
  };
}

interface XcmQueueEventData {
  messageHash: {
    toString(): string;
  };
}

interface EthereumXcmEventData {
  xcmMsgHash: {
    toHex(): string;
  };
}

describe('eventMonitoring matchers', () => {
  describe('MatchMessageId', () => {
    describe('fromMessageQueueId', () => {
      it('should return true when messageId is undefined', () => {
        const mockEvent = createMockEvent({});
        const matcher = MatchMessageId().fromMessageQueueId();

        const result = matcher(mockEvent, undefined);

        expect(result).toBe(true);
      });

      it('should return true when messageId is empty string', () => {
        const mockEvent = createMockEvent({});
        const matcher = MatchMessageId().fromMessageQueueId();

        const result = matcher(mockEvent, '');

        expect(result).toBe(true);
      });

      it('should return true when messageId matches event id', () => {
        const mockData: MessageQueueProcessedData = {
          id: {
            toString: vi.fn(() => 'message123'),
          },
          success: { isTrue: true },
        };

        const mockEvent = createMockEvent(mockData);
        const matcher = MatchMessageId().fromMessageQueueId();

        const result = matcher(mockEvent, 'message123');

        expect(result).toBe(true);
        expect(mockData.id.toString).toHaveBeenCalled();
      });

      it('should return false when messageId does not match event id', () => {
        const mockData: MessageQueueProcessedData = {
          id: {
            toString: vi.fn(() => 'message123'),
          },
          success: { isTrue: true },
        };

        const mockEvent = createMockEvent(mockData);
        const matcher = MatchMessageId().fromMessageQueueId();

        const result = matcher(mockEvent, 'different_message');

        expect(result).toBe(false);
        expect(mockData.id.toString).toHaveBeenCalled();
      });

      it('should return false when data extraction fails', () => {
        // Event with malformed data that will cause extraction to throw
        const mockEvent = createMockEvent({ malformed: 'data' });
        const matcher = MatchMessageId().fromMessageQueueId();

        const result = matcher(mockEvent, 'any_message');

        expect(result).toBe(false);
      });

      it('should handle toString() throwing an error', () => {
        const mockData = {
          id: {
            toString: vi.fn(() => {
              throw new Error('toString failed');
            }),
          },
        };

        const mockEvent = createMockEvent(mockData);
        const matcher = MatchMessageId().fromMessageQueueId();

        const result = matcher(mockEvent, 'any_message');

        expect(result).toBe(false);
      });
    });

    describe('fromXcmpQueueHash', () => {
      it('should return true when messageId is undefined', () => {
        const mockEvent = createMockEvent({});
        const matcher = MatchMessageId().fromXcmpQueueHash();

        const result = matcher(mockEvent, undefined);

        expect(result).toBe(true);
      });

      it('should return true when messageId matches messageHash', () => {
        const mockData: XcmQueueEventData = {
          messageHash: {
            toString: vi.fn(() => 'hash456'),
          },
        };

        const mockEvent = createMockEvent(mockData);
        const matcher = MatchMessageId().fromXcmpQueueHash();

        const result = matcher(mockEvent, 'hash456');

        expect(result).toBe(true);
        expect(mockData.messageHash.toString).toHaveBeenCalled();
      });

      it('should return false when messageId does not match messageHash', () => {
        const mockData: XcmQueueEventData = {
          messageHash: {
            toString: vi.fn(() => 'hash456'),
          },
        };

        const mockEvent = createMockEvent(mockData);
        const matcher = MatchMessageId().fromXcmpQueueHash();

        const result = matcher(mockEvent, 'different_hash');

        expect(result).toBe(false);
      });

      it('should return false when data extraction fails', () => {
        const mockEvent = createMockEvent({ invalid: 'structure' });
        const matcher = MatchMessageId().fromXcmpQueueHash();

        const result = matcher(mockEvent, 'any_hash');

        expect(result).toBe(false);
      });
    });

    describe('fromEthereumXcmEvent', () => {
      it('should extract and return message hash hex', () => {
        const mockData: EthereumXcmEventData = {
          xcmMsgHash: {
            toHex: vi.fn(() => '0xabcdef123456'),
          },
        };

        const mockEvent = createMockEvent(mockData);
        const extractor = MatchMessageId().fromEthereumXcmEvent();

        const result = extractor(mockEvent);

        expect(result).toBe('0xabcdef123456');
        expect(mockData.xcmMsgHash.toHex).toHaveBeenCalled();
      });

      it('should throw when data extraction fails', () => {
        const mockEvent = createMockEvent({ malformed: 'data' });
        const extractor = MatchMessageId().fromEthereumXcmEvent();

        expect(() => extractor(mockEvent)).toThrow();
      });
    });
  });

  describe('GetIsSuccess', () => {
    describe('fromMessageQueueProcessed', () => {
      it('should return true when success.isTrue is true', () => {
        const mockData: MessageQueueProcessedData = {
          id: { toString: () => 'id' },
          success: {
            isTrue: true,
          },
        };

        const mockEvent = createMockEvent(mockData);
        const checker = GetIsSuccess().fromMessageQueueProcessed();

        const result = checker(mockEvent);

        expect(result).toBe(true);
      });

      it('should return false when success.isTrue is false', () => {
        const mockData: MessageQueueProcessedData = {
          id: { toString: () => 'id' },
          success: {
            isTrue: false,
          },
        };

        const mockEvent = createMockEvent(mockData);
        const checker = GetIsSuccess().fromMessageQueueProcessed();

        const result = checker(mockEvent);

        expect(result).toBe(false);
      });

      it('should return false when data extraction fails', () => {
        const mockEvent = createMockEvent({ malformed: 'data' });
        const checker = GetIsSuccess().fromMessageQueueProcessed();

        const result = checker(mockEvent);

        expect(result).toBe(false);
      });

      it('should return false when success property is missing', () => {
        const mockData = {
          id: { toString: () => 'id' },
          // missing success property
        };

        const mockEvent = createMockEvent(mockData);
        const checker = GetIsSuccess().fromMessageQueueProcessed();

        const result = checker(mockEvent);

        expect(result).toBe(false);
      });
    });

    describe('fromXcmpQueueEvent', () => {
      it('should return true when event method is Success', () => {
        const mockEvent = createMockEvent({}, 'Success');
        const checker = GetIsSuccess().fromXcmpQueueEvent();

        const result = checker(mockEvent);

        expect(result).toBe(true);
      });

      it('should return false when event method is not Success', () => {
        const mockEvent = createMockEvent({}, 'Failed');
        const checker = GetIsSuccess().fromXcmpQueueEvent();

        const result = checker(mockEvent);

        expect(result).toBe(false);
      });

      it('should return false when event method is undefined', () => {
        const mockEvent = createMockEvent({});
        const checker = GetIsSuccess().fromXcmpQueueEvent();

        const result = checker(mockEvent);

        expect(result).toBe(false);
      });
    });
  });
});
