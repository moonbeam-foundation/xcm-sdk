/* eslint-disable sort-keys */
import { AnyChain, Asset, Ecosystem } from '@moonbeam-network/xcm-types';
import {
  getAsset,
  getAssetConfigs,
  getChain,
  getEcosystemAssets,
  getSourceChains,
} from './config.utils';

export const config = {
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
            const assetConfigs = getAssetConfigs(asset, sourceChain);

            return {
              destinationChains: assetConfigs
                .map((cfg) => cfg.destinations)
                .flat(1),
              // eslint-disable-next-line @typescript-eslint/no-shadow
              destination: (keyOrChain: string | AnyChain) => {
                const destinationChain = getChain(keyOrChain);
                const source = assetConfigs.find((cfg) =>
                  cfg.destinations.includes(destinationChain),
                );
                const destinationConfigs = getAssetConfigs(
                  asset,
                  destinationChain,
                );
                const destination =
                  destinationConfigs.find((cfg) =>
                    cfg.destinations.includes(sourceChain),
                  ) || destinationConfigs[0];

                if (!source || !destination) {
                  throw new Error(
                    `No route found from ${sourceChain.key} to ${destinationChain.key}`,
                  );
                }

                return {
                  source,
                  destination,
                };
              },
            };
          },
        };
      },
    };
  },
  // chains: (ecosystem?: Ecosystem) => {},
};
