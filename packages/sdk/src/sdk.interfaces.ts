import { AnyChain, AssetAmount } from '@moonbeam-network/xcm-types';
import type { Signer as PolkadotSigner } from '@polkadot/api/types';
import type { IKeyringPair } from '@polkadot/types/types';
import type { Signer as EthersSigner } from 'ethers';

export interface Signers {
  ethersSigner: EthersSigner;
  polkadotSigner: PolkadotSigner | IKeyringPair;
}

export interface TransferData {
  destination: DestinationChainTransferData;
  getEstimate(amount: number | string): AssetAmount;
  isSwapPossible: boolean;
  max: AssetAmount;
  min: AssetAmount;
  source: SourceChainTransferData;
  swap(): Promise<TransferData | undefined>;
  transfer(amount: bigint | number | string): Promise<string>;
}

export interface SourceChainTransferData extends ChainTransferData {
  destinationFeeBalance: AssetAmount;
  feeBalance: AssetAmount;
  max: AssetAmount;
}

export interface DestinationChainTransferData extends ChainTransferData {}

export interface ChainTransferData {
  balance: AssetAmount;
  chain: AnyChain;
  existentialDeposit: AssetAmount;
  fee: AssetAmount;
  min: AssetAmount;
}
