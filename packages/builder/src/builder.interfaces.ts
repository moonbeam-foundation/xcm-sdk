import type {
  AnyParachain,
  AssetAmount,
  Chain,
} from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';

export interface ConfigBuilder<Config, Params = BuilderPrams> {
  build: (params: Params) => Config;
}

export interface BuilderPrams<IChain extends Chain = AnyParachain> {
  asset: AssetAmount;
  destination: IChain;
  destinationAddress: string;
  destinationApi: ApiPromise;
  fee: AssetAmount;
  source: IChain;
  sourceAddress: string;
  sourceApi: ApiPromise;
}
