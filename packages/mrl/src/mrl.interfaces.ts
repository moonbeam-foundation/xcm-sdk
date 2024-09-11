import type { AnyChain, AssetAmount } from '@moonbeam-network/xcm-types';
import type { Signer } from '@polkadot/api/types';
import type { IKeyringPair } from '@polkadot/types/types';
import type { WalletClient } from 'viem';

export interface Signers {
  evmSigner?: WalletClient;
  polkadotSigner?: Signer | IKeyringPair;
}

export interface TransferData {
  destination: DestinationTransferData;
  getEstimate(amount: number | string): AssetAmount;
  max: AssetAmount;
  min: AssetAmount;
  source: SourceTransferData;
  transfer(
    amount: bigint | number | string,
    signers: Signers,
  ): Promise<string[]>;
}

export interface SourceTransferData extends ChainTransferData {
  chain: AnyChain;
  destinationFeeBalance: AssetAmount;
  feeBalance: AssetAmount;
  max: AssetAmount;
}

export interface DestinationTransferData extends ChainTransferData {}

export interface ChainTransferData {
  chain: AnyChain;
  balance: AssetAmount;
  fee: AssetAmount;
  min: AssetAmount;
}