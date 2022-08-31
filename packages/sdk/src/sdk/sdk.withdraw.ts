import {
  Asset,
  AssetSymbol,
  Chain,
  ChainKey,
  MoonChain,
  WithdrawConfig,
} from '@moonbeam-network/xcm-config';
import { Signer as EthersSigner } from 'ethers';
import { XTokensContract } from '../contracts';
import { PolkadotService } from '../polkadot';
import {
  ExtrinsicEventsCallback,
  ExtrinsicStatus,
  Hash,
  WithdrawTransferData,
} from './sdk.interfaces';

export async function createTransactionEventHandler(
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

export interface GetWithdrawDataParams<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
> {
  asset: Asset<Symbols>;
  config: WithdrawConfig<Symbols>;
  contract: XTokensContract;
  destinationAccount: string;
  destinationPolkadot: PolkadotService<Symbols, ChainKeys>;
  ethersSigner: EthersSigner;
  moonChain: MoonChain;
  nativeAsset: Asset<Symbols>;
  origin: MoonChain | Chain<ChainKeys>;
  polkadot: PolkadotService<Symbols, ChainKeys>;
}

export async function getWithdrawData<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
>({
  asset,
  config,
  contract,
  destinationAccount,
  destinationPolkadot,
  ethersSigner,
  moonChain,
  nativeAsset,
  origin,
  polkadot,
}: GetWithdrawDataParams<Symbols, ChainKeys>): Promise<
  WithdrawTransferData<Symbols>
> {
  const meta = destinationPolkadot.getMetadata();
  const [decimals, destinationBalance, existentialDeposit] = await Promise.all([
    asset.isNative ? moonChain.decimals : polkadot.getAssetDecimals(asset.id),
    destinationPolkadot.getGenericBalance(destinationAccount, config.balance),
    destinationPolkadot.getExistentialDeposit(),
  ]);
  const destinationFee = BigInt(config.weight * config.feePerWeight);
  const min = destinationFee + existentialDeposit;

  return {
    asset: { ...asset, decimals },
    destination: config.destination,
    destinationBalance,
    destinationFee,
    existentialDeposit,
    min,
    native: { ...nativeAsset, decimals: meta.decimals },
    origin,
    getFee: async (amount) =>
      contract.getTransferFees(destinationAccount, amount, asset, config),
    send: async (amount: bigint, cb?: ExtrinsicEventsCallback) => {
      const tx = await contract.transfer(
        destinationAccount,
        amount,
        asset,
        config,
      );

      if (cb) {
        createTransactionEventHandler(ethersSigner, tx.hash, cb);
      }

      return tx.hash;
    },
  };
}
