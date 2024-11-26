import type {
  EvmSigner,
  SourceChainTransferData,
} from '@moonbeam-network/xcm-sdk';
import type { AnyChain, AssetAmount } from '@moonbeam-network/xcm-types';
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
  max: AssetAmount;
  min: AssetAmount;
  moonChain: MoonChainTransferData;
  source: SourceTransferData;
  transfer(
    amount: bigint | number | string,
    isAutomatic: boolean,
    signers: Signers,
    statusCallback?: (params: ISubmittableResult) => void,
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

export type MoonChainTransferData = Omit<ChainTransferData, 'min'>;

export interface ChainTransferData {
  chain: AnyChain;
  balance: AssetAmount;
  fee: AssetAmount;
  min: AssetAmount;
}

// TODO this is just for Wormhole
export type RedeemData = {
  vaa: TokenTransfer.VAA;
  tokenTransfer: TokenTransfer;
  transfer(signer: EvmSigner): Promise<string[]>;
};
