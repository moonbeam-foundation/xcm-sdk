import {
  Asset,
  AssetSymbol,
  Chain,
  ChainKey,
  DepositConfig,
  MoonChain,
  PolkadotXcmExtrinsicSuccessEvent,
} from '@moonbeam-network/xcm-config';
import { Signer as PolkadotSigner } from '@polkadot/api/types';
import { IKeyringPair, ISubmittableResult } from '@polkadot/types/types';
import { isUndefined } from '@polkadot/util';
import { PolkadotService } from '../polkadot';
import {
  DepositTransferData,
  ExtrinsicEventsCallback,
  ExtrinsicStatus,
} from './sdk.interfaces';

export function createExtrinsicEventHandler<Symbols extends AssetSymbol>(
  config: DepositConfig<Symbols>,
  cb: ExtrinsicEventsCallback,
) {
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

export interface CreateExtrinsicOptions<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
> {
  account: string;
  config: DepositConfig<Symbols>;
  fee?: bigint;
  foreignPolkadot: PolkadotService<Symbols, ChainKeys>;
  primaryAccount?: string;
}

export function getCreateExtrinsic<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
>({
  account,
  config,
  foreignPolkadot,
  primaryAccount,
  fee,
}: CreateExtrinsicOptions<Symbols, ChainKeys>) {
  return (amount: bigint) =>
    foreignPolkadot.getXcmExtrinsic(
      account,
      amount,
      config.extrinsic,
      fee,
      primaryAccount,
    );
}

export interface GetDepositDataParams<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
> {
  account: string;
  asset: Asset<Symbols>;
  config: DepositConfig<Symbols>;
  foreignPolkadot: PolkadotService<Symbols, ChainKeys>;
  moonChain: MoonChain;
  nativeAsset: Asset<Symbols>;
  origin: MoonChain | Chain<ChainKeys>;
  polkadot: PolkadotService<Symbols, ChainKeys>;
  polkadotSigner?: PolkadotSigner;
  primaryAccount?: string;
  sourceAccount: string | IKeyringPair;
}

export async function getDepositData<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
>({
  account,
  asset,
  config,
  foreignPolkadot,
  moonChain,
  nativeAsset,
  origin,
  polkadot,
  polkadotSigner,
  primaryAccount,
  sourceAccount,
}: GetDepositDataParams<Symbols, ChainKeys>): Promise<
  DepositTransferData<Symbols>
> {
  const sourceAddress =
    typeof sourceAccount === 'string' ? sourceAccount : sourceAccount.address;
  const meta = foreignPolkadot.getMetadata();
  const xcmFeeAssetConfig = {
    asset: config.xcmFeeAsset?.asset ?? asset,
    balance: config.xcmFeeAsset?.balance ?? config.balance,
  };

  const [
    assetDecimals,
    existentialDeposit,
    sourceBalance,
    sourceFeeBalance,
    sourceMinBalance = 0n,
    xcmFee,
    xcmFeeBalance,
    xcmFeeDecimals,
  ] = await Promise.all([
    // assetDecimals
    polkadot.getAssetDecimals(asset),
    // existentialDeposit
    foreignPolkadot.getExistentialDeposit(),
    // sourceBalance
    foreignPolkadot.getGenericBalance(
      primaryAccount || sourceAddress,
      config.balance,
    ),
    // sourceFeeBalance
    config.sourceFeeBalance
      ? foreignPolkadot.getGenericBalance(
          sourceAddress,
          config.sourceFeeBalance,
        )
      : undefined,
    // sourceMinBalance
    config.sourceMinBalance
      ? foreignPolkadot.getAssetMinBalance(config.sourceMinBalance)
      : undefined,
    // xcmFee
    polkadot.getAssetFee(
      xcmFeeAssetConfig.asset,
      config.source.weight,
      moonChain,
    ),
    // xcmFeeBalance
    foreignPolkadot.getGenericBalance(
      primaryAccount || sourceAddress,
      xcmFeeAssetConfig.balance,
    ),
    // xcmFeeDecimals
    polkadot.getAssetDecimals(xcmFeeAssetConfig.asset),
  ]);

  // Min is basically the XCM fee, if it's the same asset. If less is sent then
  // Moon* won't process the message.
  const min = config.xcmFeeAsset ? 0n : xcmFee;
  const createExtrinsic = getCreateExtrinsic({
    account,
    config,
    foreignPolkadot,
    primaryAccount,
    fee: xcmFee,
  });

  return {
    asset: { ...asset, decimals: assetDecimals },
    existentialDeposit,
    min,
    moonChainFee: {
      balance: xcmFeeBalance,
      decimals: xcmFeeAssetConfig.asset.isNative
        ? meta.decimals
        : xcmFeeDecimals,
      fee: xcmFee,
      symbol: xcmFeeAssetConfig.asset.originSymbol,
    },
    native: { ...nativeAsset, decimals: meta.decimals },
    origin,
    source: config.source,
    sourceBalance,
    sourceFeeBalance: !isUndefined(sourceFeeBalance)
      ? { ...meta, balance: sourceFeeBalance }
      : undefined,
    sourceMinBalance,
    getFee: async (amount = sourceBalance): Promise<bigint> => {
      const extrinsic = await createExtrinsic(amount);
      const info = await extrinsic.paymentInfo(sourceAccount);

      return info.partialFee.toBigInt();
    },
    send: async (
      amount: bigint,
      cb?: ExtrinsicEventsCallback,
    ): Promise<string> => {
      const extrinsic = await createExtrinsic(amount);
      const hash = await extrinsic.signAndSend(
        sourceAccount,
        {
          signer: polkadotSigner,
        },
        cb && createExtrinsicEventHandler(config, cb),
      );

      return hash.toString();
    },
  };
}
