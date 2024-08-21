import type { AnyParachain, AssetAmount } from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';

export enum CallType {
  Evm = 'Evm',
  Substrate = 'Substrate',
}

export interface ConfigBuilder<
  Config,
  Params extends BuilderPrams = BuilderPrams,
> {
  build: (params: Params) => Config;
}

export interface BuilderPrams {
  asset: AssetAmount;
  destination: AnyParachain;
  destinationAddress: string;
  destinationApi: ApiPromise;
  fee: AssetAmount;
  source: AnyParachain;
  sourceAddress: string;
  sourceApi: ApiPromise;
}
