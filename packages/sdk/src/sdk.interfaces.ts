import type { AssetAmount } from '@moonbeam-network/xcm-types';
import type { Signer } from '@polkadot/api/types';
import type { IKeyringPair } from '@polkadot/types/types';
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
  transfer(amount: bigint | number | string, signers: Signers): Promise<string>;
}

export interface SourceChainTransferData extends ChainTransferData {
  destinationFeeBalance: AssetAmount;
  feeBalance: AssetAmount;
  max: AssetAmount;
}

export interface DestinationChainTransferData extends ChainTransferData {}

export interface ChainTransferData {
  balance: AssetAmount;
  existentialDeposit: AssetAmount;
  fee: AssetAmount;
  min: AssetAmount;
}
