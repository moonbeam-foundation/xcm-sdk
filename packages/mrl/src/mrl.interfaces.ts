import type {
  EvmSigner,
  SourceChainTransferData,
} from '@moonbeam-network/xcm-sdk';
import type {
  AnyChain,
  AssetAmount,
  EvmParachain,
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
  moonChain: MoonChainTransferData;
  source: SourceTransferData;
  transfer(
    amount: bigint | number | string,
    isAutomatic: boolean,
    signers: Signers,
    statusCallback?: (params: ISubmittableResult) => void,
    sendOnlyRemoteExecution?: boolean,
  ): Promise<string[]>;
}

export interface SourceTransferData extends SourceChainTransferData {
  destinationFeeBalance: AssetAmount;
  moonChainFeeBalance?: AssetAmount;
  relayerFee?: AssetAmount;
  feeBalance: AssetAmount;
  max: AssetAmount;
}

export interface DestinationTransferData extends ChainTransferData {}

export type MoonChainTransferData = Omit<ChainTransferData, 'min'> & {
  chain: EvmParachain;
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
