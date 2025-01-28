import type { AnyChain } from '@moonbeam-network/xcm-types';
import { Wormhole } from '@wormhole-foundation/sdk-connect';
import { EvmPlatform } from '@wormhole-foundation/sdk-evm';

export function wormholeFactory(chain: AnyChain) {
  return new Wormhole(chain.isTestChain ? 'Testnet' : 'Mainnet', [EvmPlatform]);
}
