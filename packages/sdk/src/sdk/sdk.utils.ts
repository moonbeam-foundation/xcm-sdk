import {
  Asset,
  AssetSymbol,
  ChainKey,
  DepositConfig,
  isMultiCurrency,
  PolkadotXcmExtrinsicSuccessEvent,
} from '@moonbeam-network/xcm-config';
import { ISubmittableResult } from '@polkadot/types/types';
import { Signer as EthersSigner } from 'ethers';
import { PolkadotService } from '../polkadot';
import {
  ExtrinsicEvent,
  ExtrinsicStatus,
  Hash,
  XcmSdkDeposit,
  XcmSdkWithdraw,
} from './sdk.interfaces';

export function isXcmSdkDeposit(
  config: XcmSdkDeposit | XcmSdkWithdraw,
): config is XcmSdkDeposit {
  return !!(config as XcmSdkDeposit).from;
}

export function isXcmSdkWithdraw(
  config: XcmSdkDeposit | XcmSdkWithdraw,
): config is XcmSdkWithdraw {
  return !!(config as XcmSdkWithdraw).to;
}

export function createExtrinsicEventHandler<
  Symbols extends AssetSymbol = AssetSymbol,
>(config: DepositConfig<Symbols>, cb: (event: ExtrinsicEvent) => void) {
  return ({ events = [], status, txHash }: ISubmittableResult) => {
    const hash = txHash.toHex();

    if (status.isReady) {
      cb({ status: ExtrinsicStatus.Sent, txHash: hash });
    }

    if (status.isInBlock) {
      const block = status.asInBlock.toString();

      events.forEach(({ event: { data, method, section } }) => {
        if (
          section === config.extrinsic.pallet &&
          method === config.extrinsic.successEvent
        ) {
          if (method === PolkadotXcmExtrinsicSuccessEvent.Attempted) {
            const eventData = data.at(0) as any;

            if (eventData.isIncomplete) {
              cb({
                status: ExtrinsicStatus.Failed,
                blockHash: block,
                txHash: hash,
                message: eventData.asIncomplete.toHuman().join('; '),
              });

              return;
            }
          }

          cb({
            status: ExtrinsicStatus.Success,
            blockHash: block,
            txHash: hash,
          });
        }

        if (section === 'system' && method === 'ExtrinsicFailed') {
          cb({
            status: ExtrinsicStatus.Failed,
            blockHash: block,
            txHash: hash,
            message: data.join('; '),
          });
        }
      });
    }
  };
}

export async function createTransactionEventHandler(
  ethersSigner: EthersSigner,
  txHash: Hash,
  cb: (event: ExtrinsicEvent) => void,
  skipSentEvent = false,
) {
  if (!ethersSigner.provider) {
    throw new Error('options.ethersSigner has not provider');
  }

  if (!skipSentEvent) {
    cb({ status: ExtrinsicStatus.Sent, txHash });
  }

  const tx = await ethersSigner.provider.getTransactionReceipt(txHash);

  if (!tx) {
    setTimeout(
      () => createTransactionEventHandler(ethersSigner, txHash, cb, true),
      2000,
    );
    return;
  }

  if (tx.status === 1) {
    cb({
      status: ExtrinsicStatus.Success,
      blockHash: tx.blockHash,
      txHash,
    });
  } else {
    cb({
      status: ExtrinsicStatus.Failed,
      blockHash: tx.blockHash,
      txHash,
    });
  }
}

export interface CreateExtrinsicOptions<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  account: string;
  config: DepositConfig<Symbols>;
  foreignPolkadot: PolkadotService<Symbols, ChainKeys>;
  nativeAsset: Asset<Symbols>;
  polkadot: PolkadotService<Symbols, ChainKeys>;
  primaryAccount?: string;
}

export function getCreateExtrinsic<Symbols extends AssetSymbol = AssetSymbol>({
  account,
  config,
  foreignPolkadot,
  nativeAsset,
  polkadot,
  primaryAccount,
}: CreateExtrinsicOptions<Symbols>) {
  return async (amount: bigint) => {
    const fee = isMultiCurrency(config.extrinsic)
      ? await polkadot.getAssetFee(nativeAsset.id, config.origin.weight)
      : 0n;

    return foreignPolkadot.getXcmExtrinsic(
      account,
      amount,
      config.extrinsic,
      fee,
      primaryAccount,
    );
  };
}
