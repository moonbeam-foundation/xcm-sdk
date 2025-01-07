import { ConfigService, mrlRoutesMap } from '@moonbeam-network/xcm-config';
import type {
  AnyAsset,
  AnyChain,
  Ecosystem,
} from '@moonbeam-network/xcm-types';
import {
  type WormholeExecuteTransferParams,
  getExecuteTransferData,
} from './getTransferData/getExecuteTransferData';
import { getTransferData } from './getTransferData/getTransferData';

const DEFAULT_SERVICE = new ConfigService({ routes: mrlRoutesMap });

export interface MrlOptions {
  configService?: ConfigService;
  ecosystem?: Ecosystem;
}

export function Mrl(options?: MrlOptions) {
  const service = options?.configService ?? DEFAULT_SERVICE;
  const sources = service.getSourceChains({ ecosystem: options?.ecosystem });

  return {
    sources,
    setSource(source: string | AnyChain) {
      const destinations = service.getDestinationChains({ source });

      return {
        destinations,
        setDestination(destination: string | AnyChain) {
          const assets = service.getRouteAssets({ source, destination });

          return {
            assets,
            setAsset(asset: string | AnyAsset) {
              const route = service.getAssetRoute({
                asset,
                source,
                destination,
              });
              return {
                setIsAutomatic(isAutomatic: boolean) {
                  return {
                    setAddresses({
                      sourceAddress,
                      destinationAddress,
                    }: {
                      sourceAddress: string;
                      destinationAddress: string;
                    }) {
                      return getTransferData({
                        route,
                        sourceAddress,
                        destinationAddress,
                        isAutomatic,
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
    getExecuteTransferData({ txId, chain }: WormholeExecuteTransferParams) {
      return getExecuteTransferData({ txId, chain });
    },
  };
}
