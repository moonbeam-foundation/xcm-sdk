import { Batch } from './Batch';
import { TokenBridge } from './TokenBridge';
import { TokenBridgeRelayer } from './TokenBridgeRelayer';

export function contract() {
  return { Batch, TokenBridge, TokenBridgeRelayer };
}
