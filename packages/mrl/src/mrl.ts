import { AnyAsset, AnyChain, Ecosystem } from '@moonbeam-network/xcm-types';
import { ConfigService } from '@moonbeam-network/xcm-config';
import { routesMap } from '@moonbeam-network/xcm-config/mrl';
import { getTransferData } from './getTransferData/getTransferData';

const DEFAULT_SERVICE = new ConfigService({ routes: routesMap });

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
                setAddresses(
                  sourceAddress: string,
                  destinationAddress: string,
                ) {
                  const sourceChain = service.getChain(source);

                  return getTransferData({
                    route,
                    source: sourceChain,
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
