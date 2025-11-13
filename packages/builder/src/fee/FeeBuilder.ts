import { gateway } from './gateway';
import { outboundQueueApi } from './outboundQueueApi';
import { xcmPaymentApi } from './xcmPaymentApi';

export function FeeBuilder() {
  return {
    gateway,
    outboundQueueApi,
    xcmPaymentApi,
  };
}
