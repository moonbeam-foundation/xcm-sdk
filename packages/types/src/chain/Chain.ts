import { Asset } from '../asset';
import type { EthereumChain } from './EthereumChain';
import type { SubstrateChain } from './SubstrateChain';

export enum Ecosystem {
  Polkadot = 'Polkadot',
  Kusama = 'Kusama',
  AlphanetRelay = 'AlphanetRelay',
}

export enum ChainType {
  Ethereum = 'Ethereum',
  Substrate = 'Substrate',
}

export type ChainAssetId =
  | string
  | number
  | bigint
  | { [key: string]: string | number | bigint };

export type ChainAssetsData = {
  decimals?: number;
  id?: ChainAssetId;
  palletInstance?: number;
};

export type ChainAssetsDataWithAsset = {
  asset: Asset;
  id?: ChainAssetId;
  palletInstance?: number;
};

export interface ChainConstructorParams {
  assetsData?: ChainAssetsDataWithAsset[];
  ecosystem?: Ecosystem;
  genesisHash?: string;
  id: string | number;
  isTestChain?: boolean;
  key: string;
  name: string;
  parachainId?: number;
  type: ChainType;
  weight?: number;
  ws: string;
}

export abstract class Chain {
  readonly assetsData: Map<string, ChainAssetsData>;

  readonly ecosystem?: Ecosystem;

  readonly genesisHash?: string;

  readonly id: string | number;

  readonly isTestChain: boolean;

  readonly key: string;

  readonly name: string;

  readonly parachainId?: number;

  readonly type: ChainType;

  readonly weight: number;

  readonly ws: string;

  constructor({
    assetsData,
    ecosystem,
    genesisHash,
    id,
    isTestChain = false,
    key,
    name,
    parachainId,
    type,
    weight,
    ws,
  }: ChainConstructorParams) {
    this.assetsData = new Map(
      assetsData?.map(({ asset, ...rest }) => [asset.key, rest]),
    );
    this.ecosystem = ecosystem;
    this.genesisHash = genesisHash;
    this.id = id;
    this.isTestChain = isTestChain;
    this.key = key;
    this.name = name;
    this.parachainId = parachainId;
    this.type = type;
    this.weight = weight ?? 1_000_000_000;
    this.ws = ws;
  }

  isEthereumChain(): this is EthereumChain {
    return this.type === ChainType.Ethereum;
  }

  isSubstrateChain(): this is SubstrateChain {
    return this.type === ChainType.Substrate;
  }

  getAssetId(asset: Asset): ChainAssetId {
    return this.assetsData.get(asset.key)?.id ?? asset.originSymbol;
  }

  getAssetPalletInstance(asset: Asset): number | undefined {
    return this.assetsData.get(asset.key)?.palletInstance;
  }

  getAssetDecimals(asset: Asset): number | undefined {
    return this.assetsData.get(asset.key)?.decimals;
  }
}
