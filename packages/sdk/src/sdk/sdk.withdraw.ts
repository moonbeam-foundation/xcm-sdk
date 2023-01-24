/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Asset,
  AssetSymbol,
  Chain,
  ChainKey,
  MoonChain,
  WithdrawConfig,
} from '@moonbeam-network/xcm-config';
import {
  createTxEventHandler,
  ExtrinsicEventsCallback,
} from '@moonbeam-network/xcm-utils';
import { Signer as EthersSigner } from 'ethers';
import { XTokensContract } from '../contracts';
import { PolkadotService } from '../polkadot';
import { WithdrawTransferData } from './sdk.interfaces';

export interface GetWithdrawDataParams<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
> {
  asset: Asset<Symbols>;
  config: WithdrawConfig<Symbols>;
  contract: XTokensContract;
  originAccount: string;
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
  originAccount,
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
  const xcmFeeAsset = config.xcmFeeAsset?.asset ?? asset;
  const [
    decimals,
    // destinationBalance,
    originXcmFeeAssetBalance,
    destinationBalance,
    destinationXcmFeeAssetBalance,
    existentialDeposit,
    assetMinBalance,
    xcmFeeDecimals,
  ] = await Promise.all([
    // decimals
    asset.isNative ? moonChain.decimals : polkadot.getAssetDecimals(asset),
    // originXcmFeeAssetBalance
    config.xcmFeeAsset
      ? await polkadot.getGenericBalance(
          originAccount,
          config.xcmFeeAsset?.balance.origin,
        )
      : undefined,
    // destinationBalance
    destinationPolkadot.getGenericBalance(destinationAccount, config.balance),
    // destinationXcmFeeAssetBalance
    config.xcmFeeAsset
      ? destinationPolkadot.getGenericBalance(
          destinationAccount,
          config.xcmFeeAsset.balance.destination,
        )
      : undefined,
    // existentialDeposit
    asset.isNative ? 0n : destinationPolkadot.getExistentialDeposit(),
    // assetMinBalance
    config.sourceMinBalance
      ? destinationPolkadot.getAssetMinBalance(config.sourceMinBalance)
      : 0n,
    // xcmFeeDecimals
    polkadot.getAssetDecimals(xcmFeeAsset),
  ]);

  const destinationFee = getFee(assetMinBalance, config);
  const min = config.xcmFeeAsset
    ? 0n
    : getMin(
        assetMinBalance || existentialDeposit,
        destinationBalance,
        destinationFee,
      );

  const minXcmFeeAsset =
    config.xcmFeeAsset && destinationXcmFeeAssetBalance !== undefined
      ? getMin(
          assetMinBalance || existentialDeposit,
          destinationXcmFeeAssetBalance,
          destinationFee,
        )
      : 0n;

  return {
    asset: { ...asset, decimals },
    destination: {
      ...config.destination,
      ss58Format: meta.ss58Format,
      genesisHash: meta.genesisHash,
    },
    destinationBalance,
    destinationFee,
    existentialDeposit,
    min,
    minXcmFeeAsset: {
      amount: minXcmFeeAsset,
      decimals: xcmFeeDecimals,
      symbol: xcmFeeAsset.originSymbol,
    },
    native: { ...nativeAsset, decimals: meta.decimals },
    origin,
    originXcmFeeAssetBalance,
    getFee: async (amount) =>
      contract.getTransferFees(destinationAccount, amount, asset, config),
    send: async (amount: bigint, cb?: ExtrinsicEventsCallback) => {
      const tx = await contract.transfer(
        destinationAccount,
        amount,
        asset,
        config,
        minXcmFeeAsset,
      );

      if (cb) {
        createTxEventHandler(ethersSigner, tx.hash, cb);
      }

      return tx.hash;
    },
  };
}

export function getFee<Symbols extends AssetSymbol>(
  assetMinBalance: bigint,
  config: WithdrawConfig<Symbols>,
) {
  const calculatedFee = BigInt(config.weight * config.feePerWeight);

  return assetMinBalance > calculatedFee ? assetMinBalance : calculatedFee;
}

export function getMin(
  balanceNeeded: bigint,
  destinationBalance: bigint,
  destinationFee: bigint,
) {
  const extra =
    destinationBalance >= balanceNeeded
      ? 0n
      : balanceNeeded - destinationBalance;

  return destinationFee + extra;
}
