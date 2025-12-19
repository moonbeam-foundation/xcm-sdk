import { EvmChain, EvmParachain } from '@moonbeam-network/xcm-types';
import { ContractConfig } from '../..';
import { GATEWAY_ABI } from '../../mrl/providers/snowbridge/snowbridge/SnowbridgeConstants';
import type { BridgeFeeConfigBuilder } from '../FeeBuilder.interfaces';

export function gateway() {
  return {
    quoteSendTokenFee(): BridgeFeeConfigBuilder {
      return {
        build: ({ asset, destination, source, bridgeChainFee }) => {
          if (!asset.address) {
            throw new Error(`Asset ${asset.key} has no address`);
          }

          if (!EvmChain.is(source) || !source.contracts?.Gateway) {
            throw new Error(
              'Source must be an EVMChain with the Gateway contract address configured for getting the quote send token fee for Gateway module',
            );
          }

          if (!EvmParachain.isAnyParachain(destination)) {
            throw new Error(
              'Destination must be a Parachain or EvmParachain for getting the quote send token fee for Gateway module',
            );
          }

          return new ContractConfig({
            address: source.contracts.Gateway,
            abi: GATEWAY_ABI,
            args: [
              asset.address,
              destination.parachainId,
              bridgeChainFee.amount,
            ],
            func: 'quoteSendTokenFee',
            module: 'Gateway',
          });
        },
      };
    },
  };
}
