import { AnyAsset, AnyChain } from '@moonbeam-network/xcm-types';
import { getTransferData } from './getTransferData/getTransferData';

export interface MrlOptions {
  environment?: 'testnet' | 'mainnet';
}

export function Mrl(options: MrlOptions) {
  return {
    sources: [],
    setSource(source: string | AnyChain) {
      return {
        destinations: [],
        setDestination(destination: string | AnyChain) {
          return {
            assets: [],
            setAsset(asset: string | AnyAsset) {
              return {
                setAddresses(
                  sourceAddress: string,
                  destinationAddress: string,
                ) {
                  return getTransferData({
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
