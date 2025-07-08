// TODO mjm fix the architecture, make it like the other builders. Or is it actually a builder?

import type { U8aFixed } from '@polkadot/types';
import type { Event } from '@polkadot/types/interfaces';
import type { StagingXcmV5Location } from '@polkadot/types/lookup';

interface XcmEventData {
  origin: StagingXcmV5Location;
  messageId: U8aFixed;
}

// TODO mjm handle try-catches, too bloating
// TODO mjm could be catching somewhere else (in monitoring.ts) or just returning undefined and handling
// TODO mjm add tests
// TODO mjm rename? PolkadotXcm also uses this builder
export function XcmPallet() {
  return {
    getAddress: () => ({
      fromAccountId32: () => (event: Event) => {
        try {
          const eventData = event.data as unknown as XcmEventData;

          return eventData.origin.interior.asX1[0].asAccountId32.id.toHex();
        } catch (error) {
          console.error('Error extracting address from event:', error);
          throw error;
        }
      },
      fromAccountKey20: () => (event: Event) => {
        try {
          const eventData = event.data as unknown as XcmEventData;

          return eventData.origin.interior.asX1[0].asAccountKey20.key.toString();
        } catch (error) {
          console.error('Error extracting address from event:', error);
          throw error;
        }
      },
    }),
    getMessageId: () => ({
      fromMessageId: () => (event: Event) => {
        try {
          const eventData = event.data as unknown as XcmEventData;

          return eventData.messageId.toHex();
        } catch (error) {
          console.error('Error extracting message ID from event:', error);
          throw error;
        }
      },
    }),
  };
}
