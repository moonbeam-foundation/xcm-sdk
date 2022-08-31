import { AssetSymbol, ChainKey } from '@moonbeam-network/xcm-config';
import { PolkadotService } from './PolkadotService';

export async function createPolkadotServices<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
>(ws: string[]): Promise<PolkadotService<Symbols, ChainKeys>[]> {
  return Promise.all(
    ws.map((url) => PolkadotService.create<Symbols, ChainKeys>(url)),
  );
}
