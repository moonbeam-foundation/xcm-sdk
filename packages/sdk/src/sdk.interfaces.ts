import type { AnyChain, AssetAmount } from '@moonbeam-network/xcm-types';
import type { Signer } from '@polkadot/api/types';
import type { IKeyringPair, ISubmittableResult } from '@polkadot/types/types';
import type { WalletClient } from 'viem';

export type EvmSigner = WalletClient;

export interface Signers {
  evmSigner?: EvmSigner;
  polkadotSigner?: Signer | IKeyringPair;
}

export interface TransferData {
  destination: DestinationChainTransferData;
  getEstimate(amount: number | string): AssetAmount;
  max: AssetAmount;
  min: AssetAmount;
  source: SourceChainTransferData;
  transfer(params: TransferParams): Promise<string>;
}

export interface TransferParams {
  amount: number | string;
  signers: Partial<Signers>;
  statusCallback?: (status: ISubmittableResult) => void;
  onSourceFinalized?: () => void;
  onSourceError?: (error: Error) => void;
  onDestinationFinalized?: () => void;
  onDestinationError?: (error: Error) => void;
}

export interface SourceChainTransferData extends ChainTransferData {
  destinationFee: AssetAmount;
  destinationFeeBalance: AssetAmount;
  feeBalance: AssetAmount;
  max: AssetAmount;
}

export interface SovereignAccountBalance {
  feeAssetBalance: bigint | undefined;
  transferAssetBalance: bigint;
}

export interface DestinationChainTransferData extends ChainTransferData {
  sovereignAccountBalances?: SovereignAccountBalance;
}

export interface ChainTransferData {
  balance: AssetAmount;
  chain: AnyChain;
  existentialDeposit?: AssetAmount;
  fee: AssetAmount;
  min: AssetAmount;
}
