import { EvmChain, EvmParachain, Parachain } from '@moonbeam-network/xcm-types';
import { getMultilocationDerivedAddresses } from '@moonbeam-network/xcm-utils';
import { evmToAddress } from '@polkadot/util-crypto/address';
import { Wormhole } from '@wormhole-foundation/sdk-connect';
import { getExtrinsicAccount } from '../../../../extrinsic/ExtrinsicBuilder.utils';
import type {
  MrlBuilderParams,
  MrlConfigBuilder,
} from '../../../MrlBuilder.interfaces';
import { GMP_CONTRACT_ADDRESS } from '../contract/Gmp';
import { WormholeConfig } from './WormholeConfig';
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
          args: [
            whAsset,
            asset.amount,
            whSourceAddress,
            whDestinationAddress,
            isAutomatic,
            isDestinationMoonChain || isDestinationEvmChain
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
