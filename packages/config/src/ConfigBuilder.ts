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
              const sourceChain = getChain(keyOrChain);
              const sourceConfigs = getAssetConfigs(asset, sourceChain);

              return {
                destinationChains: getDestinations(sourceConfigs),
                destination: (
                  // eslint-disable-next-line @typescript-eslint/no-shadow
                  keyOrChain: string | AnyChain,
                ): TransferConfig => {
                  const destinationChain = getChain(keyOrChain);
                  const destinationConfigs = getAssetConfigs(
                    asset,
                    destinationChain,
                  );

                  const source = filterAssetConfigsByChain(
                    sourceConfigs,
                    destinationChain,
                  );
                  const destination = filterAssetConfigsByChain(
                    destinationConfigs,
                    sourceChain,
                  );

                  return {
                    asset,
                    source: {
                      chain: sourceChain,
                      config: source,
                    },
                    destination: {
                      chain: destinationChain,
                      config: destination,
                    },
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
