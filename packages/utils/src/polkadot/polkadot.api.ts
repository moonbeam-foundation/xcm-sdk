import { ApiPromise, WsProvider } from '@polkadot/api';
import { typesBundle } from '@polkadot/apps-config';
import type { OverrideBundleType } from '@polkadot/types/types';
import { LRUCache } from 'lru-cache';

export enum MRLTypes {
  // TODO handle both types according to RT version
  XcmVersionedMultiLocation = 'XcmVersionedMultiLocation',
  XcmVersionedLocation = 'XcmVersionedLocation',
  XcmRoutingUserAction = 'XcmRoutingUserAction',
  VersionedUserAction = 'VersionedUserAction',
}

const cache = new LRUCache<string, Promise<ApiPromise>>({
  max: 20,
  // eslint-disable-next-line sort-keys
  dispose: async (promise: Promise<ApiPromise>) => {
    const api = await promise;

    if (api.isConnected) {
      api.disconnect();
    }
  },
});

export async function getPolkadotApi(ws: string): Promise<ApiPromise> {
  const promise =
    cache.get(ws) ||
    ApiPromise.create({
      noInitWarn: true,
      provider: new WsProvider(ws),
      types: {
        [MRLTypes.XcmRoutingUserAction]: {
          destination: MRLTypes.XcmVersionedLocation,
        },
        [MRLTypes.VersionedUserAction]: {
          _enum: { V1: MRLTypes.XcmRoutingUserAction },
        },
      },
      typesBundle: typesBundle as OverrideBundleType,
    });

  cache.set(ws, promise);

  const api = await promise;

  await api.isReady;

  return api;
}
