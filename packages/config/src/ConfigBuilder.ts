/* eslint-disable sort-keys */
import { AnyChain, Asset, Ecosystem } from '@moonbeam-network/xcm-types';
import { AssetConfig } from './AssetConfig';
import { TransferConfig } from './ConfigBuilder.interfaces';
import {
  getAsset,
  getChain,
  getDestinationChains,
  getEcosystemAssets,
  getSourceChains,
} from './ConfigBuilder.utils';
import { chainsConfigMap } from './configs';

export function ConfigBuilder() {
  return {
    assets: (ecosystem?: Ecosystem) => {
      const assets = getEcosystemAssets(ecosystem);

      return {
        assets,
        asset: (keyOrAsset: string | Asset) => {
          const asset = getAsset(keyOrAsset);
          const sourceChains = getSourceChains(asset);

          return {
            sourceChains,
            source: (keyOrChain: string | AnyChain) => {
              const source = getChain(keyOrChain);
              const destinationChains = getDestinationChains(asset, source);

              return {
                destinationChains,
                destination: (
                  // eslint-disable-next-line @typescript-eslint/no-shadow
                  keyOrChain: string | AnyChain,
                ) => {
                  const destination = getChain(keyOrChain);
                  const sourceConfig = chainsConfigMap
                    .get(source.key)
                    ?.getDestinationConfig(asset, destination) as AssetConfig;
                  const destinationConfig = chainsConfigMap
                    .get(destination.key)
                    ?.getDestinationConfig(asset, source) as AssetConfig;

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
