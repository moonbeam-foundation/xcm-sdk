/* eslint-disable sort-keys */
import {
  ConfigBuilder,
  ConfigService,
  routesMap,
} from '@moonbeam-network/xcm-config';
import {
  AnyAsset,
  AnyChain,
  Asset,
  AssetAmount,
  Ecosystem,
} from '@moonbeam-network/xcm-types';
import { getAssetsBalances } from './getTransferData/getSourceData';
import { getTransferData as gtd } from './getTransferData/getTransferData';
import { PolkadotService } from './polkadot';
import { Signers, TransferData } from './sdk.interfaces';

const DEFAULT_SERVICE = new ConfigService({ routes: routesMap });

export interface SdkOptions extends Partial<Signers> {
  configService?: ConfigService;
}

export function Sdk(options?: SdkOptions) {
  const configService = options?.configService ?? DEFAULT_SERVICE;

  return {
    assets(ecosystem?: Ecosystem) {
      const { assets, asset } = ConfigBuilder(configService).assets(ecosystem);

      return {
        assets,
        asset(keyOrAsset: string | AnyAsset) {
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
  service: ConfigService = DEFAULT_SERVICE,
): Promise<AssetAmount[]> {
  const routes = service.getChainRoutes(chain).getRoutes();
  const polkadot = await PolkadotService.create(chain);
  const balances = await getAssetsBalances({
    chain,
    routes,
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
