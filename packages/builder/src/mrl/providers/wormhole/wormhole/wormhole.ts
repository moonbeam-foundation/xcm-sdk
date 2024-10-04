import { EvmChain, EvmParachain } from '@moonbeam-network/xcm-types';
import { evmToAddress } from '@polkadot/util-crypto/address';
import { Wormhole } from '@wormhole-foundation/sdk-connect';
import { getExtrinsicAccount } from '../../../../extrinsic/ExtrinsicBuilder.utils';
import type {
  MrlBuilderParams,
  MrlConfigBuilder,
} from '../../../MrlBuilder.interfaces';
import { WormholeConfig, type WormholeFunctionArgs } from './WormholeConfig';
import { wormholeFactory } from './wormholeFactory';

export const GMP_CONTRACT_ADDRESS =
  '0x0000000000000000000000000000000000000816';

export function wormhole() {
  return {
    tokenTransfer: (): MrlConfigBuilder => ({
      build: (params): WormholeConfig => {
        const isDestinationEvmChain = EvmChain.is(params.destination);

        // TODO unify this, this is just as demonstration
        const args = isDestinationEvmChain
          ? generateDemoArgs(params)
          : generateWormholeArgs(params);

        return new WormholeConfig({
          args,
          func: 'tokenTransfer',
        });
      },
    }),
  };
}

export function generateWormholeArgs({
  asset,
  destination,
  destinationAddress,
  isAutomatic,
  moonApi,
  moonChain,
  source,
  sourceAddress,
}: MrlBuilderParams): WormholeFunctionArgs {
  const isNativeAsset = asset.isSame(source.nativeAsset);
  const isDestinationMoonChain = destination.isEqual(moonChain);
  const isDestinationEvmChain = EvmChain.is(destination);
  const tokenAddress = isNativeAsset ? 'native' : asset.address;

  if (!tokenAddress) {
    throw new Error(`Asset ${asset.key} has no address`);
  }

  const wh = wormholeFactory(source);
  const whSource = wh.getChain(source.getWormholeName());
  const whDestination = isDestinationEvmChain
    ? wh.getChain(destination.getWormholeName())
    : wh.getChain(moonChain.getWormholeName());
  const whAsset = Wormhole.tokenId(whSource.chain, tokenAddress);
  const whSourceAddress = Wormhole.chainAddress(whSource.chain, sourceAddress);
  const whDestinationAddress = Wormhole.chainAddress(
    whDestination.chain,
    isDestinationMoonChain || isDestinationEvmChain
      ? destinationAddress
      : GMP_CONTRACT_ADDRESS,
  );

  return [
    whAsset,
    asset.amount,
    whSourceAddress,
    whDestinationAddress,
    isAutomatic,
    isDestinationMoonChain || isDestinationEvmChain
      ? undefined
      : getPayload({ destination, destinationAddress, moonApi }),
  ];
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

// TODO remove this, this is just as demonstration
function generateDemoArgs({
  asset,
  destination,
  destinationAddress,
  isAutomatic,
  moonChain,
  source,
}: MrlBuilderParams): WormholeFunctionArgs {
  const isNativeAsset = asset.isSame(moonChain.nativeAsset);
  const isDestinationEvmChain = EvmChain.is(destination);
  const tokenAddress = isNativeAsset
    ? 'native'
    : moonChain.getChainAsset(asset).address;

  if (!tokenAddress) {
    throw new Error(`Asset ${asset.key} has no address`);
  }

  const wh = wormholeFactory(source);
  const whSource = wh.getChain(moonChain.getWormholeName());
  const whDestination = isDestinationEvmChain
    ? wh.getChain(destination.getWormholeName())
    : wh.getChain(moonChain.getWormholeName());
  const whAsset = Wormhole.tokenId(whSource.chain, tokenAddress);
  const whSourceAddress = Wormhole.chainAddress(
    whSource.chain,
    destinationAddress,
  ); // really it is computedOriginAccount
  const whDestinationAddress = Wormhole.chainAddress(
    whDestination.chain,
    destinationAddress,
  );

  return [
    whAsset,
    asset.amount,
    whSourceAddress,
    whDestinationAddress,
    isAutomatic,
    undefined,
  ];
}
