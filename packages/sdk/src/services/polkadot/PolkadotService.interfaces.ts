import type { Bytes, Option, Struct, u8 } from '@polkadot/types';

export interface AssetMetadata extends Struct {
  readonly name: Bytes;
  readonly symbol: Bytes;
  readonly decimals: u8 | Option<u8>;
}
