import { EvmChain, EvmParachain, Parachain } from '@moonbeam-network/xcm-types';
import { getMultilocationDerivedAddresses } from '@moonbeam-network/xcm-utils';
import { evmToAddress } from '@polkadot/util-crypto/address';
import { Wormhole } from '@wormhole-foundation/sdk-connect';
import {
  getExtrinsicAccount,
  getExtrinsicArgumentVersion,
} from '../../../../extrinsic/ExtrinsicBuilder.utils';
import { getGlobalConsensus } from '../../../../extrinsic/pallets/polkadotXcm/polkadotXcm.util';
import {
  type MrlBuilderParams,
  type MrlConfigBuilder,
  Provider,
} from '../../../MrlBuilder.interfaces';
import { GMP_CONTRACT_ADDRESS } from '../contract/Gmp';
import { Protocols, WormholeConfig } from './WormholeConfig';
import { wormholeFactory } from './wormholeFactory';

export function wormhole() {
  const provider = Provider.Wormhole;

  return {
    tokenTransfer: (): MrlConfigBuilder => ({
      provider,
      build: ({
        asset,
        destination,
        destinationAddress,
        isAutomatic,
        moonApi,
        bridgeChain,
        source,
        sourceAddress,
      }): WormholeConfig => {
        const isSourceParachain = Parachain.is(source);
        const isDestinationMoonChain = destination.isEqual(bridgeChain);
        const isDestinationEvmChain = EvmChain.is(destination);
        const isNativeAsset = asset.isSame(
          isDestinationEvmChain ? bridgeChain.nativeAsset : source.nativeAsset,
        );
        const tokenAddress = isNativeAsset
          ? 'native'
          : isDestinationEvmChain
            ? bridgeChain.getChainAsset(asset).address
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
          ? wh.getChain(bridgeChain.getWormholeName())
          : wh.getChain(source.getWormholeName());
        const whDestination = isDestinationEvmChain
          ? wh.getChain(destination.getWormholeName())
          : wh.getChain(bridgeChain.getWormholeName());
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
                    bridgeChain,
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
  bridgeChain,
}: Pick<
  MrlBuilderParams,
  'destination' | 'destinationAddress' | 'moonApi' | 'bridgeChain'
>): Uint8Array | undefined {
  const multilocation = getMultilocation({
    destination,
    destinationAddress,
    moonApi,
    bridgeChain,
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
  bridgeChain,
}: Pick<
  MrlBuilderParams,
  'destination' | 'destinationAddress' | 'moonApi' | 'bridgeChain'
>) {
  if (!EvmParachain.isAnyParachain(destination)) {
    throw new Error(
      `Destination ${destination.name} is not a Parachain or EvmParachain`,
    );
  }

  const version = getExtrinsicArgumentVersion(moonApi.tx.polkadotXcm.send);
  const isDifferentEcosystem = destination.ecosystem !== bridgeChain.ecosystem;

  const isEvmDestination = EvmParachain.is(destination);

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
            getExtrinsicAccount(destinationAddress),
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
