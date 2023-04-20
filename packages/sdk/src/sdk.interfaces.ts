import { Asset, Chain } from '@moonbeam-network/xcm-types';

export interface Sdk {
  assets: Asset[];
  asset(asset: Asset): SourceBuilder;
}

interface SourceBuilder {
  chains: Chain[];
  source(chain: Chain): DestinationBuilder;
}

interface DestinationBuilder {
  chains: Chain[];
  destination(chain: Chain): Promise<TransferBuilder>;
}

interface TransferBuilder {
  source: TransferData;
  destination: Omit<TransferData, 'max'>;
  isSwapPossible: boolean;
  swap(): Promise<TransferBuilder | undefined>;
  getEstimate(amount: number | string): Asset;
  transfer(amount: number | string): Promise<string>;
}

interface TransferData {
  chain: Chain;
  balance: Asset;
  fee: Asset;
  feeBalance: Asset;
  min: Asset;
  max: Asset;
}
