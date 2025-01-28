import { Batch } from './Batch';
import { Gmp } from './Gmp';
import { TokenBridge } from './TokenBridge';
import { TokenBridgeRelayer } from './TokenBridgeRelayer';

export function contract() {
  return { Batch, Gmp, TokenBridge, TokenBridgeRelayer };
}
