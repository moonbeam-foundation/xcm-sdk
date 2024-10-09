import { AnyChain, AssetAmount } from '@moonbeam-network/xcm-types';
import type { Signer as PolkadotSigner } from '@polkadot/api/types';
import type { IKeyringPair } from '@polkadot/types/types';
import { Signer as EthersSigner } from 'ethers';
import { WalletClient } from 'viem';

export type EvmSigner = EthersSigner | WalletClient;

export interface Signers {
  /**
   * @deprecated ethersSigner - is deprecated and will be removed in v2, use evmSigner instead
   */
  ethersSigner?: EthersSigner;
  evmSigner?: EvmSigner;
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
  existentialDeposit: AssetAmount;
  fee: AssetAmount;
  min: AssetAmount;
}
