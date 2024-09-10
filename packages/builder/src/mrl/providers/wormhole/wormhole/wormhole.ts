/* eslint-disable @typescript-eslint/no-use-before-define */
import { Wormhole } from '@wormhole-foundation/sdk-connect';
import { EvmParachain } from '@moonbeam-network/xcm-types';
import { evmToAddress } from '@polkadot/util-crypto/address';
import { WormholeConfig } from './WormholeConfig';
import { wormholeFactory } from './wormholeFactory';
import { getExtrinsicAccount } from '../../../../extrinsic/ExtrinsicBuilder.utils';
import {
  MrlBuilderParams,
  MrlConfigBuilder,
} from '../../../MrlBuilder.interfaces';

export const GMP_CONTRACT_ADDRESS =
  '0x0000000000000000000000000000000000000816';

export function wormhole() {
  return {
    tokenTransfer: (): MrlConfigBuilder => ({
      build: ({
        asset,
        destination,
        destinationAddress,
        isAutomatic,
        moonApi,
        moonChain,
        source,
        sourceAddress,
      }) => {
        if (!asset.address) {
          throw new Error(`Asset ${asset.key} has no address`);
        }

        const isDestinationMoonChain = destination.isEqual(moonChain);

        const wh = wormholeFactory(source);
        const whSource = wh.getChain(source.getWormholeName());
        const whMoonChain = wh.getChain(moonChain.getWormholeName());
        const whAsset = Wormhole.tokenId(whSource.chain, asset.address);
        const whSourceAddress = Wormhole.chainAddress(
          whSource.chain,
          sourceAddress,
        );
        const whMoonChainAddress = Wormhole.chainAddress(
          whMoonChain.chain,
          isDestinationMoonChain ? destinationAddress : GMP_CONTRACT_ADDRESS,
        );

        return new WormholeConfig({
          args: [
            whAsset,
            asset.amount,
            whSourceAddress,
            whMoonChainAddress,
            isAutomatic,
            isDestinationMoonChain
              ? undefined
              : getPayload({ destination, destinationAddress, moonApi }),
          ],
          func: 'tokenTransfer',
        });
      },
    }),
  };
}

/*
 * Extrinsic to GMP precompile
 * https://docs.moonbeam.network/builders/ethereum/precompiles/interoperability/gmp/
 */
export function getPayload({
  moonApi,
  destination,
  destinationAddress,
}: Pick<MrlBuilderParams, 'destination' | 'destinationAddress' | 'moonApi'>):
  | Uint8Array
  | undefined {
  if (!EvmParachain.isAnyParachain(destination)) {
    throw new Error(
      `Destination ${destination.name} is not a Parachain or EvmParachain`,
    );
  }

  // TODO: This is workaround for Peaq EVM. Can we improve it so we don't need to have hardcoded values?
  const isPeaqEvm =
    destination.key === 'peaq-evm-Alphanet' || destination.key === 'peaq-evm';

  const multilocation = moonApi.createType('XcmVersionedLocation', {
    V3: {
      parents: 1,
      interior: {
        X2: [
          {
            Parachain: destination.parachainId,
          },
          getExtrinsicAccount(
            isPeaqEvm ? evmToAddress(destinationAddress) : destinationAddress,
          ),
        ],
      },
    },
  });
  const action = moonApi.createType('XcmRoutingUserAction', {
    destination: multilocation,
  });
  const versioned = moonApi.createType('VersionedUserAction', {
    V1: action,
  });

  return versioned.toU8a();
}
