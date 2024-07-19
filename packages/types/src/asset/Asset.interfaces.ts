import type { Asset } from './Asset';
import type { ChainAsset } from './ChainAsset';
import type { AssetAmount } from './AssetAmount';

export type AnyAsset = Asset | ChainAsset | AssetAmount;
