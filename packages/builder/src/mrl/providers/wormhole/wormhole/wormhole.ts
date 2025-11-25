import { EvmChain, EvmParachain, Parachain } from '@moonbeam-network/xcm-types';
import { getMultilocationDerivedAddresses } from '@moonbeam-network/xcm-utils';
import { evmToAddress } from '@polkadot/util-crypto/address';
import { Wormhole } from '@wormhole-foundation/sdk-connect';
import {
  getExtrinsicAccount,
  getExtrinsicArgumentVersion,
} from '../../../../extrinsic/ExtrinsicBuilder.utils';
import { getGlobalConsensus } from '../../../../extrinsic/pallets/polkadotXcm/polkadotXcm.util';
import type {
  MrlBuilderParams,
  MrlConfigBuilder,
} from '../../../MrlBuilder.interfaces';
import { GMP_CONTRACT_ADDRESS } from '../contract/Gmp';
import { Protocols, WormholeConfig } from './WormholeConfig';
import { wormholeFactory } from './wormholeFactory';

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
      }): WormholeConfig => {
        const isSourceParachain = Parachain.is(source);
        const isDestinationMoonChain = destination.isEqual(moonChain);
        const isDestinationEvmChain = EvmChain.is(destination);
        const isNativeAsset = asset.isSame(
          isDestinationEvmChain ? moonChain.nativeAsset : source.nativeAsset,
        );
        const tokenAddress = isNativeAsset
          ? 'native'
          : isDestinationEvmChain
            ? moonChain.getChainAsset(asset).address
            : asset.address;

        const { address20: computedOriginAccount } =
          getMultilocationDerivedAddresses({
            address: sourceAddress,
            paraId: isSourceParachain ? source.parachainId : undefined,
            isParents: true,
          });

        if (!tokenAddress) {
          throw new Error(`Asset ${asset.key} has no address`);
        }

        const wh = wormholeFactory(source);
        const whSource = isDestinationEvmChain
          ? wh.getChain(moonChain.getWormholeName())
          : wh.getChain(source.getWormholeName());
        const whDestination = isDestinationEvmChain
          ? wh.getChain(destination.getWormholeName())
          : wh.getChain(moonChain.getWormholeName());
        const whAsset = Wormhole.tokenId(whSource.chain, tokenAddress);
        const whSourceAddress = Wormhole.chainAddress(
          whSource.chain,
          isDestinationEvmChain ? computedOriginAccount : sourceAddress,
        );
        const whDestinationAddress = Wormhole.chainAddress(
          whDestination.chain,
          isDestinationMoonChain || isDestinationEvmChain
            ? destinationAddress
            : GMP_CONTRACT_ADDRESS,
        );

        return new WormholeConfig({
          args: {
            token: whAsset,
            amount: asset.amount,
            from: whSourceAddress,
            to: whDestinationAddress,
            protocol: isAutomatic
              ? Protocols.AutomaticTokenBridge
              : Protocols.TokenBridge,
            payload:
              isDestinationMoonChain || isDestinationEvmChain
                ? undefined
                : getPayload({
                    destination,
                    destinationAddress,
                    moonApi,
                    moonChain,
                  }),
          },
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
  moonChain,
}: Pick<
  MrlBuilderParams,
  'destination' | 'destinationAddress' | 'moonApi' | 'moonChain'
>): Uint8Array | undefined {
  const multilocation = getMultilocation({
    destination,
    destinationAddress,
    moonApi,
    moonChain,
  });

  console.log('multilocation', multilocation.toHuman());
  const action = moonApi.createType('XcmRoutingUserAction', {
    destination: multilocation,
  });
  const versioned = moonApi.createType('VersionedUserAction', {
    V1: action,
  });

  return versioned.toU8a();
}

export function getMultilocation({
  moonApi,
  destination,
  destinationAddress,
  moonChain,
}: Pick<
  MrlBuilderParams,
  'destination' | 'destinationAddress' | 'moonApi' | 'moonChain'
>) {
  if (!EvmParachain.isAnyParachain(destination)) {
    throw new Error(
      `Destination ${destination.name} is not a Parachain or EvmParachain`,
    );
  }

  const version = getExtrinsicArgumentVersion(moonApi.tx.polkadotXcm.send);
  const isDifferentEcosystem = destination.ecosystem !== moonChain.ecosystem;
  const isEvmDestination = EvmParachain.is(destination);
  console.log('destination', destination);
  console.log('isEvmDestination', isEvmDestination);
  console.log('destinationAddress', destinationAddress);
  console.log(
    'evmToAddress(destinationAddress)',
    evmToAddress(destinationAddress),
  );

  if (isDifferentEcosystem) {
    return moonApi.createType('XcmVersionedLocation', {
      [version]: {
        parents: 2,
        interior: {
          X3: [
            {
              GlobalConsensus: getGlobalConsensus(destination),
            },
            {
              Parachain: destination.parachainId,
            },
            // wrong
            getExtrinsicAccount(
              isEvmDestination
                ? evmToAddress(destinationAddress)
                : destinationAddress,
            ),
          ],
        },
      },
    });
  }

  return moonApi.createType('XcmVersionedLocation', {
    [version]: {
      parents: 1,
      interior: {
        X2: [
          {
            Parachain: destination.parachainId,
          },
          getExtrinsicAccount(
            isEvmDestination
              ? evmToAddress(destinationAddress)
              : destinationAddress,
          ),
        ],
      },
    },
  });
}
