import { ApiPromise, WsProvider } from '@polkadot/api';
import LRU from 'lru-cache';

const cache = new LRU<string, Promise<ApiPromise>>({
  max: 20,
  dispose: async (promise: Promise<ApiPromise>) => {
    const api = await promise;

    if (api.isConnected) {
      api.disconnect();
    }
  },
});

export async function getPolkadotApi(
  ws: string,
  onDisconnect?: VoidFunction,
): Promise<ApiPromise> {
  const promise =
    cache.get(ws) ||
    ApiPromise.create({
      provider: new WsProvider(ws),
    });

  cache.set(ws, promise);

  const api = await promise;

  await api.isReady;

  if (onDisconnect) {
    api.once('disconnected', onDisconnect);
  }

  return api;
}
