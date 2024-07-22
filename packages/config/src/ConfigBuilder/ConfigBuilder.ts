/* eslint-disable sort-keys */
import { AnyAsset, AnyChain, Ecosystem } from '@moonbeam-network/xcm-types';
import { ConfigService, IConfigService } from '../ConfigService';
import { TransferConfig } from './ConfigBuilder.interfaces';
import { routesMap } from '../xcm-configs';

const DEFAULT_SERVICE = new ConfigService({ routes: routesMap });

export function ConfigBuilder(service: IConfigService = DEFAULT_SERVICE) {
  return {
    assets: (ecosystem?: Ecosystem) => {
      const assets = service.getEcosystemAssets(ecosystem);

      return {
        assets,
        asset: (keyOrAsset: string | AnyAsset) => {
          const asset = service.getAsset(keyOrAsset);
          const sourceChains = service.getSourceChains({ asset, ecosystem });

          return {
            sourceChains,
            source: (keyOrChain: string | AnyChain) => {
              const source = service.getChain(keyOrChain);
              const destinationChains = service.getDestinationChains({
                asset,
                source,
              });

              return {
                destinationChains,
                destination: (
                  // eslint-disable-next-line @typescript-eslint/no-shadow
                  keyOrChain: string | AnyChain,
                ) => {
                  const destination = service.getChain(keyOrChain);
                  const sourceConfig = service.getAssetDestinationConfig(
                    asset,
                    source,
                    destination,
                  );
                  const destinationConfig = service.getAssetDestinationConfig(
                    asset,
                    destination,
                    source,
                  );

                  return {
                    build: (): TransferConfig => ({
                      asset,
                      source: {
                        chain: source,
                        config: sourceConfig,
                      },
                      destination: {
                        chain: destination,
                        config: destinationConfig,
                      },
                    }),
                  };
                },
              };
            },
          };
        },
      };
    },
  };
}
