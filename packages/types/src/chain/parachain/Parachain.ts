import { Asset } from '../../asset';
import { SetOptional } from '../../common.interfaces';
import { Chain, ChainConstructorParams } from '../Chain';
import { ChainType } from '../Chain.interfaces';
import { ChainAssetId, ChainAssetsData } from './Parachain.interfaces';

export interface ParachainConstructorParams
  extends SetOptional<ChainConstructorParams, 'type'> {
  assetsData?: Map<string, ChainAssetsData> | ChainAssetsData[];
  genesisHash: string;
  isRelay?: boolean;
  parachainId: number;
  ss58Format: number;
  usesChainDecimals?: boolean;
  weight?: number;
  ws: string[];
}

export class Parachain extends Chain {
  readonly assetsData: Map<string, ChainAssetsData>;

  readonly genesisHash: string;

  readonly isRelay: boolean;

  readonly parachainId: number;

  readonly ss58Format: number;

  readonly usesChainDecimals: boolean;

  readonly weight: number | undefined;

  readonly ws: string[];

  constructor({
    assetsData,
    genesisHash,
    isRelay,
    parachainId,
    usesChainDecimals,
    ss58Format,
    weight,
    ws,
    type = ChainType.Parachain,
    ...others
  }: ParachainConstructorParams) {
    super({ type, ...others });

    this.assetsData =
      assetsData instanceof Map
        ? assetsData
        : new Map(assetsData?.map((data) => [data.asset.key, data]));
    this.genesisHash = genesisHash;
    this.isRelay = !!isRelay;
    this.parachainId = parachainId;
    this.ss58Format = ss58Format;
    this.usesChainDecimals = !!usesChainDecimals;
    this.weight = weight;
    this.ws = ws;
  }

  getAssetId(asset: Asset): ChainAssetId {
    return this.assetsData.get(asset.key)?.id ?? asset.originSymbol;
  }

  getBalanceAssetId(asset: Asset): ChainAssetId {
    return this.assetsData.get(asset.key)?.balanceId ?? this.getAssetId(asset);
  }

  getMinAssetId(asset: Asset): ChainAssetId {
    return this.assetsData.get(asset.key)?.minId ?? this.getAssetId(asset);
  }

  getMetadataAssetId(asset: Asset): ChainAssetId {
    return this.assetsData.get(asset.key)?.metadataId ?? this.getAssetId(asset);
  }

  getAssetPalletInstance(asset: Asset): number | undefined {
    return this.assetsData.get(asset.key)?.palletInstance;
  }

  getAssetDecimals(asset: Asset): number | undefined {
    return this.assetsData.get(asset.key)?.decimals;
  }

  getAssetMin(asset: Asset): number {
    return this.assetsData.get(asset.key)?.min ?? 0;
  }
}
