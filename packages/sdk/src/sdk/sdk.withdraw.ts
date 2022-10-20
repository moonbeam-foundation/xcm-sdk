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
  const [decimals, destinationBalance, existentialDeposit, assetMinBalance] =
    await Promise.all([
      asset.isNative ? moonChain.decimals : polkadot.getAssetDecimals(asset),
      destinationPolkadot.getGenericBalance(destinationAccount, config.balance),
      destinationPolkadot.getExistentialDeposit(),
      config.sourceMinBalance
        ? destinationPolkadot.getAssetMinBalance(config.sourceMinBalance)
        : 0n,
    ]);

  const destinationFee = getFee(assetMinBalance, config);
  const min = getMin(
    assetMinBalance || existentialDeposit,
    destinationBalance,
    destinationFee,
  );

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
