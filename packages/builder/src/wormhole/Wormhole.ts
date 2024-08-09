import { Wormhole } from '@wormhole-foundation/sdk-connect';
import { WormholeConfigBuilder } from './WormholeBuilder.interfaces';
import { WormholeConfig } from './WormholeConfig';
import { wormholeFactory } from './wormholeFactory';

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
        payload,
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
            payload,
          ],
          func: 'tokenTransfer',
        });
      },
    }),
  };
}
