import type {
  EvmSigner,
  SourceChainTransferData,
} from '@moonbeam-network/xcm-sdk';
import type {
  AnyChain,
  AssetAmount,
  Parachain,
} from '@moonbeam-network/xcm-types';
import type { Signer } from '@polkadot/api/types';
import type { IKeyringPair, ISubmittableResult } from '@polkadot/types/types';
import type { TokenTransfer } from '@wormhole-foundation/sdk-connect';
import type { WalletClient } from 'viem';

export interface Signers {
  evmSigner?: WalletClient;
  polkadotSigner?: Signer | IKeyringPair;
}

export interface TransferData {
  destination: DestinationTransferData;
  getEstimate(amount: number | string): AssetAmount;
  isAutomaticPossible: boolean;
  max: AssetAmount;
  min: AssetAmount;
  bridgeChain: BridgeChainTransferData;
  source: SourceTransferData;
  transfer(params: TransferParams): Promise<string[]>;
}

export interface TransferParams {
  amount: number | string;
  isAutomatic: boolean;
  signers: Signers;
  statusCallback?: (status: ISubmittableResult) => void;
  sendOnlyRemoteExecution?: boolean;
  // TODO add monitoring callbacks here when implemented
}

export interface FeeWithBalance {
  fee: AssetAmount;
  balance: AssetAmount;
}

export interface MrlExtraFees {
  /** Deducted from source balance */
  local?: FeeWithBalance;
  /** Deducted from transfer amount*/
  remote?: FeeWithBalance;
}

export interface SourceTransferData extends SourceChainTransferData {
  destinationFeeBalance: AssetAmount;
  bridgeChainFeeBalance?: AssetAmount;
  feeBalance: AssetAmount;
  max: AssetAmount;
  extraFees: MrlExtraFees;
}

export interface DestinationTransferData extends ChainTransferData {}

export type BridgeChainTransferData = Omit<ChainTransferData, 'min'> & {
  chain: Parachain;
  address: string;
  feeBalance: AssetAmount;
};

export interface ChainTransferData {
  chain: AnyChain;
  balance: AssetAmount;
  fee: AssetAmount;
  min: AssetAmount;
}

// TODO this is just for Wormhole
export interface ExecuteTransferData {
  vaa: TokenTransfer.VAA;
  tokenTransfer: TokenTransfer;
  executeTransfer(signer: EvmSigner): Promise<string>;
}
