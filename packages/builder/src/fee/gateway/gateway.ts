import { EvmParachain } from '@moonbeam-network/xcm-types';
import { ContractConfig } from '../..';
import {
  GATEWAY_ABI,
  GATEWAY_CONTRACT_ADDRESS,
} from '../../mrl/providers/snowbridge/snowbridge/SnowbridgeConstants';
import type { BridgeFeeConfigBuilder } from '../FeeBuilder.interfaces';

// TODO mjm tests for this?
export function gateway() {
  return {
    quoteSendTokenFee(): BridgeFeeConfigBuilder {
      return {
        build: ({ asset, destination }) => {
          if (!asset.address) {
            throw new Error(`Asset ${asset.key} has no address`);
          }

          if (!EvmParachain.isAnyParachain(destination)) {
            throw new Error(
              'Destination must be a Parachain or EvmParachain for getting the quote send token fee for Gateway module',
            );
          }

          return new ContractConfig({
            address: GATEWAY_CONTRACT_ADDRESS,
            abi: GATEWAY_ABI,
            args: [asset.address, destination.parachainId, 0n],
            func: 'quoteSendTokenFee',
            module: 'Gateway',
          });
        },
      };
    },
  };
}
