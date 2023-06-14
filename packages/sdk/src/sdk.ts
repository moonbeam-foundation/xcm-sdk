/* eslint-disable sort-keys */
import { ConfigBuilder } from '@moonbeam-network/xcm-config';
import { AnyChain, Asset, Ecosystem } from '@moonbeam-network/xcm-types';
import { getTransferData as gtd } from './getTransferData/getTransferData';
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
                destination(destKeyOrChain: string | AnyChain) {
                  return {
                    async accounts(
                      sourceAddress: string,
                      destinationAddress: string,
                      signers?: Partial<Signers>,
                    ): Promise<TransferData> {
                      return gtd({
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
    async getTransferData({
      destinationAddress,
      destinationKeyOrChain,
      ethersSigner,
      keyOrAsset,
      polkadotSigner,
      sourceAddress,
      sourceKeyOrChain,
    }: SdkTransferParams): Promise<TransferData> {
      return gtd({
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

export interface SdkTransferParams extends Partial<Signers> {
  destinationAddress: string;
  destinationKeyOrChain: string | AnyChain;
  keyOrAsset: string | Asset;
  sourceAddress: string;
  sourceKeyOrChain: string | AnyChain;
}
