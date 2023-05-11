/* eslint-disable sort-keys */
import { ConfigBuilder } from '@moonbeam-network/xcm-config';
import { AnyChain, Asset, Ecosystem } from '@moonbeam-network/xcm-types';
import { TransferData } from './sdk.interfaces';
import { getTransferData } from './sdk.utils';

export function Sdk() {
  return {
    assets(ecosystem?: Ecosystem) {
      const { assets, asset } = ConfigBuilder().assets(ecosystem);

      return {
        assets,
        asset(keyOrAsset: string | Asset) {
          const { sourceChains, source } = asset(keyOrAsset);

          return {
            sourceChains,
            source(keyOrChain: string | AnyChain) {
              const { destinationChains, destination } = source(keyOrChain);

              return {
                destinationChains,
                async destination(
                  // eslint-disable-next-line @typescript-eslint/no-shadow
                  keyOrChain: string | AnyChain,
                ): Promise<TransferData> {
                  return getTransferData(destination(keyOrChain).build());
                },
              };
            },
          };
        },
      };
    },
    async transfer(
      keyOrAsset: string | Asset,
      sourceKeyOrChain: string | AnyChain,
      destinationKeyOrChain: string | AnyChain,
    ): Promise<TransferData> {
      return getTransferData(
        ConfigBuilder()
          .assets()
          .asset(keyOrAsset)
          .source(sourceKeyOrChain)
          .destination(destinationKeyOrChain)
          .build(),
      );
    },
  };
}
