import type { AnyChain, AssetAmount } from '@moonbeam-network/xcm-types';
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
