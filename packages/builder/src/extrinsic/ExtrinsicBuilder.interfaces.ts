import {
  AnyParachain,
  AssetAmount,
  ChainAsset,
  EvmParachain,
} from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';
import { ExtrinsicConfig } from './ExtrinsicConfig';

export interface ExtrinsicConfigBuilder<Params = ExtrinsicConfigBuilderPrams> {
  build: (params: Params) => ExtrinsicConfig;
}

export interface ExtrinsicConfigBuilderPrams {
  asset: AssetAmount;
  destination: AnyParachain;
  destinationAddress: string;
  destinationApi: ApiPromise;
  fee: AssetAmount;
  source: AnyParachain;
  sourceAddress: string;
  sourceApi: ApiPromise;
}

export type MrlExtrinsicConfigBuilder =
  ExtrinsicConfigBuilder<MrlExtrinsicConfigBuilderPrams>;

export interface MrlExtrinsicConfigBuilderPrams
  extends ExtrinsicConfigBuilderPrams {
  moonApi: ApiPromise;
  moonAsset: ChainAsset;
  moonChain: EvmParachain;
  moonGasLimit: bigint;
}

export enum XcmVersion {
  v1 = 'V1',
  v2 = 'V2',
  v3 = 'V3',
  v4 = 'V4',
  v5 = 'V5',
}

export type Parents = 0 | 1;
