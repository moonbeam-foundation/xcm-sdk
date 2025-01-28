import type { Asset } from './Asset';
import type { AssetAmount } from './AssetAmount';
import type { ChainAsset } from './ChainAsset';

export type AnyAsset = Asset | ChainAsset | AssetAmount;
