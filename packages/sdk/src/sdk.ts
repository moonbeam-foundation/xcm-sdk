/* eslint-disable sort-keys */
import { ConfigBuilder } from '@moonbeam-network/xcm-config';
import { AnyChain, Asset, Ecosystem } from '@moonbeam-network/xcm-types';

export function Sdk() {
  return {
    assets: (ecosystem?: Ecosystem) => {
      const { assets, asset } = ConfigBuilder().assets(ecosystem);

      return {
        assets,
        asset: (keyOrAsset: string | Asset) => {
          const { sourceChains, source } = asset(keyOrAsset);

          return {
            sourceChains,
            source: (keyOrChain: string | AnyChain) => {
              const { destinationChains, destination } = source(keyOrChain);

              return {
                destinationChains,
                // eslint-disable-next-line @typescript-eslint/no-shadow
                destination: (keyOrChain: string | AnyChain) => {
                  const config = destination(keyOrChain);

                  return {};
                },
              };
            },
          };
        },
      };
    },
  };
}
