import type { EventRecord } from '@polkadot/types/interfaces';
import { describe, expect, it, vi } from 'vitest';
import { GetAddress, GetMessageId } from './eventMonitoring';

// Helper function to create mock EventRecord
function createMockEvent(data: any): EventRecord {
  return {
    event: {
      data: data as any,
    },
  } as unknown as EventRecord;
}

// Type definitions for complex event data structures
interface XcmEventData {
  origin: {
    interior: {
      asX1: Array<{
        isAccountId32: boolean;
        isAccountKey20: boolean;
        asAccountId32: {
          id: {
            toHex(): string;
          };
        };
        asAccountKey20: {
          key: {
            toString(): string;
          };
        };
      }>;
    };
  };
  messageId: {
    toHex(): string;
  };
}

interface XTokensEventData {
  sender: {
    toString(): string;
  };
}

interface XcmQueueEventData {
  messageHash: {
    toHex(): string;
  };
}

describe('eventMonitoring extractors', () => {
  describe('GetAddress', () => {
    describe('fromXcmEvent', () => {
      it('should extract address from AccountId32 interior', () => {
        const mockData: XcmEventData = {
          origin: {
            interior: {
              asX1: [
                {
                  isAccountId32: true,
                  isAccountKey20: false,
                  asAccountId32: {
                    id: {
                      toHex: vi.fn(
                        () =>
                          '0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d',
                      ),
                    },
                  },
                  asAccountKey20: {} as any,
                },
              ],
            },
          },
          messageId: {} as any,
        };

        const mockEvent = createMockEvent(mockData);
        const extractor = GetAddress().fromXcmEvent();
        const result = extractor(mockEvent);

        expect(result).toBe(
          '0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d',
        );
        expect(
          mockData.origin.interior.asX1[0].asAccountId32.id.toHex,
        ).toHaveBeenCalled();
      });

      it('should extract address from AccountKey20 interior', () => {
        const mockData: XcmEventData = {
          origin: {
            interior: {
              asX1: [
                {
                  isAccountId32: false,
                  isAccountKey20: true,
                  asAccountId32: {} as any,
                  asAccountKey20: {
                    key: {
                      toString: vi.fn(
                        () => '0x1234567890abcdef1234567890abcdef12345678',
                      ),
                    },
                  },
                },
              ],
            },
          },
          messageId: {} as any,
        };

        const mockEvent = createMockEvent(mockData);
        const extractor = GetAddress().fromXcmEvent();
        const result = extractor(mockEvent);

        expect(result).toBe('0x1234567890abcdef1234567890abcdef12345678');
        expect(
          mockData.origin.interior.asX1[0].asAccountKey20.key.toString,
        ).toHaveBeenCalled();
      });

      it('should throw error for unsupported address type', () => {
        const mockData: XcmEventData = {
          origin: {
            interior: {
              asX1: [
                {
                  isAccountId32: false,
                  isAccountKey20: false,
                  asAccountId32: {} as any,
                  asAccountKey20: {} as any,
                },
              ],
            },
          },
          messageId: {} as any,
        };

        const mockEvent = createMockEvent(mockData);
        const extractor = GetAddress().fromXcmEvent();

        expect(() => extractor(mockEvent)).toThrow('Unsupported address type');
      });
    });

    describe('fromXTokensEvent', () => {
      it('should extract and decode address from XTokens event', () => {
        const mockData: XTokensEventData = {
          sender: {
            toString: vi.fn(
              () => '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
            ),
          },
        };

        const mockEvent = createMockEvent(mockData);
        const extractor = GetAddress().fromXTokensEvent();
        const result = extractor(mockEvent);

        expect(result).toBe(
          '0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d',
        );
        expect(mockData.sender.toString).toHaveBeenCalled();
      });
    });
  });

  describe('GetMessageId', () => {
    describe('fromXcmEvent', () => {
      it('should extract message ID from XCM event', () => {
        const mockData: XcmEventData = {
          messageId: {
            toHex: vi.fn(
              () =>
                '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
            ),
          },
          origin: {} as any,
        };

        const mockEvent = createMockEvent(mockData);
        const extractor = GetMessageId().fromXcmEvent();
        const result = extractor(mockEvent);

        expect(result).toBe(
          '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        );
        expect(mockData.messageId.toHex).toHaveBeenCalled();
      });
    });

    describe('fromXcmpQueue', () => {
      it('should find and extract message hash from XcmpMessageSent event', () => {
        const targetEventData: XcmQueueEventData = {
          messageHash: {
            toHex: vi.fn(
              () =>
                '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            ),
          },
        };

        const targetEvent = {
          event: {
            section: 'xcmpQueue',
            method: 'XcmpMessageSent',
            data: targetEventData,
          },
        } as unknown as EventRecord;

        const otherEvent = {
          event: {
            section: 'system',
            method: 'ExtrinsicSuccess',
            data: {},
          },
        } as unknown as EventRecord;

        const events = [otherEvent, targetEvent];
        const extractor = GetMessageId().fromXcmpQueue();
        const result = extractor(otherEvent, events);

        expect(result).toBe(
          '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        );
        expect(targetEventData.messageHash.toHex).toHaveBeenCalled();
      });

      it('should throw error when XcmpMessageSent event is not found', () => {
        const events = [
          {
            event: {
              section: 'system',
              method: 'ExtrinsicSuccess',
              data: {},
            },
          } as unknown as EventRecord,
          {
            event: {
              section: 'balances',
              method: 'Transfer',
              data: {},
            },
          } as unknown as EventRecord,
        ];

        const extractor = GetMessageId().fromXcmpQueue();

        expect(() => extractor(events[0], events)).toThrow(
          'XcmpMessageSent event not found',
        );
      });

      it('should handle empty events array', () => {
        const extractor = GetMessageId().fromXcmpQueue();
        const dummyEvent = {} as EventRecord;

        expect(() => extractor(dummyEvent, [])).toThrow(
          'XcmpMessageSent event not found',
        );
      });

      it('should handle undefined events array', () => {
        const extractor = GetMessageId().fromXcmpQueue();
        const dummyEvent = {} as EventRecord;

        expect(() => extractor(dummyEvent, undefined)).toThrow(
          'XcmpMessageSent event not found',
        );
      });

      it('should find correct event when multiple xcmpQueue events exist', () => {
        const wrongEvent = {
          event: {
            section: 'xcmpQueue',
            method: 'Success',
            data: {},
          },
        } as unknown as EventRecord;

        const correctEventData: XcmQueueEventData = {
          messageHash: {
            toHex: vi.fn(() => '0x_correct_message_hash'),
          },
        };

        const correctEvent = {
          event: {
            section: 'xcmpQueue',
            method: 'XcmpMessageSent',
            data: correctEventData,
          },
        } as unknown as EventRecord;

        const events = [wrongEvent, correctEvent];
        const extractor = GetMessageId().fromXcmpQueue();
        const result = extractor(wrongEvent, events);

        expect(result).toBe('0x_correct_message_hash');
        expect(correctEventData.messageHash.toHex).toHaveBeenCalled();
      });
    });
  });
});
