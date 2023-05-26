import { Asset } from '../../asset';

export type ChainAssetId =
  | string
  | number
  | bigint
  | { [key: string]: string | number | bigint };

export interface ChainAssetsData {
  asset: Asset;
  decimals?: number;
  id?: ChainAssetId;
  balanceId?: ChainAssetId;
  palletInstance?: number;
}
