import { ApiPromise, WsProvider } from '@polkadot/api';
import LRU from 'lru-cache';

const tenMin = 10 * 60 * 1000;

const cache = new LRU<string, ApiPromise>({
  max: 20,
  ttl: tenMin,
  updateAgeOnGet: true,
  ttlAutopurge: true,
  dispose: async (api: ApiPromise) => api.isConnected && api.disconnect(),
});

export async function getPolkadotApi(ws: string): Promise<ApiPromise> {
  const cached = cache.get(ws);

  if (cached) {
    return cached;
  }

  const newApi = await ApiPromise.create({
    provider: new WsProvider(ws),
  });

  await newApi.isReady;

  cache.set(ws, newApi);

  return newApi;
}
