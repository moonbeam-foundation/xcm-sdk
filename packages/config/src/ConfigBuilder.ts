/* eslint-disable sort-keys */
import { AnyChain, Asset, Ecosystem } from '@moonbeam-network/xcm-types';
import { TransferConfig } from './ConfigBuilder.interfaces';
import {
  filterAssetConfigsByChain,
  getAsset,
  getAssetConfigs,
  getChain,
  getDestinations,
  getEcosystemAssets,
  getSourceChains,
} from './ConfigBuilder.utils';

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
              const sourceConfigs = getAssetConfigs(asset, source);

              return {
                destinationChains: getDestinations(sourceConfigs),
                destination: (
                  // eslint-disable-next-line @typescript-eslint/no-shadow
                  keyOrChain: string | AnyChain,
                ) => {
                  const destination = getChain(keyOrChain);
                  const destinationConfigs = getAssetConfigs(
                    asset,
                    destination,
                  );

                  const sourceConfig = filterAssetConfigsByChain(
                    sourceConfigs,
                    destination,
                  );
                  const destinationConfig = filterAssetConfigsByChain(
                    destinationConfigs,
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
    // TODO: implement chains
    // chains: (ecosystem?: Ecosystem) => {},
  };
}
