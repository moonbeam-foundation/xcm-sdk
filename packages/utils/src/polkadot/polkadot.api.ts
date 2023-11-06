import { ApiPromise, WsProvider } from '@polkadot/api';
import { typesBundle } from '@polkadot/apps-config';
import LRU from 'lru-cache';

const cache = new LRU<string, Promise<ApiPromise>>({
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
      typesBundle,
    });

  cache.set(ws, promise);

  const api = await promise;

  await api.isReady;

  return api;
}
