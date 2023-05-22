import { AnyChain, AssetAmount } from '@moonbeam-network/xcm-types';
import type { Signer as PolkadotSigner } from '@polkadot/api/types';
import type { Signer as EthersSigner } from 'ethers';

export interface Signers {
  ethersSigner: EthersSigner;
  polkadotSigner: PolkadotSigner;
}

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
