import { Asset } from '../../asset';

export type ChainAssetId =
  | string
  | number
  | bigint
  | { [key: string]: ChainAssetId };

export interface ChainAssetsData {
  asset: Asset;
  address?: string;
  balanceId?: ChainAssetId;
  decimals?: number;
  id?: ChainAssetId;
  metadataId?: ChainAssetId;
  minId?: ChainAssetId;
  palletInstance?: number;
  min?: number;
}
