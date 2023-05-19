import { AnyChain, AssetAmount } from '@moonbeam-network/xcm-types';

export interface TransferData {
  destination: DestinationChainTransferData;
  getEstimate(amount: number | string): AssetAmount;
  isSwapPossible: boolean;
  max: AssetAmount;
  min: AssetAmount;
  source: SourceChainTransferData;
  swap(): Promise<TransferData | undefined>;
  transfer(amount: number | string): Promise<string>;
}

export interface SourceChainTransferData extends ChainTransferData {
  feeBalance: AssetAmount;
  max: AssetAmount;
}

export interface DestinationChainTransferData extends ChainTransferData {}

export interface ChainTransferData {
  balance: AssetAmount;
  chain: AnyChain;
  existentialDeposit?: AssetAmount;
  fee: AssetAmount;
  min: AssetAmount;
}
