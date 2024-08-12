/* eslint-disable @typescript-eslint/no-use-before-define */
import { Wormhole } from '@wormhole-foundation/sdk-connect';
import { EvmParachain, Parachain } from '@moonbeam-network/xcm-types';
import { stringToU8a } from '@polkadot/util';
import {
  WormholeConfigBuilder,
  WormholeConfigBuilderPrams,
} from './WormholeBuilder.interfaces';
import { WormholeConfig } from './WormholeConfig';
import { wormholeFactory } from './wormholeFactory';
import { getExtrinsicAccount } from '../extrinsic/ExtrinsicBuilder.utils';
import { evmToAddress } from '@polkadot/util-crypto/address';

export function WormholeBuilder() {
  return {
    tokenTransfer: ({
      isAutomatic,
    }: {
      isAutomatic: boolean;
    }): WormholeConfigBuilder => ({
      build: ({
        asset,
        destination,
        destinationAddress,
        moonChain,
        source,
        sourceAddress,
      }) => {
        const wh = wormholeFactory(source);
        const whSource = wh.getChain(source.getWormholeName());
        const whDestination = wh.getChain(destination.getWormholeName());

        if (!asset.address) {
          throw new Error('Asset address is required');
        }

        const whAsset = Wormhole.tokenId(whSource.chain, asset.address);
        const whSourceAddress = Wormhole.chainAddress(
          whSource.chain,
          sourceAddress,
        );
        const whDestinationAddress = Wormhole.chainAddress(
          whDestination.chain,
          destinationAddress,
        );

        return new WormholeConfig({
          args: [
            whAsset,
            asset.amount,
            whSourceAddress,
            whDestinationAddress,
            isAutomatic,
            getPayload({ destination, destinationAddress, moonChain }),
          ],
          func: 'tokenTransfer',
        });
      },
    }),
  };
}

export function getPayload({
  destination,
  destinationAddress,
  moonChain,
}: Pick<
  WormholeConfigBuilderPrams,
  'destination' | 'destinationAddress' | 'moonChain'
>): Uint8Array | undefined {
  if (destination.isEqual(moonChain)) {
    return undefined;
  }

  if (!Parachain.is(destination) || !EvmParachain.is(destination)) {
    throw new Error(
      `Destination ${destination.name} is not a Parachain or EvmParachain`,
    );
  }

  // TODO: This is workaround for Peaq EVM. Can we improve it so we don't need to have hardcoded values?
  const isPeaqEvm =
    destination.key === 'peaq-evm-Alphanet' || destination.key === 'peaq-evm';

  return stringToU8a(
    JSON.stringify({
      destination: {
        V3: {
          parents: 1,
          interior: {
            X2: [
              {
                Parachain: destination.parachainId,
              },
              getExtrinsicAccount(
                isPeaqEvm
                  ? evmToAddress(destinationAddress)
                  : destinationAddress,
              ),
            ],
          },
        },
      },
    }),
  );
}
