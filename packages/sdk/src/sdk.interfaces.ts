import { AssetAmount, Chain } from '@moonbeam-network/xcm-types';

export interface TransferData {
  destination: Omit<ChainTransferData, 'max'>;
  getEstimate(amount: number | string): AssetAmount;
  isSwapPossible: boolean;
  max: AssetAmount;
  min: AssetAmount;
  source: Omit<ChainTransferData, 'min'>;
  swap(): Promise<TransferData | undefined>;
  transfer(amount: number | string): Promise<string>;
}

export interface SourceChainTransferData extends ChainTransferData {
  max: AssetAmount;
}

export interface DestinationChainTransferData extends ChainTransferData {
  min: AssetAmount;
}

export interface ChainTransferData {
  balance: AssetAmount;
  chain: Chain;
  fee: AssetAmount;
  feeBalance: AssetAmount;
}
