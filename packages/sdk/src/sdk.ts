/* eslint-disable sort-keys */
import {
  ConfigBuilder,
  ConfigService,
  IConfigService,
} from '@moonbeam-network/xcm-config';
import {
  AnyChain,
  Asset,
  AssetAmount,
  Ecosystem,
} from '@moonbeam-network/xcm-types';
import { getAssetsBalances } from './getTransferData/getSourceData';
import { getTransferData as gtd } from './getTransferData/getTransferData';
import { PolkadotService } from './polkadot';
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
                    ): Promise<TransferData> {
                      return gtd({
                        ...options,
                        configService,
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
      evmSigner,
      keyOrAsset,
      polkadotSigner,
      sourceAddress,
      sourceKeyOrChain,
    }: SdkTransferParams): Promise<TransferData> {
      return gtd({
        configService,
        destinationAddress,
        evmSigner,
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

export async function getParachainBalances(
  chain: AnyChain,
  address: string,
): Promise<AssetAmount[]> {
  const configService = new ConfigService();
  const chainsConfig = configService.getChainConfig(chain);
  const assets = chainsConfig.getAssetsConfigs();

  const polkadot = await PolkadotService.create(chain, configService);

  const balances = await getAssetsBalances({
    chain,
    assets,
    address,
    polkadot,
  });

  return balances;
}

export interface SdkTransferParams extends Partial<Signers> {
  destinationAddress: string;
  destinationKeyOrChain: string | AnyChain;
  keyOrAsset: string | Asset;
  sourceAddress: string;
  sourceKeyOrChain: string | AnyChain;
}
