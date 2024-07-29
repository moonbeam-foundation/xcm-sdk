/* eslint-disable sort-keys */
import { ConfigService, routesMap } from '@moonbeam-network/xcm-config';
import {
  AnyAsset,
  AnyChain,
  Asset,
  AssetAmount,
  Ecosystem,
} from '@moonbeam-network/xcm-types';
import { getAssetsBalances } from './getTransferData/getSourceData';
import { getTransferData } from './getTransferData/getTransferData';
import { PolkadotService } from './polkadot';
import { Signers, TransferData } from './sdk.interfaces';

const DEFAULT_SERVICE = new ConfigService({ routes: routesMap });

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
                setAddresses(
                  sourceAddress: string,
                  destinationAddress: string,
                ): Promise<TransferData> {
                  return getTransferData({
                    route,
                    source: service.getChain(source),
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
