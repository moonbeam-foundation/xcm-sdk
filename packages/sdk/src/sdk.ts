import { ConfigService, xcmRoutesMap } from '@moonbeam-network/xcm-config';
import {
  AnyAsset,
  AnyParachain,
  AssetAmount,
  Ecosystem,
  EvmParachain,
  Parachain,
} from '@moonbeam-network/xcm-types';
import assert from 'assert';
import { getAssetsBalances } from './getTransferData/getSourceData';
import { getTransferData } from './getTransferData/getTransferData';
import { PolkadotService } from './polkadot';
import { TransferData } from './sdk.interfaces';

const DEFAULT_SERVICE = new ConfigService({ routes: xcmRoutesMap });

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
        setSource(source: string | AnyParachain) {
          const destinations = service.getDestinationChains({
            asset,
            source,
          });

          return {
            destinations,
            setDestination(destination: string | AnyParachain) {
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
                  const sourceChain = service.getChain(source);

                  assert(
                    Parachain.is(sourceChain) || EvmParachain.is(sourceChain),
                    'Source chain should be a Parachain or EvmParachain',
                  );
                  assert(
                    Parachain.is(route.destination) ||
                      EvmParachain.is(route.destination),
                    'Destination chain should be a Parachain or EvmParachain',
                  );

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

export async function getParachainBalances(
  chain: AnyParachain,
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
