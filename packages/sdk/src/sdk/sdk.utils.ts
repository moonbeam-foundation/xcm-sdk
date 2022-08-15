import {
  Asset,
  DepositConfig,
  PolkadotXcmExtrinsicSuccessEvent,
} from '@moonbeam-network/xcm-config';
import { ISubmittableResult } from '@polkadot/types/types';
import { Signer as EthersSigner } from 'ethers';
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

export function createExtrinsicEventHandler<Assets extends Asset = Asset>(
  config: DepositConfig<Assets>,
  cb: (event: ExtrinsicEvent) => void,
) {
  return ({ events = [], status }: ISubmittableResult) => {
    if (status.isReady) {
      cb({ status: ExtrinsicStatus.Sent });
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
                message: eventData.asIncomplete.toHuman().join('; '),
              });

              return;
            }
          }

          cb({
            status: ExtrinsicStatus.Success,
            blockHash: block,
          });
        }

        if (section === 'system' && method === 'ExtrinsicFailed') {
          cb({
            status: ExtrinsicStatus.Failed,
            blockHash: block,
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
    cb({ status: ExtrinsicStatus.Sent });
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
    });
  } else {
    cb({
      status: ExtrinsicStatus.Failed,
      blockHash: tx.blockHash,
    });
  }
}
