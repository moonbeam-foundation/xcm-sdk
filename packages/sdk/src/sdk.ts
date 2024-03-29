/* eslint-disable sort-keys */
import {
  ConfigBuilder,
  ConfigService,
  IConfigService,
} from '@moonbeam-network/xcm-config';
import { AnyChain, Asset, Ecosystem } from '@moonbeam-network/xcm-types';
import { getTransferData as gtd } from './getTransferData/getTransferData';
import { Signers, TransferData } from './sdk.interfaces';

export interface SdkOptions extends Partial<Signers> {
  configService?: IConfigService;
}

export function Sdk(options?: SdkOptions) {
  const configService = options?.configService ?? new ConfigService();

  return {
    assets(ecosystem?: Ecosystem) {
      const { assets, asset } = ConfigBuilder(configService).assets(ecosystem);

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
                        configService,
                        destinationAddress,
                        evmSigner: signers?.evmSigner ?? signers?.ethersSigner,
                        sourceAddress,
                        transferConfig: destination(destKeyOrChain).build(),
                        polkadotSigner: signers?.polkadotSigner,
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
      evmSigner,
      keyOrAsset,
      polkadotSigner,
      sourceAddress,
      sourceKeyOrChain,
    }: SdkTransferParams): Promise<TransferData> {
      return gtd({
        configService,
        destinationAddress,
        evmSigner: evmSigner ?? ethersSigner,
        polkadotSigner,
        sourceAddress,
        transferConfig: ConfigBuilder(configService)
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
