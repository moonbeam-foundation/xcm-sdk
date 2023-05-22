/* eslint-disable sort-keys */
import { ConfigBuilder } from '@moonbeam-network/xcm-config';
import { AnyChain, Asset, Ecosystem } from '@moonbeam-network/xcm-types';
import { getTransferData } from './getTransferData';
import { Signers, TransferData } from './sdk.interfaces';

export interface SdkOptions extends Partial<Signers> {}

export function Sdk(options?: SdkOptions) {
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
                      signers?: Partial<Signers>,
                    ): Promise<TransferData> {
                      return getTransferData({
                        ...options,
                        ...signers,
                        destinationAddress,
                        sourceAddress,
                        transferConfig: destination(destKeyOrChain).build(),
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
      ethersSigner,
      keyOrAsset,
      polkadotSigner,
      sourceAddress,
      sourceKeyOrChain,
    }: SdkTransferParams): Promise<TransferData> {
      return getTransferData({
        destinationAddress,
        ethersSigner,
        polkadotSigner,
        sourceAddress,
        transferConfig: ConfigBuilder()
          .assets()
          .asset(keyOrAsset)
          .source(sourceKeyOrChain)
          .destination(destinationKeyOrChain)
          .build(),
      });
    },
  };
}

export interface SdkTransferParams extends Signers {
  destinationAddress: string;
  destinationKeyOrChain: string | AnyChain;
  keyOrAsset: string | Asset;
  sourceAddress: string;
  sourceKeyOrChain: string | AnyChain;
}
