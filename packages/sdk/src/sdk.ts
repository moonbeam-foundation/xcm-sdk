import { ConfigService, xcmRoutesMap } from '@moonbeam-network/xcm-config';
import {
  type AnyAsset,
  type AnyChain,
  type AnyParachain,
  type AssetAmount,
  type Ecosystem,
  EvmParachain,
} from '@moonbeam-network/xcm-types';
import { getAssetsBalances } from './getTransferData/getSourceData';
import { getTransferData } from './getTransferData/getTransferData';
import type { TransferData } from './sdk.interfaces';

const DEFAULT_SERVICE = new ConfigService({ routes: xcmRoutesMap });

export interface SdkOptions {
  configService?: ConfigService;
  ecosystem?: Ecosystem;
}

export function Sdk({ configService, ecosystem }: SdkOptions = {}) {
  const service = configService ?? DEFAULT_SERVICE;
  const assets = service.getEcosystemAssets(ecosystem);

  return {
    assets,
    setAsset(asset: string | AnyAsset) {
      const sources = service.getSourceChains({ asset, ecosystem });

      return {
        sources,
        setSource(source: string | AnyChain) {
          const destinations = service.getDestinationChains({
            asset,
            source,
          });

          return {
            destinations,
            setDestination(destination: string | AnyChain) {
              const route = service.getAssetRoute({
                asset,
                source,
                destination,
              });

              return {
                setAddresses({
                  sourceAddress,
                  destinationAddress,
                }: {
                  sourceAddress: string;
                  destinationAddress: string;
                }): Promise<TransferData> {
                  const sourceChain = service.getChain(source);

                  if (!EvmParachain.isAnyParachain(sourceChain)) {
                    throw new Error(
                      'Source chain should be a Parachain or EvmParachain',
                    );
                  }

                  if (!EvmParachain.isAnyParachain(route.destination.chain)) {
                    throw new Error(
                      'Destination chain should be a Parachain or EvmParachain',
                    );
                  }

                  return getTransferData({
                    route,
                    sourceAddress,
                    destinationAddress,
                  });
                },
              };
            },
          };
        },
      };
    },
  };
}

export async function getParachainBalances(
  chain: AnyParachain,
  address: string,
  service: ConfigService = DEFAULT_SERVICE,
): Promise<AssetAmount[]> {
  const routes = service.getChainRoutes(chain).getRoutes();
  const balances = await getAssetsBalances({
    chain,
    routes,
    address,
  });

  return balances;
}
