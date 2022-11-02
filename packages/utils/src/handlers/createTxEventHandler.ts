import type { Signer as EthersSigner } from 'ethers';
import {
  ExtrinsicEventsCallback,
  ExtrinsicStatus,
  Hash,
} from './handlers.interfaces';

export async function createTxEventHandler(
  ethersSigner: EthersSigner,
  txHash: Hash,
  cb: ExtrinsicEventsCallback,
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
      () => createTxEventHandler(ethersSigner, txHash, cb, true),
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
