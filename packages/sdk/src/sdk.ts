/* eslint-disable sort-keys */
import { ConfigBuilder } from '@moonbeam-network/xcm-config';
import { AnyChain, Asset, Ecosystem } from '@moonbeam-network/xcm-types';
import { getTransferData } from './getTransferData';
import { TransferData } from './sdk.interfaces';

export interface SdkTransferParams {
  sourceAddress: string;
  destinationAddress: string;
  keyOrAsset: string | Asset;
  sourceKeyOrChain: string | AnyChain;
  destinationKeyOrChain: string | AnyChain;
}

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
                async destination(destKeyOrChain: string | AnyChain) {
                  return {
                    async addresses(
                      sourceAddress: string,
                      destinationAddress: string,
                    ): Promise<TransferData> {
                      return getTransferData({
                        sourceAddress,
                        destinationAddress,
                        config: destination(destKeyOrChain).build(),
                      });
                    },
                  };
                },
              };
            },
          };
        },
      };
    },
    async transfer({
      destinationAddress,
      destinationKeyOrChain,
      keyOrAsset,
      sourceAddress,
      sourceKeyOrChain,
    }: SdkTransferParams): Promise<TransferData> {
      return getTransferData({
        config: ConfigBuilder()
          .assets()
          .asset(keyOrAsset)
          .source(sourceKeyOrChain)
          .destination(destinationKeyOrChain)
          .build(),
        destinationAddress,
        sourceAddress,
      });
    },
  };
}
