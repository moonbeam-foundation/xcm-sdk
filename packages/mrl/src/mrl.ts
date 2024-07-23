import { AnyAsset, AnyChain, Ecosystem } from '@moonbeam-network/xcm-types';
import { ConfigService } from '@moonbeam-network/xcm-config';
import { getTransferData } from './getTransferData/getTransferData';

// TODO: create config
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEFAULT_SERVICE = new ConfigService({ routes: {} as any });

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
              const config = service.getAssetDestinationConfig({
                asset,
                source,
                destination,
              });

              return {
                setAddresses(
                  sourceAddress: string,
                  destinationAddress: string,
                ) {
                  return getTransferData({
                    config,
                    destinationAddress,
                    sourceAddress,
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
